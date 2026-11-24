import { Injectable, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  private assertAdmin(role: string) {
    if (role !== 'admin') throw new ForbiddenException('Admin access only')
  }

  async getUsers(role: string) {
    this.assertAdmin(role)
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    })
    return users.map(u => ({ ...u, createdAt: u.createdAt.toISOString() }))
  }

  async updateUserRole(actorRole: string, userId: string, newRole: 'student' | 'teacher' | 'admin') {
    this.assertAdmin(actorRole)
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    })
    return { ...user, createdAt: user.createdAt.toISOString() }
  }

  async getSyncMonitor(role: string) {
    this.assertAdmin(role)
    const records = await this.prisma.idempotencyRecord.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { student: { select: { name: true, email: true } } },
    })
    return records.map(r => ({
      id: r.id,
      studentId: r.studentId,
      studentName: r.student.name,
      routeScope: r.routeScope,
      idempotencyKey: r.idempotencyKey,
      payloadHash: r.payloadHash,
      createdAt: r.createdAt.toISOString(),
      expiresAt: r.expiresAt.toISOString(),
    }))
  }

  async getAuditLogs(role: string) {
    this.assertAdmin(role)
    const events = await this.prisma.auditEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
      include: { actor: { select: { name: true } } },
    })
    return events.map(e => ({
      id: e.id,
      actorId: e.actorId,
      actorName: e.actor?.name ?? null,
      eventType: e.eventType,
      correlationId: e.correlationId,
      clientAttemptId: e.clientAttemptId,
      idempotencyKey: e.idempotencyKey,
      metadata: e.metadata,
      createdAt: e.createdAt.toISOString(),
    }))
  }

  async getConflictPolicies(role: string) {
    this.assertAdmin(role)
    return [
      { id: '1', name: 'Server Wins on Version Mismatch', strategy: 'server-wins', description: 'When a submission references a quiz version that has since been superseded, the server records the submission and flags it for conflict review. The student\'s answers are preserved; the teacher reviews them against the current version.', status: 'active' },
      { id: '2', name: 'Idempotent Retry Allowed', strategy: 'idempotent-retry', description: 'If a submission upload is interrupted, the client may resend the identical payload with the same idempotency key. The server replays the cached receipt without creating a duplicate record.', status: 'active' },
      { id: '3', name: 'First Commit Wins on Duplicate Key Conflict', strategy: 'first-commit-wins', description: 'If two requests arrive with different payloads but the same idempotency key, the second request is rejected with IDEMPOTENCY_KEY_REUSE. Only the first committed submission stands.', status: 'active' },
      { id: '4', name: 'Finalized Answers Are Immutable', strategy: 'immutable-finalized', description: 'Once a submission is accepted (status RECEIVED or GRADED), no actor — including administrators — may alter the submitted answers. Changes are rejected at the API layer and logged to the audit trail.', status: 'active' },
      { id: '5', name: 'Offline Content Conflict Notification', strategy: 'notify-on-version-delta', description: 'When the client syncs and the server detects that the downloaded quiz version differs from the current published version, a conflict notification is returned. The student is prompted to re-download the latest pack before starting a new attempt.', status: 'active' },
    ]
  }

  async publishCourse(role: string, courseId: string) {
    this.assertAdmin(role)
    const course = await this.prisma.course.update({
      where: { id: courseId },
      data: { isPublished: true },
      select: { id: true, title: true, isPublished: true },
    })
    return course
  }

  async getStats(role: string) {
    this.assertAdmin(role)
    const [totalStudents, totalTeachers, totalAdmins, syncRecords, auditEvents] = await Promise.all([
      this.prisma.user.count({ where: { role: 'student' } }),
      this.prisma.user.count({ where: { role: 'teacher' } }),
      this.prisma.user.count({ where: { role: 'admin' } }),
      this.prisma.idempotencyRecord.count(),
      this.prisma.auditEvent.count(),
    ])
    return { totalStudents, totalTeachers, totalAdmins, activeSyncRecords: syncRecords, auditEventCount: auditEvents }
  }
}
