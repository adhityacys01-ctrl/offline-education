import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { SubmitAttemptDto } from './dto/submit-attempt.dto'
import * as crypto from 'crypto'

export interface SubmissionReceiptDto {
  submissionId: string
  clientAttemptId: string
  studentId?: string
  quizVersionId?: string
  idempotencyKey: string
  receiptHash: string
  acceptedAt: string
  status: string
  score: number | null
  total: number | null
  totalQuestions?: number | null
  replayed: boolean
}

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async submitAttempt(
    studentId: string,
    dto: SubmitAttemptDto,
    idempotencyKeyHeader: string | undefined,
  ): Promise<SubmissionReceiptDto> {
    const idempotencyKey = idempotencyKeyHeader ?? dto.idempotencyKey

    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key header is required')
    }

    // 1. Validate quizVersion exists
    const quizVersion = await this.prisma.quizVersion.findUnique({
      where: { id: dto.quizVersionId },
      include: { questions: { include: { options: true } } },
    })
    if (!quizVersion) {
      throw new NotFoundException('Quiz version not found')
    }

    // 2. Validate questionIds all belong to this quiz version
    const validQuestionIds = new Set(quizVersion.questions.map((q) => q.id))
    for (const answer of dto.answers) {
      if (!validQuestionIds.has(answer.questionId)) {
        throw new BadRequestException(
          `Question ${answer.questionId} does not belong to quiz version ${dto.quizVersionId}`,
        )
      }
    }

    // 3. Auto-enroll student if not enrolled
    let enrollment = await this.prisma.enrollment.findFirst({
      where: { studentId, courseId: quizVersion.courseId },
    })
    if (!enrollment) {
      try {
        enrollment = await this.prisma.enrollment.create({
          data: {
            id: `enr-${studentId}-${quizVersion.courseId}`,
            studentId,
            courseId: quizVersion.courseId,
          },
        })
      } catch {}
    }

    // 4. Single atomic transaction
    return this.prisma.$transaction(async (tx: any) => {
      // 4a. Check idempotency record
      const existing = await tx.idempotencyRecord.findUnique({
        where: {
          uq_idempotency_scope_key: {
            studentId,
            routeScope: 'POST:/submissions',
            idempotencyKey,
          },
        },
      })

      if (existing) {
        if (existing.payloadHash !== dto.payloadHash) {
          throw new ConflictException('IDEMPOTENCY_KEY_REUSE')
        }
        if (existing.responseJson) {
          return { ...(existing.responseJson as object), replayed: true } as SubmissionReceiptDto
        }
      }

      // Create idempotency record if not exists
      if (!existing) {
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 30) // 30-day TTL
        await tx.idempotencyRecord.create({
          data: {
            studentId,
            routeScope: 'POST:/submissions',
            idempotencyKey,
            payloadHash: dto.payloadHash,
            expiresAt,
          },
        })
      }

      // 4b. Upsert submission
      let submission = await tx.submission.findUnique({
        where: {
          uq_submission_student_attempt: {
            studentId,
            clientAttemptId: dto.clientAttemptId,
          },
        },
      })

      if (!submission) {
        // Compute score
        let score = 0
        const total = quizVersion.questions.length
        for (const answer of dto.answers) {
          const question = quizVersion.questions.find((q) => q.id === answer.questionId)
          if (question && question.correctOption === answer.selectedOptionId) {
            score++
          }
        }

        submission = await tx.submission.create({
          data: {
            studentId,
            quizVersionId: dto.quizVersionId,
            clientAttemptId: dto.clientAttemptId,
            idempotencyKey,
            payloadHash: dto.payloadHash,
            startedAt: new Date(dto.startedAt),
            finalizedAt: new Date(dto.finalizedAt),
            acceptedAt: new Date(),
            status: 'GRADED',
            score,
            totalQuestions: total,
          },
        })

        // 4c. Insert answers (answeredOptionId per schema)
        for (const answer of dto.answers) {
          await tx.submissionAnswer.create({
            data: {
              submissionId: submission.id,
              questionId: answer.questionId,
              answeredOptionId: answer.selectedOptionId ?? null,
              revision: answer.revision,
            },
          })
        }

        // 4d. Audit event
        await tx.auditEvent.create({
          data: {
            actorId: studentId,
            eventType: 'submission.created',
            clientAttemptId: dto.clientAttemptId,
            idempotencyKey,
            metadata: {
              submissionId: submission.id,
              quizVersionId: dto.quizVersionId,
              score,
              total,
            },
          },
        })
      }

      // 4e. Compute receipt hash
      const receiptHash = crypto
        .createHash('sha256')
        .update(`${submission.id}:${submission.acceptedAt?.toISOString()}:${studentId}`)
        .digest('hex')

      const receipt: SubmissionReceiptDto = {
        submissionId: submission.id,
        clientAttemptId: submission.clientAttemptId,
        studentId,
        quizVersionId: submission.quizVersionId,
        idempotencyKey,
        receiptHash,
        acceptedAt: submission.acceptedAt?.toISOString() ?? new Date().toISOString(),
        status: submission.status,
        score: submission.score ?? null,
        total: submission.totalQuestions ?? null,
        totalQuestions: submission.totalQuestions ?? null,
        replayed: false,
      }

      // 4f. Cache response in idempotency record
      await tx.idempotencyRecord.update({
        where: {
          uq_idempotency_scope_key: {
            studentId,
            routeScope: 'POST:/submissions',
            idempotencyKey,
          },
        },
        data: { responseJson: receipt as object },
      })

      return receipt
    })
  }

  async getSubmission(submissionId: string, studentId: string) {
    const submission = await this.prisma.submission.findFirst({
      where: { id: submissionId, studentId },
      include: {
        answers: { include: { question: { include: { options: true } } } },
        quizVersion: true,
      },
    })
    if (!submission) throw new NotFoundException('Submission not found')
    return submission
  }

  async getSubmissionByClientAttemptId(clientAttemptId: string, studentId: string) {
    const submission = await this.prisma.submission.findUnique({
      where: { uq_submission_student_attempt: { studentId, clientAttemptId } },
    })
    if (!submission) return { found: false }

    const receiptHash = crypto
      .createHash('sha256')
      .update(`${submission.id}:${submission.acceptedAt?.toISOString()}:${studentId}`)
      .digest('hex')

    return {
      found: true,
      submissionId: submission.id,
      clientAttemptId: submission.clientAttemptId,
      acceptedAt: submission.acceptedAt?.toISOString(),
      receiptHash,
      status: submission.status,
    }
  }

  // ─── Teacher methods ────────────────────────────────────────────────────────

  async getSubmissionsForTeacher(courseId: string) {
    const submissions = await this.prisma.submission.findMany({
      where: { quizVersion: { courseId } },
      include: {
        student: { select: { id: true, name: true, email: true } },
        quizVersion: true,
      },
      orderBy: { acceptedAt: 'desc' },
    })
    return submissions.map((s) => ({
      submissionId: s.id,
      clientAttemptId: s.clientAttemptId,
      studentName: s.student.name,
      studentEmail: s.student.email,
      courseId,
      quizTitle: s.quizVersion.title,
      quizVersion: s.quizVersion.version,
      status: s.status,
      score: s.score,
      totalQuestions: s.totalQuestions,
      acceptedAt: s.acceptedAt?.toISOString(),
    }))
  }

  async getSubmissionDetailForTeacher(submissionId: string) {
    const submission = await this.prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        student: { select: { id: true, name: true, email: true } },
        quizVersion: { include: { questions: { include: { options: true } } } },
        answers: { include: { question: { include: { options: true } } } },
      },
    })
    if (!submission) throw new NotFoundException('Submission not found')

    const answersWithResult = submission.answers.map((a) => {
      const isCorrect = a.question.correctOption === a.answeredOptionId
      const correctOptionText =
        a.question.options.find((o) => o.id === a.question.correctOption)?.text ?? 'Unknown'
      const selectedOptionText =
        a.question.options.find((o) => o.id === a.answeredOptionId)?.text ?? 'No answer'
      return {
        questionId: a.question.id,
        prompt: a.question.prompt,
        selectedOptionId: a.answeredOptionId,
        selectedOptionText,
        correctOptionId: a.question.correctOption,
        correctOptionText,
        isCorrect,
      }
    })

    return {
      submissionId: submission.id,
      clientAttemptId: submission.clientAttemptId,
      payloadHash: submission.payloadHash,
      idempotencyKey: submission.idempotencyKey,
      student: submission.student,
      quizTitle: submission.quizVersion.title,
      quizVersion: submission.quizVersion.version,
      status: submission.status,
      score: submission.score,
      totalQuestions: submission.totalQuestions,
      acceptedAt: submission.acceptedAt?.toISOString(),
      answers: answersWithResult,
    }
  }

  async getAllSubmissionsForTeacher() {
    const submissions = await this.prisma.submission.findMany({
      include: {
        student: { select: { id: true, name: true, email: true } },
        quizVersion: { include: { course: true } },
      },
      orderBy: { acceptedAt: 'desc' },
    })
    return submissions.map((s) => ({
      submissionId: s.id,
      clientAttemptId: s.clientAttemptId,
      studentName: s.student.name,
      studentEmail: s.student.email,
      courseTitle: s.quizVersion.course?.title ?? '',
      courseId: s.quizVersion.courseId,
      quizTitle: s.quizVersion.title,
      quizVersion: s.quizVersion.version,
      status: s.status,
      score: s.score,
      totalQuestions: s.totalQuestions,
      acceptedAt: s.acceptedAt?.toISOString(),
    }))
  }
}
