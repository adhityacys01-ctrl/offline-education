import { Injectable, Logger } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { PrismaService } from '../prisma/prisma.service'
import { SupportedLanguage } from './translation.service'

@Injectable()
export class AudioService {
  private readonly logger = new Logger(AudioService.name)

  constructor(private readonly prisma: PrismaService) {}

  getTtsLangCode(language: SupportedLanguage): string {
    return language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN'
  }

  async generateAudioForTranslation(translationId: string) {
    const translation = await this.prisma.lessonTranslation.findUnique({ where: { id: translationId } })
    if (!translation) return null

    const plainText = (translation.translatedContent || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    const googleTtsKey = process.env.GOOGLE_TTS_KEY
    const lang = (translation.language || 'en') as SupportedLanguage
    const ttsLangCode = this.getTtsLangCode(lang)

    if (googleTtsKey) {
      try {
        const res = await fetch(
          `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(googleTtsKey)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: { text: plainText.slice(0, 4500) },
              voice: { languageCode: ttsLangCode, ssmlGender: 'NEUTRAL' },
              audioConfig: { audioEncoding: 'MP3' },
            }),
          },
        )
        if (!res.ok) throw new Error(`Google TTS HTTP ${res.status}`)
        const data = (await res.json()) as any
        if (!data.audioContent) throw new Error('Empty audioContent from Google TTS')

        const uploadRoot = process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'uploads')
        const audioDir = path.join(uploadRoot, 'audio')
        fs.mkdirSync(audioDir, { recursive: true })
        const fileName = `${translation.id}-rev${translation.revision}.mp3`
        const filePath = path.join(audioDir, fileName)
        const buf = Buffer.from(data.audioContent, 'base64')
        fs.writeFileSync(filePath, buf)

        const wordCount = plainText.split(/\s+/).filter(Boolean).length
        const durationSeconds = Math.max(2, Math.round((wordCount / 130) * 60))

        const record = await this.prisma.lessonAudio.create({
          data: {
            translationId: translation.id,
            language: lang,
            revision: translation.revision,
            fileRef: `/api/v1/multilingual/audio/file/${fileName}`,
            durationSeconds,
            sizeBytes: buf.length,
            generationStatus: 'READY',
          },
        })
        return { ...record, mode: 'google_tts', ttsLangCode }
      } catch (err: any) {
        this.logger.warn(`Google Cloud TTS failed, falling back to browser SpeechSynthesis: ${err?.message || err}`)
      }
    }

    // Fallback when GOOGLE_TTS_KEY is absent: record client-side Web Speech Synthesis descriptor (no fake audio bytes)
    const wordCount = plainText.split(/\s+/).filter(Boolean).length
    const durationSeconds = Math.max(2, Math.round((wordCount / 130) * 60))

    const existing = await this.prisma.lessonAudio.findFirst({
      where: { translationId: translation.id, language: lang },
    })

    if (existing && existing.revision === translation.revision) {
      return { ...existing, mode: 'browser_speech_synthesis', ttsLangCode }
    }

    const record = await this.prisma.lessonAudio.create({
      data: {
        translationId: translation.id,
        language: lang,
        revision: translation.revision,
        fileRef: null,
        durationSeconds,
        sizeBytes: 0,
        generationStatus: 'READY',
      },
    })
    return { ...record, mode: 'browser_speech_synthesis', ttsLangCode }
  }

  async getAudioStatus(translationId: string, language: SupportedLanguage) {
    const rec = await this.prisma.lessonAudio.findFirst({
      where: { translationId, language },
    })
    const ttsLangCode = this.getTtsLangCode(language)
    if (!rec) {
      return {
        translationId,
        language,
        generationStatus: 'READY',
        mode: 'browser_speech_synthesis',
        ttsLangCode,
        fileRef: null,
      }
    }
    return {
      ...rec,
      mode: rec.fileRef ? 'google_tts' : 'browser_speech_synthesis',
      ttsLangCode,
    }
  }
}
