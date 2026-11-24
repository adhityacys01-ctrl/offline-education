import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient, Prisma } from '@prisma/client'
import { LocalStore } from './local-store'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public isConnected = false
  public localStore = new LocalStore()

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
    ] as const

    for (const m of models) {
      const superDelegate = (this as any)[m]
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
    return (this.isConnected ? super.user : this.localStore.user) as any
  }

  override get course(): Prisma.CourseDelegate {
    return (this.isConnected ? super.course : this.localStore.course) as any
  }

  override get lesson(): Prisma.LessonDelegate {
    return (this.isConnected ? super.lesson : this.localStore.lesson) as any
  }

  override get quizVersion(): Prisma.QuizVersionDelegate {
    return (this.isConnected ? super.quizVersion : this.localStore.quizVersion) as any
  }

  override get enrollment(): Prisma.EnrollmentDelegate {
    return (this.isConnected ? super.enrollment : this.localStore.enrollment) as any
  }

  override get submission(): Prisma.SubmissionDelegate {
    return (this.isConnected ? super.submission : this.localStore.submission) as any
  }

  override get submissionAnswer(): Prisma.SubmissionAnswerDelegate {
    return (this.isConnected ? super.submissionAnswer : this.localStore.submissionAnswer) as any
  }

  override get idempotencyRecord(): Prisma.IdempotencyRecordDelegate {
    return (this.isConnected ? super.idempotencyRecord : this.localStore.idempotencyRecord) as any
  }

  override get auditEvent(): Prisma.AuditEventDelegate {
    return (this.isConnected ? super.auditEvent : this.localStore.auditEvent) as any
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
