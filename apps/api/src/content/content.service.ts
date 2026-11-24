import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async getLesson(lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { course: { select: { id: true, title: true, subject: true } } },
    })
    if (!lesson) throw new NotFoundException('Lesson not found')
    return {
      id:          lesson.id,
      courseId:    lesson.courseId,
      courseTitle: lesson.course.title,
      subject:     lesson.course.subject,
      title:       lesson.title,
      order:       lesson.order,
      contentHtml: lesson.contentHtml,
      keyPoints:   lesson.keyPoints,
      mediaUrl:    lesson.mediaUrl,
      mediaType:   lesson.mediaType,
      contentHash: lesson.contentHash,
      updatedAt:   lesson.updatedAt.toISOString(),
    }
  }

  async getQuizVersion(quizVersionId: string) {
    const quiz = await this.prisma.quizVersion.findUnique({
      where: { id: quizVersionId },
      include: {
        course: { select: { id: true, title: true, subject: true } },
        questions: {
          orderBy: { order: 'asc' },
          include: { options: { orderBy: { label: 'asc' } } },
        },
      },
    })
    if (!quiz) throw new NotFoundException('Quiz version not found')
    if (quiz.isRevoked) throw new NotFoundException('Quiz version has been revoked')

    return {
      id:          quiz.id,
      courseId:    quiz.courseId,
      courseTitle: quiz.course?.title || 'Course',
      title:       quiz.title,
      version:     quiz.version,
      contentHash: quiz.contentHash,
      questions:   quiz.questions.map((q) => ({
        id:      q.id,
        order:   q.order,
        prompt:  q.prompt,
        options: q.options.map((o) => ({
          id:    o.id,
          label: o.label,
          text:  o.text,
        })),
      })),
    }
  }

  async getAllCoursesWithStatus() {
    const courses = await this.prisma.course.findMany({
      where: { isPublished: true },
      include: {
        _count: { select: { lessons: true, quizVersions: true } },
      },
      orderBy: { createdAt: 'asc' },
    })
    return courses.map((c) => ({
      id:                   c.id,
      title:                c.title,
      subject:              c.subject,
      description:          c.description,
      coverImageUrl:        c.coverImageUrl,
      lessonCount:          c._count.lessons,
      quizCount:            c._count.quizVersions,
      offlinePackageSizeMb: c.offlinePackageSizeMb,
    }))
  }
}
