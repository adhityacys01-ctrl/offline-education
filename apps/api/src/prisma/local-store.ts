import * as bcrypt from 'bcryptjs'
import { COURSE_CATALOG } from './course-data'

export interface LocalUser {
  id: string
  email: string
  name: string
  passwordHash: string
  role: 'student' | 'teacher' | 'admin'
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
  translations?: any
  glossary?: any
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

export interface LocalLessonTranslation {
  id: string
  lessonId: string
  sourceVersion: number
  language: string
  translatedTitle: string
  translatedContent: string
  revision: number
  validationStatus: string
  validationReport: any
  approvalStatus: string
  approverId?: string | null
  publishedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface LocalGlossaryEntry {
  id: string
  translationId: string
  lessonId: string
  term: string
  enDef: string
  hiDef?: string | null
  mrDef?: string | null
  enEquiv?: string | null
  hiEquiv?: string | null
  mrEquiv?: string | null
  approvalStatus: string
  revision: number
  createdAt: Date
  updatedAt?: Date
}

export interface LocalLessonAudio {
  id: string
  translationId: string
  language: string
  revision: number
  fileRef?: string | null
  durationSeconds?: number | null
  sizeBytes?: number | null
  generationStatus: string
  createdAt: Date
}

export interface LocalTranslationAudit {
  id: string
  translationId: string
  actorId: string
  action: string
  prevRevision?: number | null
  newRevision: number
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
  lessonTranslations: LocalLessonTranslation[] = []
  glossaryEntries: LocalGlossaryEntry[] = []
  lessonAudios: LocalLessonAudio[] = []
  translationAudits: LocalTranslationAudit[] = []

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

