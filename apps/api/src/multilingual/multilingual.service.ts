import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { TranslationService, SupportedLanguage } from './translation.service'
import { TokenProtectionService } from './token-protection.service'
import { AudioService } from './audio.service'

@Injectable()
export class MultilingualService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translation: TranslationService,
    private readonly tokenProtection: TokenProtectionService,
    private readonly audioService: AudioService,
  ) {}

  async listAvailableLessons() {
    const courses = await this.prisma.course.findMany({
      include: { lessons: true },
      orderBy: { createdAt: 'asc' },
    })
    return courses.flatMap((c: any) =>
      (c.lessons || []).map((l: any) => ({
        id: l.id,
        courseId: c.id,
        courseTitle: c.title,
        subject: c.subject,
        title: l.title,
        order: l.order,
        contentHtml: l.contentHtml,
      })),
    )
  }

  importPassage(sourceTitle: string, rawText: string, protectedTerms: string[] = []) {
    const parsed = this.tokenProtection.parsePassageStructure(rawText, protectedTerms)
    return {
      sourceTitle,
      ...parsed,
    }
  }

  async generateTranslations(
    lessonId: string,
    sourceTitle: string,
    sourceContent: string,
    targetLanguages: SupportedLanguage[],
    protectedTerms: string[],
    actorId: string,
  ) {
    const langsToGenerate: SupportedLanguage[] = Array.from(new Set(targetLanguages))
    const results = await this.translation.generateTranslations(
      sourceTitle,
      sourceContent,
      langsToGenerate,
      protectedTerms,
    )

    const saved: any[] = []
    for (const r of results) {
      const existingList = await this.prisma.lessonTranslation.findMany({
        where: { lessonId, language: r.language },
      })
      const latest = existingList.sort((a: any, b: any) => b.revision - a.revision)[0]

      let record: any
      if (latest) {
        const nextRev = (latest.revision || 1) + 1
        record = await this.prisma.lessonTranslation.update({
          where: { id: latest.id },
          data: {
            translatedTitle: r.translatedTitle,
            translatedContent: r.translatedContent,
            validationStatus: r.validationStatus,
            validationReport: r.validationReport,
            approvalStatus: r.validationStatus === 'PASSED' ? 'VALIDATED' : 'GENERATED',
            revision: nextRev,
            publishedAt: null,
          },
        })
        await this.prisma.translationAudit.create({
          data: {
            translationId: record.id,
            actorId,
            action: 'generated',
            prevRevision: latest.revision,
            newRevision: nextRev,
            metadata: { language: r.language, validationStatus: r.validationStatus },
          },
        })
      } else {
        record = await this.prisma.lessonTranslation.create({
          data: {
            lessonId,
            sourceVersion: 1,
            language: r.language,
            translatedTitle: r.translatedTitle,
            translatedContent: r.translatedContent,
            validationStatus: r.validationStatus,
            validationReport: r.validationReport,
            approvalStatus: r.validationStatus === 'PASSED' ? 'VALIDATED' : 'GENERATED',
            revision: 1,
          },
        })
        await this.prisma.translationAudit.create({
          data: {
            translationId: record.id,
            actorId,
            action: 'generated',
            prevRevision: null,
            newRevision: 1,
            metadata: { language: r.language, validationStatus: r.validationStatus },
          },
        })
      }

      saved.push(record)
    }

    const existingGlossary = await this.prisma.glossaryEntry.findMany({ where: { lessonId } })
    let glossary = existingGlossary
    if (existingGlossary.length === 0 && saved.length > 0) {
      const candidates = await this.translation.generateGlossaryCandidates(
        sourceContent,
        protectedTerms,
        langsToGenerate,
      )
      const primaryTransId = saved[0].id
      const createdEntries: any[] = []
      for (const c of candidates) {
        const entry = await this.prisma.glossaryEntry.create({
          data: {
            translationId: primaryTransId,
            lessonId,
            term: c.term,
            enDef: c.enDef,
            hiDef: c.hiDef,
            mrDef: c.mrDef,
            enEquiv: c.enEquiv,
            hiEquiv: c.hiEquiv,
            mrEquiv: c.mrEquiv,
            approvalStatus: 'DRAFT',
            revision: 1,
          },
        })
        createdEntries.push(entry)
      }
      glossary = createdEntries
    }

    return { translations: saved, glossary }
  }

  async getTranslations(lessonId: string) {
    return this.prisma.lessonTranslation.findMany({ where: { lessonId } })
  }

  async getTranslation(id: string) {
    const t = await this.prisma.lessonTranslation.findUnique({ where: { id } })
    if (!t) throw new NotFoundException('Translation not found')
    return t
  }

  async getPublishedTranslation(
    lessonId: string,
    language: SupportedLanguage,
    user: { id: string; role: string },
  ) {
    if (user.role === 'student') {
      const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId } })
      if (lesson) {
        const enrolled = await this.prisma.enrollment.findFirst({
          where: { studentId: user.id, courseId: lesson.courseId },
        })
        if (!enrolled) {
          throw new ForbiddenException('You are not enrolled in this course')
        }
      }
    }

    const found = await this.prisma.lessonTranslation.findFirst({
      where: { lessonId, language, approvalStatus: 'PUBLISHED' },
    })
    if (found) return found

    // Fallback: check if lesson carries embedded catalog translation
    const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId } })
    const emb = (lesson as any)?.translations?.[language]
    if (emb) {
      try {
        const created = await this.prisma.lessonTranslation.create({
          data: {
            lessonId,
            sourceVersion: 1,
            language,
            translatedTitle: emb.title,
            translatedContent: emb.contentHtml,
            validationStatus: 'PASSED',
            validationReport: { passed: true, errors: [], warnings: [], preservedTokens: [] },
            approvalStatus: 'PUBLISHED',
            revision: 1,
            publishedAt: new Date(),
          },
        })
        return created
      } catch {
        return {
          id: `trans-seed-${lessonId}-${language}`,
          lessonId,
          sourceVersion: 1,
          language,
          translatedTitle: emb.title,
          translatedContent: emb.contentHtml,
          validationStatus: 'PASSED',
          validationReport: { passed: true, errors: [], warnings: [], preservedTokens: [] },
          approvalStatus: 'PUBLISHED',
          revision: 1,
          publishedAt: new Date(),
        }
      }
    }

    return null
  }

  async updateTranslation(
    translationId: string,
    data: { translatedTitle?: string; translatedContent?: string; originalContent?: string },
    actorId: string,
  ) {
    const existing = await this.prisma.lessonTranslation.findUnique({ where: { id: translationId } })
    if (!existing) throw new NotFoundException('Translation not found')

    const nextContent = data.translatedContent ?? existing.translatedContent
    const nextTitle = data.translatedTitle ?? existing.translatedTitle
    const prevRevision = existing.revision || 1
    const nextRevision = prevRevision + 1

    const lesson = await this.prisma.lesson.findUnique({ where: { id: existing.lessonId } })
    const sourceText = data.originalContent || lesson?.contentHtml || ''
    let validationStatus = existing.validationStatus
    let validationReport = existing.validationReport

    if (sourceText) {
      const tokens = this.tokenProtection.extractProtectedTokens(sourceText)
      const val = this.tokenProtection.validateTokens(sourceText, nextContent, tokens)
      validationReport = val
      validationStatus = val.errors.length > 0 ? 'FAILED' : val.warnings.length > 0 ? 'WARNINGS' : 'PASSED'
    }

    const updated = await this.prisma.lessonTranslation.update({
      where: { id: translationId },
      data: {
        translatedTitle: nextTitle,
        translatedContent: nextContent,
        validationStatus,
        validationReport,
        approvalStatus: 'REVIEW',
        revision: nextRevision,
      },
    })

    await this.prisma.translationAudit.create({
      data: {
        translationId,
        actorId,
        action: 'corrected',
        prevRevision,
        newRevision: nextRevision,
        metadata: { validationStatus },
      },
    })

    return updated
  }

  async revalidateTranslation(translationId: string, originalContent: string, actorId: string) {
    const t = await this.prisma.lessonTranslation.findUnique({ where: { id: translationId } })
    if (!t) throw new NotFoundException('Translation not found')

    const lesson = await this.prisma.lesson.findUnique({ where: { id: t.lessonId } })
    const sourceText = originalContent || lesson?.contentHtml || ''
    if (!sourceText) {
      throw new BadRequestException('Source content is required for revalidation')
    }

    const tokens = this.tokenProtection.extractProtectedTokens(sourceText)
    const validation = this.tokenProtection.validateTokens(sourceText, t.translatedContent, tokens)
    const validationStatus =
      validation.errors.length > 0 ? 'FAILED' : validation.warnings.length > 0 ? 'WARNINGS' : 'PASSED'

    const updated = await this.prisma.lessonTranslation.update({
      where: { id: translationId },
      data: {
        validationStatus,
        validationReport: validation,
        approvalStatus: validationStatus === 'PASSED' ? 'VALIDATED' : t.approvalStatus,
      },
    })

    await this.prisma.translationAudit.create({
      data: {
        translationId,
        actorId,
        action: 'validated',
        prevRevision: t.revision,
        newRevision: t.revision,
        metadata: { validationStatus },
      },
    })

    return updated
  }

  async approveTranslation(translationId: string, actorId: string) {
    const t = await this.prisma.lessonTranslation.findUnique({ where: { id: translationId } })
    if (!t) throw new NotFoundException('Translation not found')
    if (t.validationStatus === 'FAILED') {
      throw new BadRequestException('Cannot approve translation while critical validation errors remain')
    }

    const updated = await this.prisma.lessonTranslation.update({
      where: { id: translationId },
      data: { approvalStatus: 'APPROVED', approverId: actorId },
    })

    await this.prisma.translationAudit.create({
      data: {
        translationId,
        actorId,
        action: 'approved',
        prevRevision: t.revision,
        newRevision: t.revision,
      },
    })

    return updated
  }

  async publishTranslation(translationId: string, actorId: string) {
    const t = await this.prisma.lessonTranslation.findUnique({ where: { id: translationId } })
    if (!t) throw new NotFoundException('Translation not found')
    if (t.validationStatus === 'FAILED') {
      throw new BadRequestException('Cannot publish translation with critical validation errors')
    }
    if (t.approvalStatus !== 'APPROVED' && t.approvalStatus !== 'PUBLISHED') {
      throw new BadRequestException('Translation must be approved by a teacher before publishing')
    }

    const updated = await this.prisma.lessonTranslation.update({
      where: { id: translationId },
      data: { approvalStatus: 'PUBLISHED', publishedAt: new Date() },
    })

    await this.prisma.translationAudit.create({
      data: {
        translationId,
        actorId,
        action: 'published',
        prevRevision: t.revision,
        newRevision: t.revision,
      },
    })

    return updated
  }

  async getGlossary(lessonId: string, role?: string) {
    const all = await this.prisma.glossaryEntry.findMany({ where: { lessonId } })
    if (role === 'student') {
      return all.filter((e: any) => e.approvalStatus === 'APPROVED' || e.approvalStatus === 'PUBLISHED')
    }
    return all
  }

  async createGlossaryEntry(
    lessonId: string,
    data: {
      translationId?: string
      term: string
      enDef: string
      hiDef?: string
      mrDef?: string
      enEquiv?: string
      hiEquiv?: string
      mrEquiv?: string
    },
  ) {
    return this.prisma.glossaryEntry.create({
      data: {
        lessonId,
        translationId: data.translationId || '',
        term: data.term,
        enDef: data.enDef,
        hiDef: data.hiDef || null,
        mrDef: data.mrDef || null,
        enEquiv: data.enEquiv || data.term,
        hiEquiv: data.hiEquiv || null,
        mrEquiv: data.mrEquiv || null,
        approvalStatus: 'DRAFT',
        revision: 1,
      },
    })
  }

  async updateGlossaryEntry(entryId: string, data: any) {
    return this.prisma.glossaryEntry.update({
      where: { id: entryId },
      data,
    })
  }

  async generateAudio(translationId: string) {
    return this.audioService.generateAudioForTranslation(translationId)
  }

  async getAudio(translationId: string, language: SupportedLanguage) {
    return this.audioService.getAudioStatus(translationId, language)
  }

  async getHistory(translationId: string) {
    return this.prisma.translationAudit.findMany({ where: { translationId } })
  }

  async getCourseMultilingualPack(
    courseId: string,
    languages: SupportedLanguage[],
    user: { id: string; role: string },
  ) {
    if (user.role === 'student') {
      const enrolled = await this.prisma.enrollment.findFirst({
        where: { studentId: user.id, courseId },
      })
      if (!enrolled) throw new ForbiddenException('Not enrolled in this course')
    }

    const lessons = await this.prisma.lesson.findMany({ where: { courseId } })
    const translations: any[] = []
    const glossary: any[] = []

    for (const lesson of lessons) {
      for (const lang of languages) {
        if (lang === 'en') continue
        const t = await this.prisma.lessonTranslation.findFirst({
          where: { lessonId: lesson.id, language: lang, approvalStatus: 'PUBLISHED' },
        })
        if (t) translations.push(t)
      }
      const entries = await this.getGlossary(lesson.id, user.role)
      glossary.push(...entries)
    }

    return { courseId, languages, translations, glossary }
  }

  async getAdminStats() {
    const all = await this.prisma.lessonTranslation.findMany({})
    const audioAll = await this.prisma.lessonAudio.findMany({})
    return {
      total: all.length,
      published: all.filter((t: any) => t.approvalStatus === 'PUBLISHED').length,
      pendingApproval: all.filter((t: any) => ['GENERATED', 'VALIDATED', 'REVIEW'].includes(t.approvalStatus)).length,
      failed: all.filter((t: any) => t.validationStatus === 'FAILED').length,
      failedAudio: audioAll.filter((a: any) => a.generationStatus === 'FAILED').length,
      languages: ['en', 'hi', 'mr'],
    }
  }
}
