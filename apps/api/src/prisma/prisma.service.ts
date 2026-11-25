import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient, Prisma } from '@prisma/client'
import { LocalStore } from './local-store'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public isConnected = false
  public localStore = new LocalStore()
  private superDelegates: Record<string, any> = {}

  constructor() {
    super()
    this.attachDelegates()
  }

  private attachDelegates() {
    const models = [
      'user',
      'course',
      'lesson',
      'quizVersion',
      'enrollment',
      'submission',
      'submissionAnswer',
      'idempotencyRecord',
      'auditEvent',
      'lessonTranslation',
      'glossaryEntry',
      'lessonAudio',
      'translationAudit',
    ] as const

    for (const m of models) {
      const superDelegate = (this as any)[m]
      this.superDelegates[m] = superDelegate
      Object.defineProperty(this, m, {
        get: () => (this.isConnected ? superDelegate : (this.localStore as any)[m]),
        configurable: true,
        enumerable: true,
      })
    }
  }

  async onModuleInit() {
    try {
      await this.$connect()
      this.isConnected = true
      console.log('✅ Prisma connected to PostgreSQL')
    } catch (err: any) {
      this.isConnected = false
      console.warn('⚠️ PostgreSQL offline. Running in offline fallback mode with local demo store:', err.message || err)
    }
  }

  async onModuleDestroy() {
    try {
      if (this.isConnected) {
        await this.$disconnect()
      }
    } catch {}
  }

  override get user(): Prisma.UserDelegate {
    return (this.isConnected ? this.superDelegates.user : this.localStore.user) as any
  }

  override get course(): Prisma.CourseDelegate {
    return (this.isConnected ? this.superDelegates.course : this.localStore.course) as any
  }

  override get lesson(): Prisma.LessonDelegate {
    return (this.isConnected ? this.superDelegates.lesson : this.localStore.lesson) as any
  }

  override get quizVersion(): Prisma.QuizVersionDelegate {
    return (this.isConnected ? this.superDelegates.quizVersion : this.localStore.quizVersion) as any
  }

  override get enrollment(): Prisma.EnrollmentDelegate {
    return (this.isConnected ? this.superDelegates.enrollment : this.localStore.enrollment) as any
  }

  override get submission(): Prisma.SubmissionDelegate {
    return (this.isConnected ? this.superDelegates.submission : this.localStore.submission) as any
  }

  override get submissionAnswer(): Prisma.SubmissionAnswerDelegate {
    return (this.isConnected ? this.superDelegates.submissionAnswer : this.localStore.submissionAnswer) as any
  }

  override get idempotencyRecord(): Prisma.IdempotencyRecordDelegate {
    return (this.isConnected ? this.superDelegates.idempotencyRecord : this.localStore.idempotencyRecord) as any
  }

  override get auditEvent(): Prisma.AuditEventDelegate {
    return (this.isConnected ? this.superDelegates.auditEvent : this.localStore.auditEvent) as any
  }

  get lessonTranslation(): any {
    return this.isConnected ? this.superDelegates.lessonTranslation : this.localStore.lessonTranslation
  }

  get glossaryEntry(): any {
    return this.isConnected ? this.superDelegates.glossaryEntry : this.localStore.glossaryEntry
  }

  get lessonAudio(): any {
    return this.isConnected ? this.superDelegates.lessonAudio : this.localStore.lessonAudio
  }

  get translationAudit(): any {
    return this.isConnected ? this.superDelegates.translationAudit : this.localStore.translationAudit
  }

  override async $transaction(fnOrArray: any): Promise<any> {
    if (this.isConnected) {
      try {
        return await super.$transaction(fnOrArray)
      } catch (err: any) {
        console.warn('Transaction DB error, falling back to local store:', err.message || err)
      }
    }
    if (typeof fnOrArray === 'function') {
      return fnOrArray(this)
    }
    if (Array.isArray(fnOrArray)) {
      return Promise.all(fnOrArray)
    }
  }
}
