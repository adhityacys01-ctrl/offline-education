import { Injectable, Logger } from '@nestjs/common'
import { TokenProtectionService } from './token-protection.service'

export type SupportedLanguage = 'en' | 'hi' | 'mr'

export interface TranslationResult {
  language: SupportedLanguage
  translatedTitle: string
  translatedContent: string
  validationStatus: 'PASSED' | 'FAILED' | 'WARNINGS'
  validationReport: any
}

export interface GeneratedGlossaryCandidate {
  term: string
  enDef: string
  hiDef: string
  mrDef: string
  enEquiv: string
  hiEquiv: string
  mrEquiv: string
}

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name)
  private readonly MYMEMORY_BASE = 'https://api.mymemory.translated.net/get'

  constructor(private readonly tokenProtection: TokenProtectionService) {}

  private langCode(lang: SupportedLanguage): string {
    return lang === 'mr' ? 'mr' : lang === 'hi' ? 'hi' : 'en'
  }

  async translateText(
    text: string,
    targetLang: SupportedLanguage,
    extraTerms: string[] = [],
  ): Promise<{ translated: string; validationReport: any; status: 'PASSED' | 'FAILED' | 'WARNINGS' }> {
    if (targetLang === 'en') {
      const tokens = this.tokenProtection.extractProtectedTokens(text, extraTerms)
      const validation = this.tokenProtection.validateTokens(text, text, tokens)
      return { translated: text, validationReport: validation, status: 'PASSED' }
    }

    const tokens = this.tokenProtection.extractProtectedTokens(text, extraTerms)
    const { maskedText } = this.tokenProtection.replaceWithPlaceholders(text, tokens)

    const chunks = this.splitIntoChunks(maskedText, 420)
    const translatedChunks: string[] = []
    let hadApiFailure = false
    const apiErrors: string[] = []

    for (const chunk of chunks) {
      try {
        const translated = await this.translateChunk(chunk, targetLang)
        translatedChunks.push(translated)
        await this.sleep(350)
      } catch (err: any) {
        hadApiFailure = true
        const msg = err?.message || String(err)
        apiErrors.push(msg)
        this.logger.warn(`Translation chunk failed (${targetLang}): ${msg}`)
        translatedChunks.push(chunk)
      }
    }

    const translatedMasked = translatedChunks.join(' ')
    const restored = this.tokenProtection.restoreFromPlaceholders(translatedMasked, tokens)

    const validation = this.tokenProtection.validateTokens(text, restored, tokens)
    if (hadApiFailure) {
      validation.warnings.push(`Translation provider warning: ${apiErrors[0]}`)
    }

    const status =
      validation.errors.length > 0
        ? 'FAILED'
        : validation.warnings.length > 0
          ? 'WARNINGS'
          : 'PASSED'

    return { translated: restored, validationReport: validation, status }
  }

  async generateTranslations(
    sourceTitle: string,
    sourceContent: string,
    targetLanguages: SupportedLanguage[],
    extraTerms: string[] = [],
  ): Promise<TranslationResult[]> {
    const results: TranslationResult[] = []

    for (const lang of targetLanguages) {
      if (lang === 'en') {
        const tokens = this.tokenProtection.extractProtectedTokens(sourceContent, extraTerms)
        const validationReport = this.tokenProtection.validateTokens(sourceContent, sourceContent, tokens)
        results.push({
          language: 'en',
          translatedTitle: sourceTitle,
          translatedContent: sourceContent,
          validationStatus: 'PASSED',
          validationReport,
        })
        continue
      }

      try {
        const titleResult = await this.translateText(sourceTitle, lang, extraTerms)
        const contentResult = await this.translateText(sourceContent, lang, extraTerms)
        results.push({
          language: lang,
          translatedTitle: titleResult.translated,
          translatedContent: contentResult.translated,
          validationStatus: contentResult.status,
          validationReport: contentResult.validationReport,
        })
      } catch (err: any) {
        this.logger.error(`Failed to translate to ${lang}: ${err}`)
        results.push({
          language: lang,
          translatedTitle: sourceTitle,
          translatedContent: sourceContent,
          validationStatus: 'FAILED',
          validationReport: {
            passed: false,
            errors: [`Translation failed: ${err?.message || err}`],
            warnings: [],
            preservedTokens: [],
          },
        })
      }
    }

    return results
  }

  async generateGlossaryCandidates(
    sourceContent: string,
    extraTerms: string[] = [],
    targetLanguages: SupportedLanguage[] = ['hi', 'mr'],
  ): Promise<GeneratedGlossaryCandidate[]> {
    const parsed = this.tokenProtection.parsePassageStructure(sourceContent, extraTerms)
    const plainSentences = sourceContent
      .replace(/<[^>]+>/g, '. ')
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 10)

    const terms = parsed.candidateGlossaryTerms.slice(0, 5)
    const entries: GeneratedGlossaryCandidate[] = []

    for (const term of terms) {
      const contextSentence =
        plainSentences.find((s) => s.toLowerCase().includes(term.toLowerCase())) ||
        `Technical term "${term}" used in this lesson.`
      const enDef = contextSentence.length > 160 ? contextSentence.slice(0, 157) + '...' : contextSentence

      let hiDef = ''
      let mrDef = ''
      let hiEquiv = term
      let mrEquiv = term

      if (targetLanguages.includes('hi')) {
        try {
          const defRes = await this.translateText(enDef, 'hi', [term])
          hiDef = defRes.translated
          const eqRes = await this.translateText(term, 'hi', [])
          hiEquiv = `${term} (${eqRes.translated})`
        } catch {}
      }
      if (targetLanguages.includes('mr')) {
        try {
          const defRes = await this.translateText(enDef, 'mr', [term])
          mrDef = defRes.translated
          const eqRes = await this.translateText(term, 'mr', [])
          mrEquiv = `${term} (${eqRes.translated})`
        } catch {}
      }

      entries.push({
        term,
        enDef,
        hiDef,
        mrDef,
        enEquiv: term,
        hiEquiv,
        mrEquiv,
      })
    }

    return entries
  }

  private async translateChunk(text: string, targetLang: SupportedLanguage): Promise<string> {
    const googleKey = process.env.GOOGLE_TRANSLATE_KEY
    if (googleKey) {
      return this.callGoogleTranslate(text, this.langCode(targetLang), googleKey)
    }
    return this.callMyMemory(text, `en|${this.langCode(targetLang)}`)
  }

  private async callGoogleTranslate(text: string, target: string, apiKey: string): Promise<string> {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source: 'en', target, format: 'text' }),
    })
    if (!res.ok) throw new Error(`Google Translate API error: ${res.status}`)
    const data = (await res.json()) as any
    const translated = data?.data?.translations?.[0]?.translatedText
    if (!translated) throw new Error('Google Translate returned empty response')
    return translated
  }

  private async callMyMemory(text: string, langpair: string): Promise<string> {
    const email = process.env.MYMEMORY_API_EMAIL || ''
    const url = `${this.MYMEMORY_BASE}?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langpair)}${email ? `&de=${encodeURIComponent(email)}` : ''}`

    const res = await fetch(url)
    if (!res.ok) throw new Error(`MyMemory API HTTP ${res.status}`)
    const data = (await res.json()) as any

    if (data.responseStatus !== 200) {
      throw new Error(`MyMemory translation failed: ${data.responseDetails || data.responseStatus}`)
    }

    return data.responseData?.translatedText || text
  }

  private splitIntoChunks(text: string, maxLen: number): string[] {
    if (text.length <= maxLen) return [text]
    const chunks: string[] = []
    const sentences = text.split(/(?<=[.!?।])\s+/)
    let current = ''
    for (const s of sentences) {
      if (s.length > maxLen) {
        if (current) {
          chunks.push(current.trim())
          current = ''
        }
        const words = s.split(/\s+/)
        for (const w of words) {
          if ((current + ' ' + w).length > maxLen) {
            if (current) chunks.push(current.trim())
            current = w
          } else {
            current = current ? current + ' ' + w : w
          }
        }
      } else if ((current + ' ' + s).length > maxLen) {
        if (current) chunks.push(current.trim())
        current = s
      } else {
        current = current ? current + ' ' + s : s
      }
    }
    if (current) chunks.push(current.trim())
    return chunks
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms))
  }
}
