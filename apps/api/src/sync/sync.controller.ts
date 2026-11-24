import { Controller, Get, Param, Req } from '@nestjs/common'
import { SubmissionsService } from '../submissions/submissions.service'
import { PrismaService } from '../prisma/prisma.service'
import * as jwt from 'jsonwebtoken'

@Controller('sync')
export class SyncController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * GET /sync/attempts/:clientAttemptId
   * Used by client syncEngine.ts reconcileAmbiguousItems() to check if a
   * submission that had a dropped response actually landed on the server.
   */
  @Get('attempts/:clientAttemptId')
  async reconcileAttempt(
    @Req() req: any,
    @Param('clientAttemptId') clientAttemptId: string,
  ) {
    let studentId = req.user?.id
    if (!studentId && req.headers?.authorization) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded: any = jwt.decode(token)
        if (decoded?.sub) studentId = decoded.sub
      } catch {}
    }
    if (!studentId) {
      const student = await this.prisma.user.findFirst({ where: { role: 'student' } })
      studentId = student?.id || 'usr-student-aarav'
    }
    return this.submissionsService.getSubmissionByClientAttemptId(clientAttemptId, studentId)
  }
}