    const admin: LocalUser = {
      id: 'usr-admin-system',
      email: 'admin@school.com',
      name: 'Admin User',
      passwordHash,
      role: 'admin',
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(student1, student2, teacher, admin)

    // Seed initial audit events
    this.auditEvents.push(
      {
        id: 'evt-init-01',
        actorId: admin.id,
        eventType: 'system.bootstrap',
        clientAttemptId: null,
        idempotencyKey: null,
        metadata: { status: 'initialized' },
        createdAt: new Date(Date.now() - 86400000 * 2),
      },
      {
        id: 'evt-init-02',
        actorId: student1.id,
        eventType: 'submission.created',
        clientAttemptId: 'ca-seed-001',
        idempotencyKey: 'ik-seed-001',
        metadata: { course: 'Environmental Science' },
        createdAt: new Date(Date.now() - 3600000 * 4),
      },
      {
        id: 'evt-init-03',
        actorId: student2.id,
        eventType: 'submission.duplicate_blocked',
        clientAttemptId: 'ca-seed-002',
        idempotencyKey: 'ik-seed-002',
        metadata: { rule: 'idempotent-first-commit-wins' },
        createdAt: new Date(Date.now() - 1800000 * 3),
      },
    )

    // Seed initial idempotency records
    this.idempotencyRecords.push(
      {
        id: 'idemp-seed-01',
        studentId: student1.id,
        routeScope: 'POST:/submissions',
        idempotencyKey: 'ik-seed-001',
        payloadHash: 'a8f5b2c9d1e34567890abcdef',
        responseJson: { status: 'RECEIVED' },
        createdAt: new Date(Date.now() - 3600000 * 4),
        expiresAt: new Date(Date.now() + 86400000 * 28),
      },
      {
        id: 'idemp-seed-02',
        studentId: student2.id,
        routeScope: 'POST:/submissions',
        idempotencyKey: 'ik-seed-002',
        payloadHash: 'b9e6c3d0f2a45678901bcdefa',
        responseJson: { status: 'RECEIVED' },
        createdAt: new Date(Date.now() - 1800000 * 3),
        expiresAt: new Date(Date.now() + 86400000 * 29),
      },
    )

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
        const lessonId = `seed-lesson-${c.subject.toLowerCase().replace(/ /g, '-')}-${ld.order}`
        this.lessons.push({
          id: lessonId,
          courseId: c.id,
          title: ld.title,
          order: ld.order,
          contentHtml: ld.contentHtml,
          keyPoints: ld.keyPoints,
          translations: (ld as any).translations,
          glossary: (ld as any).glossary,
          mediaUrl: null,
          mediaType: null,
          contentHash: `sha256-lesson-${c.id}-${ld.order}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        })

        // Preload published translations
        if ((ld as any).translations) {
          const t = (ld as any).translations
          if (t.hi) {
            this.lessonTranslations.push({
              id: `trans-seed-${lessonId}-hi`,
              lessonId,
              sourceVersion: 1,
              language: 'hi',
              translatedTitle: t.hi.title,
              translatedContent: t.hi.contentHtml,
              revision: 1,
              validationStatus: 'PASSED',
              validationReport: { passed: true, warnings: [], errors: [], preservedTokens: [] },
              approvalStatus: 'PUBLISHED',
              approverId: teacher.id,
              publishedAt: new Date(Date.now() - 86400000),
              createdAt: new Date(Date.now() - 86400000 * 2),
              updatedAt: new Date(Date.now() - 86400000),
            })
          }
          if (t.mr) {
            this.lessonTranslations.push({
              id: `trans-seed-${lessonId}-mr`,
              lessonId,
              sourceVersion: 1,
              language: 'mr',
              translatedTitle: t.mr.title,
              translatedContent: t.mr.contentHtml,
              revision: 1,
              validationStatus: 'PASSED',
              validationReport: { passed: true, warnings: [], errors: [], preservedTokens: [] },
              approvalStatus: 'PUBLISHED',
              approverId: teacher.id,
              publishedAt: new Date(Date.now() - 86400000),
              createdAt: new Date(Date.now() - 86400000 * 2),
              updatedAt: new Date(Date.now() - 86400000),
            })
          }
        }

        if ((ld as any).glossary && Array.isArray((ld as any).glossary)) {
          (ld as any).glossary.forEach((g: any, gIdx: number) => {
            this.glossaryEntries.push({
              id: `gloss-${lessonId}-${gIdx}`,
              translationId: `trans-seed-${lessonId}-hi`,
              lessonId,
              term: g.term,
              enDef: g.enDef,
              hiDef: g.hiDef ?? null,
              mrDef: g.mrDef ?? null,
              enEquiv: g.enEquiv ?? g.term,
              hiEquiv: g.hiEquiv ?? null,
              mrEquiv: g.mrEquiv ?? null,
              approvalStatus: 'PUBLISHED',
              revision: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          })
        }
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

    // Seed sample published multilingual translations + glossary for Biology Lesson 3
    const bioLesson3 = this.lessons.find((l) => l.id === 'seed-lesson-biology-3')
    if (bioLesson3) {
      const hiId = 'trans-seed-bio3-hi'
      const mrId = 'trans-seed-bio3-mr'
      this.lessonTranslations.push(
        {
          id: hiId,
          lessonId: bioLesson3.id,
          sourceVersion: 1,
          language: 'hi',
          translatedTitle: 'पौधों में प्रकाश संश्लेषण और ऊर्जा रूपांतरण',
          translatedContent:
            '<h2>पौधों में प्रकाश संश्लेषण की प्रक्रिया</h2>\n' +
            '<p>प्रकाश संश्लेषण पृथ्वी पर जैव भार उत्पादन का मुख्य इंजन है। सूर्य का प्रकाश photosystems II और I में इलेक्ट्रॉनों को ऊर्जा देता है, जिससे इलेक्ट्रॉन परिवहन श्रृंखला (electron transport chain) संचालित होती है और ATP तथा NADPH उत्पन्न होते हैं।</p>\n' +
            '<p><strong>रासायनिक समीकरण:</strong> 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</p>',
          revision: 1,
          validationStatus: 'PASSED',
          validationReport: {
            passed: true,
            warnings: [],
            errors: [],
            preservedTokens: [
              { original: 'ATP', found: true, count: 1, expected: 1 },
              { original: 'NADPH', found: true, count: 1, expected: 1 },
              { original: '6CO₂', found: true, count: 1, expected: 1 },
              { original: '6H₂O', found: true, count: 1, expected: 1 },
              { original: 'C₆H₁₂O₆', found: true, count: 1, expected: 1 },
              { original: '6O₂', found: true, count: 1, expected: 1 },
            ],
          },
          approvalStatus: 'PUBLISHED',
          approverId: teacher.id,
          publishedAt: new Date(Date.now() - 86400000),
          createdAt: new Date(Date.now() - 86400000 * 2),
          updatedAt: new Date(Date.now() - 86400000),
        },
        {
          id: mrId,
          lessonId: bioLesson3.id,
          sourceVersion: 1,
          language: 'mr',
          translatedTitle: 'वनस्पती प्रकाशसंश्लेषण आणि ऊर्जा रूपांतरण',
          translatedContent:
            '<h2>वनस्पती प्रकाशसंश्लेषण यंत्रणा</h2>\n' +
            '<p>प्रकाशसंश्लेषण हे पृथ्वीवरील जैववस्तुमान निर्मितीचे मुख्य इंजिन आहे. सूर्यप्रकाश photosystems II आणि I मधील इलेक्ट्रॉन्सना ऊर्जा देतो, ज्यामुळे इलेक्ट्रॉन परिवहन साखळी सुरू होते आणि ATP व NADPH तयार होतात.</p>\n' +
            '<p><strong>रासायनिक समीकरण:</strong> 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</p>',
          revision: 1,
          validationStatus: 'PASSED',
          validationReport: {
            passed: true,
            warnings: [],
            errors: [],
            preservedTokens: [
              { original: 'ATP', found: true, count: 1, expected: 1 },
              { original: 'NADPH', found: true, count: 1, expected: 1 },
              { original: '6CO₂', found: true, count: 1, expected: 1 },
              { original: '6H₂O', found: true, count: 1, expected: 1 },
              { original: 'C₆H₁₂O₆', found: true, count: 1, expected: 1 },
              { original: '6O₂', found: true, count: 1, expected: 1 },
            ],
          },
          approvalStatus: 'PUBLISHED',
          approverId: teacher.id,
          publishedAt: new Date(Date.now() - 86400000),
          createdAt: new Date(Date.now() - 86400000 * 2),
          updatedAt: new Date(Date.now() - 86400000),
        },
      )

      this.glossaryEntries.push(
        {
          id: 'gloss-seed-bio3-1',
          translationId: hiId,
          lessonId: bioLesson3.id,
          term: 'Photosynthesis',
          enDef: 'Process by which green plants convert sunlight, CO₂, and H₂O into glucose and oxygen.',
          hiDef: 'वह प्रक्रिया जिसके द्वारा हरे पौधे सूर्य के प्रकाश, CO₂ और H₂O को ग्लूकोज और ऑक्सीजन में बदलते हैं।',
          mrDef: 'ज्या प्रक्रियेद्वारे हिरव्या वनस्पती सूर्यप्रकाश, CO₂ आणि H₂O यांचे ग्लुकोज व ऑक्सिजनमध्ये रूपांतर करतात.',
          enEquiv: 'Photosynthesis',
          hiEquiv: 'प्रकाश संश्लेषण',
          mrEquiv: 'प्रकाशसंश्लेषण',
          approvalStatus: 'APPROVED',
          revision: 1,
          createdAt: new Date(),
        },
        {
          id: 'gloss-seed-bio3-2',
          translationId: hiId,
          lessonId: bioLesson3.id,
          term: 'ATP',
          enDef: 'Adenosine Triphosphate — primary cellular energy carrier molecule.',
          hiDef: 'एडेनोसिन ट्राइफॉस्फेट — कोशिका का मुख्य ऊर्जा वाहक अणु।',
          mrDef: 'अॅडेनोसिन ट्रायफॉस्फेट — पेशीतील मुख्य ऊर्जा वाहक रेणू.',
          enEquiv: 'ATP',
          hiEquiv: 'ATP (एटीपी)',
          mrEquiv: 'ATP (एटीपी)',
          approvalStatus: 'APPROVED',
          revision: 1,
          createdAt: new Date(),
        },
        {
          id: 'gloss-seed-bio3-3',
          translationId: hiId,
          lessonId: bioLesson3.id,
          term: 'NADPH',
          enDef: 'Electron carrier coenzyme that provides reducing power in the Calvin cycle.',
          hiDef: 'इलेक्ट्रॉन वाहक सह-एंजाइम जो कैल्विन चक्र में अपचयन शक्ति प्रदान करता है।',
          mrDef: 'कॅल्विन चक्रामध्ये ऊर्जा व इलेक्ट्रॉन पुरवणारे सह-विकर (coenzyme).',
          enEquiv: 'NADPH',
          hiEquiv: 'NADPH',
          mrEquiv: 'NADPH',
          approvalStatus: 'APPROVED',
          revision: 1,
          createdAt: new Date(),
        },
      )

      this.translationAudits.push(
        {
          id: 'taud-seed-1',
          translationId: hiId,
          actorId: teacher.id,
          action: 'published',
          prevRevision: 1,
          newRevision: 1,
          metadata: { language: 'hi' },
          createdAt: new Date(Date.now() - 86400000),
        },
        {
          id: 'taud-seed-2',
          translationId: mrId,
          actorId: teacher.id,
          action: 'published',
          prevRevision: 1,
          newRevision: 1,
          metadata: { language: 'mr' },
          createdAt: new Date(Date.now() - 86400000),
        },
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
      update: async ({ where, data }: any) => {
        const u = this.users.find((user) => user.id === where.id)
        if (u) {
          if (data.role) u.role = data.role
          if (data.name) u.name = data.name
        }
        return u
      },
      count: async (args?: any) => {
        if (args?.where?.role) {
          return this.users.filter((u) => u.role === args.where.role).length
        }
        return this.users.length
      },
    }
  }

  get course() {
    return {
      update: async ({ where, data }: any) => {
        const c = this.courses.find((course) => course.id === where.id)
        if (c) Object.assign(c, data)
        return c
      },
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
      findMany: async (args?: any) => {
        return this.idempotencyRecords.map((r) => {
          const student = this.users.find((u) => u.id === r.studentId)
          return {
            ...r,
            student: student
              ? { name: student.name, email: student.email }
              : { name: 'Student', email: 'student@example.com' },
          }
        })
      },
      count: async () => this.idempotencyRecords.length,
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
      findMany: async (args?: any) => {
        return this.auditEvents.map((e) => {
          const actor = e.actorId ? this.users.find((u) => u.id === e.actorId) : null
          return {
            ...e,
            actor: actor ? { name: actor.name } : null,
          }
        })
      },
      count: async () => this.auditEvents.length,
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

  // ── Multilingual delegates ──────────────────────────────────────────────────
  get lessonTranslation() {
    return {
      findMany: async ({ where }: any = {}) => {
        let list = [...this.lessonTranslations]
        if (where?.lessonId) list = list.filter((t) => t.lessonId === where.lessonId)
        if (where?.language) list = list.filter((t) => t.language === where.language)
        if (where?.approvalStatus) list = list.filter((t) => t.approvalStatus === where.approvalStatus)
        return list
      },
      findFirst: async ({ where }: any) => {
        let list = [...this.lessonTranslations]
        if (where?.lessonId) list = list.filter((t) => t.lessonId === where.lessonId)
        if (where?.language) list = list.filter((t) => t.language === where.language)
        if (where?.approvalStatus) list = list.filter((t) => t.approvalStatus === where.approvalStatus)
        return list[0] || null
      },
      findUnique: async ({ where }: any) => {
        return this.lessonTranslations.find((t) => t.id === where.id) || null
      },
      create: async ({ data }: any) => {
        const t: LocalLessonTranslation = {
          id: `trans-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          lessonId: data.lessonId,
          sourceVersion: data.sourceVersion || 1,
          language: data.language,
          translatedTitle: data.translatedTitle || '',
          translatedContent: data.translatedContent || '',
          revision: data.revision || 1,
          validationStatus: data.validationStatus || 'PENDING',
          validationReport: data.validationReport || null,
          approvalStatus: data.approvalStatus || 'DRAFT',
          approverId: data.approverId || null,
          publishedAt: data.publishedAt || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        this.lessonTranslations.push(t)
        return t
      },
      update: async ({ where, data }: any) => {
        const t = this.lessonTranslations.find((x) => x.id === where.id)
        if (t) Object.assign(t, { ...data, updatedAt: new Date() })
        return t
      },
      deleteMany: async ({ where }: any = {}) => {
        const before = this.lessonTranslations.length
        if (where?.lessonId) this.lessonTranslations = this.lessonTranslations.filter((t) => t.lessonId !== where.lessonId)
        return { count: before - this.lessonTranslations.length }
      },
    }
  }

