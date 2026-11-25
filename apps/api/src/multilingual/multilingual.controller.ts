import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Req,
  Res,
  Query,
  UseGuards,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import type { Response } from 'express'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { MultilingualService } from './multilingual.service'
import { SupportedLanguage } from './translation.service'

function assertTeacherOrAdmin(req: any) {
  if (req.user?.role !== 'teacher' && req.user?.role !== 'admin') {
    throw new ForbiddenException('Teacher or admin access required')
  }
}

function assertAdmin(req: any) {
  if (req.user?.role !== 'admin') {
    throw new ForbiddenException('Admin access required')
  }
}

@Controller('multilingual')
@UseGuards(JwtAuthGuard)
export class MultilingualController {
  constructor(private readonly svc: MultilingualService) {}

  @Get('lessons')
  async listLessons(@Req() req: any) {
    assertTeacherOrAdmin(req)
    return this.svc.listAvailableLessons()
  }

  @Post('import')
  async importPassage(@Body() body: any, @Req() req: any) {
    assertTeacherOrAdmin(req)
    if (!body?.rawText) throw new BadRequestException('rawText is required')
    return this.svc.importPassage(
      body.sourceTitle || 'Imported Passage',
      body.rawText,
      body.protectedTerms || [],
    )
  }

  @Post('generate')
  async generate(@Body() body: any, @Req() req: any) {
    assertTeacherOrAdmin(req)
    const { lessonId, sourceTitle, sourceContent, targetLanguages, protectedTerms = [] } = body
    if (!lessonId || !sourceContent) throw new BadRequestException('lessonId and sourceContent required')
    return this.svc.generateTranslations(
      lessonId,
      sourceTitle || 'Lesson',
      sourceContent,
      (targetLanguages || ['hi', 'mr']) as SupportedLanguage[],
      protectedTerms,
      req.user.id,
    )
  }

  @Get('translations/:lessonId')
  async getTranslations(@Param('lessonId') lessonId: string, @Req() req: any) {
    assertTeacherOrAdmin(req)
    return this.svc.getTranslations(lessonId)
  }

  @Get('translation/:id')
  async getTranslation(@Param('id') id: string, @Req() req: any) {
    assertTeacherOrAdmin(req)
    return this.svc.getTranslation(id)
  }

  @Patch('translation/:id')
  async update(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    assertTeacherOrAdmin(req)
    return this.svc.updateTranslation(id, body, req.user.id)
  }

  @Post('translation/:id/validate')
  async validate(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    assertTeacherOrAdmin(req)
    return this.svc.revalidateTranslation(id, body?.originalContent || '', req.user.id)
  }

  @Post('translation/:id/approve')
  async approve(@Param('id') id: string, @Req() req: any) {
    assertTeacherOrAdmin(req)
    return this.svc.approveTranslation(id, req.user.id)
  }

  @Post('translation/:id/publish')
  async publish(@Param('id') id: string, @Req() req: any) {
    assertTeacherOrAdmin(req)
    return this.svc.publishTranslation(id, req.user.id)
  }

  @Get('published/:lessonId/:language')
  async getPublished(
    @Param('lessonId') lessonId: string,
    @Param('language') language: string,
    @Req() req: any,
  ) {
    const t = await this.svc.getPublishedTranslation(
      lessonId,
      language as SupportedLanguage,
      req.user,
    )
    return t || { notAvailable: true }
  }

  @Get('pack/:courseId')
  async getCoursePack(
    @Param('courseId') courseId: string,
    @Query('languages') languagesQuery: string,
    @Req() req: any,
  ) {
    const langs = (languagesQuery ? languagesQuery.split(',') : ['hi', 'mr']).filter((l) =>
      ['en', 'hi', 'mr'].includes(l),
    ) as SupportedLanguage[]
    return this.svc.getCourseMultilingualPack(courseId, langs, req.user)
  }

  @Get('glossary/:lessonId')
  async getGlossary(@Param('lessonId') lessonId: string, @Req() req: any) {
    return this.svc.getGlossary(lessonId, req.user?.role)
  }

  @Post('glossary/:lessonId')
  async createGlossaryEntry(@Param('lessonId') lessonId: string, @Body() body: any, @Req() req: any) {
    assertTeacherOrAdmin(req)
    if (!body?.term || !body?.enDef) throw new BadRequestException('term and enDef required')
    return this.svc.createGlossaryEntry(lessonId, body)
  }

  @Patch('glossary/:entryId')
  async updateGlossaryEntry(@Param('entryId') entryId: string, @Body() body: any, @Req() req: any) {
    assertTeacherOrAdmin(req)
    return this.svc.updateGlossaryEntry(entryId, body)
  }

  @Post('audio/generate/:translationId')
  async generateAudio(@Param('translationId') translationId: string, @Req() req: any) {
    assertTeacherOrAdmin(req)
    return this.svc.generateAudio(translationId)
  }

  @Get('audio/:translationId/:language')
  async getAudio(@Param('translationId') translationId: string, @Param('language') language: string) {
    return this.svc.getAudio(translationId, language as SupportedLanguage)
  }

  @Get('audio/file/:fileName')
  async getAudioFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const safeName = path.basename(fileName)
    const uploadRoot = process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'uploads')
    const filePath = path.join(uploadRoot, 'audio', safeName)
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Audio file not found')
    }
    res.sendFile(filePath)
  }

  @Get('history/:translationId')
  async getHistory(@Param('translationId') translationId: string, @Req() req: any) {
    assertTeacherOrAdmin(req)
    return this.svc.getHistory(translationId)
  }

  @Get('admin/stats')
  async adminStats(@Req() req: any) {
    assertAdmin(req)
    return this.svc.getAdminStats()
  }
}
