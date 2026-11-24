import { Controller, Get, Param, Req } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ManifestService } from './manifest.service'
import { ContentService } from './content.service'
import { PrismaService } from '../prisma/prisma.service'
import * as jwt from 'jsonwebtoken'

@ApiTags('content')
@Controller()
export class ContentController {
  constructor(
    private readonly manifestService: ManifestService,
    private readonly contentService: ContentService,
    private readonly prisma: PrismaService,
  ) {}

  // ── Offline Manifest ────────────────────────────────────────────────────────
  @Get('courses/:courseId/offline-manifest')
  @ApiOperation({ summary: 'Get verifiable offline download manifest for a course' })
  async getOfflineManifest(
    @Param('courseId') courseId: string,
    @Req() req: any,
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
    return this.manifestService.getOfflineManifest(courseId, studentId)
  }

  // ── Individual content items (hash-verified, accessible) ───────────────────
  @Get('content/lessons/:lessonId')
  @ApiOperation({ summary: 'Get a single lesson content item' })
  async getLesson(@Param('lessonId') lessonId: string) {
    return this.contentService.getLesson(lessonId)
  }

  @Get('content/quizzes/:quizVersionId')
  @ApiOperation({ summary: 'Get a quiz version with all questions and options' })
  async getQuizVersion(@Param('quizVersionId') quizVersionId: string) {
    return this.contentService.getQuizVersion(quizVersionId)
  }
}