  get glossaryEntry() {
    return {
      findMany: async ({ where }: any = {}) => {
        let list = [...this.glossaryEntries]
        if (where?.lessonId) list = list.filter((e) => e.lessonId === where.lessonId)
        if (where?.translationId) list = list.filter((e) => e.translationId === where.translationId)
        return list
      },
      findUnique: async ({ where }: any) => {
        return this.glossaryEntries.find((e) => e.id === where.id) || null
      },
      create: async ({ data }: any) => {
        const entry: LocalGlossaryEntry = {
          id: `gloss-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          translationId: data.translationId || '',
          lessonId: data.lessonId,
          term: data.term,
          enDef: data.enDef || '',
          hiDef: data.hiDef || null,
          mrDef: data.mrDef || null,
          enEquiv: data.enEquiv || null,
          hiEquiv: data.hiEquiv || null,
          mrEquiv: data.mrEquiv || null,
          approvalStatus: data.approvalStatus || 'DRAFT',
          revision: data.revision || 1,
          createdAt: new Date(),
        }
        this.glossaryEntries.push(entry)
        return entry
      },
      update: async ({ where, data }: any) => {
        const entry = this.glossaryEntries.find((e) => e.id === where.id)
        if (entry) Object.assign(entry, data)
        return entry
      },
      deleteMany: async ({ where }: any = {}) => {
        const before = this.glossaryEntries.length
        if (where?.lessonId) this.glossaryEntries = this.glossaryEntries.filter((e) => e.lessonId !== where.lessonId)
        return { count: before - this.glossaryEntries.length }
      },
    }
  }

  get lessonAudio() {
    return {
      findMany: async ({ where }: any = {}) => {
        let list = [...this.lessonAudios]
        if (where?.translationId) list = list.filter((a) => a.translationId === where.translationId)
        if (where?.language) list = list.filter((a) => a.language === where.language)
        return list
      },
      findFirst: async ({ where }: any) => {
        let list = [...this.lessonAudios]
        if (where?.translationId) list = list.filter((a) => a.translationId === where.translationId)
        if (where?.language) list = list.filter((a) => a.language === where.language)
        return list.sort((a, b) => b.revision - a.revision)[0] || null
      },
      findUnique: async ({ where }: any) => {
        return this.lessonAudios.find((a) => a.id === where.id) || null
      },
      create: async ({ data }: any) => {
        const rec: LocalLessonAudio = {
          id: `aud-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          translationId: data.translationId,
          language: data.language,
          revision: data.revision || 1,
          fileRef: data.fileRef || null,
          durationSeconds: data.durationSeconds ?? null,
          sizeBytes: data.sizeBytes ?? null,
          generationStatus: data.generationStatus || 'PENDING',
          createdAt: new Date(),
        }
        this.lessonAudios.push(rec)
        return rec
      },
      update: async ({ where, data }: any) => {
        const rec = this.lessonAudios.find((a) => a.id === where.id)
        if (rec) Object.assign(rec, data)
        return rec
      },
    }
  }

  get translationAudit() {
    return {
      findMany: async ({ where }: any = {}) => {
        let list = [...this.translationAudits]
        if (where?.translationId) list = list.filter((a) => a.translationId === where.translationId)
        return list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      },
      create: async ({ data }: any) => {
        const rec: LocalTranslationAudit = {
          id: `taud-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          translationId: data.translationId,
          actorId: data.actorId,
          action: data.action,
          prevRevision: data.prevRevision ?? null,
          newRevision: data.newRevision || 1,
          metadata: data.metadata || null,
          createdAt: new Date(),
        }
        this.translationAudits.push(rec)
        return rec
      },
    }
  }
}
