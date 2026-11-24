import * as bcrypt from 'bcryptjs'
import { COURSE_CATALOG } from './course-data'

export interface LocalUser {
  id: string
  email: string
  name: string
  passwordHash: string
  role: 'student' | 'teacher'
  avatarUrl?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface LocalCourse {
  id: string
  title: string
  subject: string
  description: string
  coverImageUrl?: string | null
  offlinePackageSizeMb: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface LocalLesson {
  id: string
  courseId: string
  title: string
  order: number
  contentHtml: string
  keyPoints: string[]
  mediaUrl?: string | null
  mediaType?: string | null
  contentHash: string
  createdAt: Date
  updatedAt: Date
}

export interface LocalOption {
  id: string
  questionId: string
  label: string
  text: string
}

export interface LocalQuestion {
  id: string
  quizVersionId: string
  order: number
  prompt: string
  correctOption: string
  createdAt: Date
  options: LocalOption[]
}

export interface LocalQuizVersion {
  id: string
  courseId: string
  title: string
  version: number
  contentHash: string
  isRevoked: boolean
  createdAt: Date
  questions: LocalQuestion[]
}

export interface LocalEnrollment {
  id: string
  studentId: string
  courseId: string
  createdAt: Date
}

export interface LocalSubmissionAnswer {
  id: string
  submissionId: string
  questionId: string
  answeredOptionId: string | null
  revision: number
}

export interface LocalSubmission {
  id: string
  studentId: string
  quizVersionId: string
  clientAttemptId: string
  idempotencyKey: string
  payloadHash: string
  status: 'RECEIVED' | 'GRADED'
  score: number | null
  totalQuestions: number | null
  receiptHash: string | null
  startedAt: Date
  finalizedAt: Date
  acceptedAt: Date
  answers: LocalSubmissionAnswer[]
}

export interface LocalIdempotencyRecord {
  id: string
  studentId: string
  routeScope: string
  idempotencyKey: string
  payloadHash: string
  responseJson: any
  createdAt: Date
  expiresAt: Date
}

export interface LocalAuditEvent {
  id: string
  actorId: string | null
  eventType: string
  clientAttemptId?: string | null
  idempotencyKey?: string | null
  metadata?: any
  createdAt: Date
}

export class LocalStore {
  users: LocalUser[] = []
  courses: LocalCourse[] = []
  lessons: LocalLesson[] = []
  quizVersions: LocalQuizVersion[] = []
  enrollments: LocalEnrollment[] = []
  submissions: LocalSubmission[] = []
  idempotencyRecords: LocalIdempotencyRecord[] = []
  auditEvents: LocalAuditEvent[] = []

  constructor() {
    this.initSeedData()
  }

  private initSeedData() {
    // Hash for 'password123'
    const passwordHash = bcrypt.hashSync('password123', 10)

    const student1: LocalUser = {
      id: 'usr-student-aarav',
      email: 'aarav@student.com',
      name: 'Aarav Sharma',
      passwordHash,
      role: 'student',
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const student2: LocalUser = {
      id: 'usr-student-diya',
      email: 'diya@student.com',
      name: 'Diya Patel',
      passwordHash,
      role: 'student',
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const teacher: LocalUser = {
      id: 'usr-teacher-rohan',
      email: 'teacher@school.com',
      name: 'Rohan Mehta',
      passwordHash,
      role: 'teacher',
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(student1, student2, teacher)

    // Courses, 10 Lessons & 3 Quizzes for each course from COURSE_CATALOG
    for (const c of COURSE_CATALOG) {
      this.courses.push({
        id: c.id,
        title: c.title,
        subject: c.subject,
        description: c.description,
        coverImageUrl: null,
        offlinePackageSizeMb: c.offlinePackageSizeMb,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      // 10 Lessons
      for (const ld of c.lessons) {
        this.lessons.push({
          id: `seed-lesson-${c.subject.toLowerCase().replace(/ /g, '-')}-${ld.order}`,
          courseId: c.id,
          title: ld.title,
          order: ld.order,
          contentHtml: ld.contentHtml,
          keyPoints: ld.keyPoints,
          mediaUrl: null,
          mediaType: null,
          contentHash: `sha256-lesson-${c.id}-${ld.order}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      // 3 Quizzes
      for (let qIdx = 0; qIdx < c.quizzes.length; qIdx++) {
        const qSeed = c.quizzes[qIdx]
        const quizVersionId = `seed-quiz-${c.subject.toLowerCase().replace(/ /g, '-')}-q${qIdx + 1}`

        const localQuestions: LocalQuestion[] = qSeed.questions.map((quest) => {
          const qId = `quest-${c.subject.toLowerCase().replace(/ /g, '-')}-q${qIdx + 1}-${quest.order}`
          const localOpts: LocalOption[] = quest.options.map((opt, optIdx) => ({
            id: `opt-${qId}-${optIdx}`,
            questionId: qId,
            label: opt.label,
            text: opt.text,
          }))
          const correctOptionId = localOpts[quest.correctIndex]?.id || localOpts[0].id

          return {
            id: qId,
            quizVersionId,
            order: quest.order,
            prompt: quest.prompt,
            correctOption: correctOptionId,
            createdAt: new Date(),
            options: localOpts,
          }
        })

        this.quizVersions.push({
          id: quizVersionId,
          courseId: c.id,
          title: qSeed.title,
          version: qSeed.version,
          contentHash: `sha256-quiz-${c.subject.toLowerCase().replace(/ /g, '-')}-q${qIdx + 1}-v${qSeed.version}`,
          isRevoked: false,
          createdAt: new Date(),
          questions: localQuestions,
        })
      }
    }

    // Enroll students in all courses
    for (const c of this.courses) {
      this.enrollments.push(
        { id: `enr-${student1.id}-${c.id}`, studentId: student1.id, courseId: c.id, createdAt: new Date() },
        { id: `enr-${student2.id}-${c.id}`, studentId: student2.id, courseId: c.id, createdAt: new Date() },
      )
    }
  }

  // --- Helpers mimicking Prisma Models ---

  get user() {
    return {
      findUnique: async ({ where }: any) => {
        if (where.email) return this.users.find((u) => u.email.toLowerCase() === where.email.toLowerCase()) || null
        if (where.id) return this.users.find((u) => u.id === where.id) || null
        return null
      },
      findFirst: async ({ where }: any = {}) => {
        if (!where) return this.users[0] || null
        if (where.role) return this.users.find((u) => u.role === where.role) || null
        if (where.email) return this.users.find((u) => u.email.toLowerCase() === where.email.toLowerCase()) || null
        if (where.id) return this.users.find((u) => u.id === where.id) || null
        return this.users[0] || null
      },
      findMany: async ({ where }: any = {}) => {
        if (where?.role) return this.users.filter((u) => u.role === where.role)
        return this.users
      },
      findUniqueOrThrow: async ({ where }: any) => {
        const u = await this.user.findUnique({ where })
        if (!u) throw new Error('User not found')
        return u
      },
      create: async ({ data }: any) => {
        const newUser: LocalUser = {
          id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          email: data.email,
          name: data.name,
          passwordHash: data.passwordHash,
          role: data.role,
          avatarUrl: data.avatarUrl || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        this.users.push(newUser)
        // Automatically enroll student in all published courses
        if (newUser.role === 'student') {
          for (const c of this.courses) {
            this.enrollments.push({
              id: `enr-${newUser.id}-${c.id}`,
              studentId: newUser.id,
              courseId: c.id,
              createdAt: new Date(),
            })
          }
        }
        return newUser
      },
      count: async () => this.users.length,
    }
  }

  get course() {
    return {
      findMany: async (args?: any) => {
        return this.courses.map((c) => {
          const res: any = {
            ...c,
            _count: {
              lessons: this.lessons.filter((l) => l.courseId === c.id).length,
              quizVersions: this.quizVersions.filter((q) => q.courseId === c.id).length,
            },
          }
          if (args?.include?.lessons) {
            res.lessons = this.lessons.filter((l) => l.courseId === c.id)
          }
          if (args?.include?.quizVersions) {
            let qv = this.quizVersions.filter((q) => q.courseId === c.id)
            if (args.include.quizVersions.where?.isRevoked === false) {
              qv = qv.filter((q) => !q.isRevoked)
            }
            res.quizVersions = qv
          }
          return res
        })
      },
      findUnique: async ({ where, include }: any) => {
        const c = this.courses.find((course) => course.id === where.id)
        if (!c) return null
        const res: any = { ...c }
        if (include?.lessons) {
          res.lessons = this.lessons.filter((l) => l.courseId === c.id)
        }
        if (include?.quizVersions) {
          let qv = this.quizVersions.filter((q) => q.courseId === c.id)
          if (include.quizVersions.where?.isRevoked === false) {
            qv = qv.filter((q) => !q.isRevoked)
          }
          res.quizVersions = qv
        }
        if (include?.enrollments) {
          let enr = this.enrollments.filter((e) => e.courseId === c.id)
          if (include.enrollments.where?.studentId) {
            enr = enr.filter((e) => e.studentId === include.enrollments.where.studentId)
          }
          res.enrollments = enr
        }
        return res
      },
      count: async () => this.courses.length,
    }
  }

  get lesson() {
    return {
      findUnique: async ({ where, include }: any) => {
        const l = this.lessons.find((lesson) => lesson.id === where.id)
        if (!l) return null
        const res: any = { ...l }
        if (include?.course) {
          const c = this.courses.find((course) => course.id === l.courseId)
          res.course = c ? { id: c.id, title: c.title, subject: c.subject } : null
        }
        return res
      },
      findMany: async ({ where }: any) => {
        if (where?.courseId) return this.lessons.filter((l) => l.courseId === where.courseId)
        return this.lessons
      },
    }
  }

  get quizVersion() {
    return {
      findUnique: async ({ where, include }: any) => {
        const qv = this.quizVersions.find((q) => q.id === where.id)
        if (!qv) return null
        const res: any = { ...qv }
        res.course = this.courses.find((c) => c.id === qv.courseId) || this.courses[0]
        res.questions = qv.questions
        return res
      },
      findFirst: async ({ where }: any) => {
        return this.quizVersions.find((q) => q.courseId === where.courseId && q.version === where.version) || null
      },
      findMany: async ({ where }: any = {}) => {
        let list = [...this.quizVersions]
        if (where?.courseId) {
          list = list.filter((q) => q.courseId === where.courseId)
        }
        if (where?.isRevoked !== undefined) {
          list = list.filter((q) => q.isRevoked === where.isRevoked)
        }
        return list
      },
      count: async () => this.quizVersions.length,
    }
  }

  get enrollment() {
    return {
      findFirst: async ({ where }: any) => {
        return this.enrollments.find((e) => e.studentId === where.studentId && e.courseId === where.courseId) || null
      },
      create: async ({ data }: any) => {
        const enr = { id: `enr-${Date.now()}`, ...data, createdAt: new Date() }
        this.enrollments.push(enr)
        return enr
      },
      count: async () => this.enrollments.length,
    }
  }

  get idempotencyRecord() {
    return {
      findUnique: async ({ where }: any) => {
        const k = where.uq_idempotency_scope_key
        if (!k) return null
        return this.idempotencyRecords.find((r) => r.studentId === k.studentId && r.routeScope === k.routeScope && r.idempotencyKey === k.idempotencyKey) || null
      },
      create: async ({ data }: any) => {
        const rec: LocalIdempotencyRecord = {
          id: `idemp-${Date.now()}`,
          ...data,
          createdAt: new Date(),
        }
        this.idempotencyRecords.push(rec)
        return rec
      },
      update: async ({ where, data }: any) => {
        const k = where.uq_idempotency_scope_key
        const rec = this.idempotencyRecords.find((r) => r.studentId === k.studentId && r.routeScope === k.routeScope && r.idempotencyKey === k.idempotencyKey)
        if (rec) Object.assign(rec, data)
        return rec
      },
      deleteMany: async () => {
        const count = this.idempotencyRecords.length
        this.idempotencyRecords = []
        return { count }
      },
    }
  }

  get submission() {
    return {
      findUnique: async ({ where }: any) => {
        if (where.uq_submission_student_attempt) {
          const k = where.uq_submission_student_attempt
          return this.submissions.find((s) => s.studentId === k.studentId && s.clientAttemptId === k.clientAttemptId) || null
        }
        if (where.id) {
          return this.submissions.find((s) => s.id === where.id) || null
        }
        return null
      },
      findFirst: async ({ where }: any) => {
        return this.submissions.find((s) => s.id === where.id && s.studentId === where.studentId) || null
      },
      findMany: async ({ where, include, orderBy }: any = {}) => {
        let list = [...this.submissions]
        if (where?.quizVersion?.courseId) {
          const courseQvIds = this.quizVersions.filter((q) => q.courseId === where.quizVersion.courseId).map((q) => q.id)
          list = list.filter((s) => courseQvIds.includes(s.quizVersionId))
        }
        return list.map((s) => {
          const res: any = { ...s }
          if (include?.student) {
            const stu = this.users.find((u) => u.id === s.studentId)
            res.student = stu ? { id: stu.id, name: stu.name, email: stu.email } : null
          }
          if (include?.quizVersion) {
            const qv = this.quizVersions.find((q) => q.id === s.quizVersionId)
            res.quizVersion = qv ? {
              ...qv,
              course: this.courses.find((c) => c.id === qv.courseId) || null,
            } : null
          }
          if (include?.answers) {
            const qv = this.quizVersions.find((q) => q.id === s.quizVersionId)
            res.answers = s.answers.map((a) => {
              const q = qv?.questions.find((quest) => quest.id === a.questionId)
              return {
                ...a,
                question: q || { id: a.questionId, prompt: '', options: [], correctOption: '' },
              }
            })
          }
          return res
        })
      },
      create: async ({ data }: any) => {
        const sub: LocalSubmission = {
          id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          studentId: data.studentId,
          quizVersionId: data.quizVersionId,
          clientAttemptId: data.clientAttemptId,
          idempotencyKey: data.idempotencyKey,
          payloadHash: data.payloadHash,
          status: data.status || 'GRADED',
          score: data.score ?? null,
          totalQuestions: data.totalQuestions ?? null,
          receiptHash: null,
          startedAt: new Date(data.startedAt),
          finalizedAt: new Date(data.finalizedAt),
          acceptedAt: new Date(),
          answers: [],
        }
        this.submissions.push(sub)
        return sub
      },
      update: async ({ where, data }: any) => {
        const sub = this.submissions.find((s) => s.id === where.id)
        if (sub) Object.assign(sub, data)
        return sub
      },
      deleteMany: async () => {
        const count = this.submissions.length
        this.submissions = []
        return { count }
      },
    }
  }

  get submissionAnswer() {
    return {
      create: async ({ data }: any) => {
        const ans: LocalSubmissionAnswer = {
          id: `ans-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          submissionId: data.submissionId,
          questionId: data.questionId,
          answeredOptionId: data.answeredOptionId || null,
          revision: data.revision || 1,
        }
        const sub = this.submissions.find((s) => s.id === data.submissionId)
        if (sub) sub.answers.push(ans)
        return ans
      },
      deleteMany: async () => ({ count: 0 }),
    }
  }

  get auditEvent() {
    return {
      create: async ({ data }: any) => {
        const evt: LocalAuditEvent = {
          id: `evt-${Date.now()}`,
          ...data,
          createdAt: new Date(),
        }
        this.auditEvents.push(evt)
        return evt
      },
      deleteMany: async () => {
        const count = this.auditEvents.length
        this.auditEvents = []
        return { count }
      },
    }
  }
}
