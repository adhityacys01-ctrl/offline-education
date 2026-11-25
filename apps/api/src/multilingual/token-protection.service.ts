import { Injectable } from '@nestjs/common'

export interface ProtectedToken {
  placeholder: string
  original: string
  type: string
  count: number
}

export interface MaskedResult {
  maskedText: string
  tokenMap: ProtectedToken[]
}

export interface ValidationResult {
  passed: boolean
  warnings: string[]
  errors: string[]
  preservedTokens: { original: string; found: boolean; count: number; expected: number }[]
}

export interface ParsedPassageStructure {
  headings: string[]
  paragraphs: string[]
  protectedTokens: ProtectedToken[]
  candidateGlossaryTerms: string[]
}

@Injectable()
export class TokenProtectionService {
  private readonly PATTERNS: { type: string; regex: RegExp }[] = [
    // HTML tags so structure isn't corrupted during translation
    { type: 'HTML_TAG', regex: /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s+[^>]*)?>/g },
    // Code blocks (backtick)
    { type: 'CODE', regex: /`[^`]+`/g },
    // Equations like F = m × a, V = I × R, E = mc²
    { type: 'EQUATION', regex: /\b[A-Za-z][A-Za-z₀-₉0-9]*\s*=\s*[A-Za-z0-9\s×*+\-/\^().²³₀-₉Ω°]+/g },
    // Numbers with units: 9.8 m/s², 220 V, 10 Ω, 25.5°C, 5 kg, 98%
    {
      type: 'NUMBER_UNIT',
      regex:
        /\d+(?:\.\d+)?\s*(?:m\/s[²2]?|km\/h|kg|mg|Pa|kW|MW|mA|kΩ|kHz|MHz|°C|°F|mol|mL|dB|rad\/s|rpm|nm|μm|mm|cm|ms|μs|ns|pF|nF|μF|Hz|Ω|V|A|W|J|N|K|L|g|m|s|%)/g,
    },
    // Chemical formulas like 6CO₂, 6H₂O, C₆H₁₂O₆, H₂O, CO₂, NaCl, H₂SO₄
    { type: 'CHEMICAL', regex: /\d*(?:[A-Z][a-z]?[₀-₉0-9]*){2,}/g },
    // ALL CAPS acronyms 2-6 chars: CPU, RAM, API, ATP, DNA, NADPH, USB
    { type: 'ACRONYM', regex: /\b[A-Z]{2,6}\b/g },
    // Standalone decimals / percentages / numbers
    { type: 'NUMBER', regex: /\b\d+(?:\.\d+)?%?\b/g },
  ]

  extractProtectedTokens(text: string, extraTerms: string[] = []): ProtectedToken[] {
    const tokens: ProtectedToken[] = []
    const seen = new Map<string, ProtectedToken>()

    // Track covered character spans so smaller sub-patterns don't double-match inside larger tokens
    const covered: [number, number][] = []
    const isCovered = (start: number, end: number) =>
      covered.some(([s, e]) => start >= s && end <= e)

    for (const { type, regex } of this.PATTERNS) {
      const re = new RegExp(regex.source, regex.flags)
      let m: RegExpExecArray | null
      while ((m = re.exec(text)) !== null) {
        const start = m.index
        const end = start + m[0].length
        if (isCovered(start, end)) continue
        const original = m[0].trim()
        if (original.length < 1) continue

        covered.push([start, end])
        if (!seen.has(original)) {
          const ph = `[[TK_${tokens.length}]]`
          const tok: ProtectedToken = { placeholder: ph, original, type, count: 0 }
          tokens.push(tok)
          seen.set(original, tok)
        }
        seen.get(original)!.count++
      }
    }

    // Teacher-specified protected English terms
    for (const rawTerm of extraTerms) {
      const term = rawTerm.trim()
      if (!term) continue
      if (!seen.has(term)) {
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const matches = text.match(new RegExp(`\\b${escaped}\\b`, 'g')) || text.match(new RegExp(escaped, 'g')) || []
        if (matches.length > 0) {
          const ph = `[[TK_${tokens.length}]]`
          const tok: ProtectedToken = { placeholder: ph, original: term, type: 'TEACHER_TERM', count: matches.length }
          tokens.push(tok)
          seen.set(term, tok)
        }
      }
    }

    return tokens.filter((t) => t.count > 0)
  }

  replaceWithPlaceholders(text: string, tokens: ProtectedToken[]): MaskedResult {
    let maskedText = text
    const sorted = [...tokens].sort((a, b) => b.original.length - a.original.length)
    for (const tok of sorted) {
      const escaped = tok.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      maskedText = maskedText.replace(new RegExp(escaped, 'g'), tok.placeholder)
    }
    return { maskedText, tokenMap: tokens }
  }

  restoreFromPlaceholders(translatedText: string, tokenMap: ProtectedToken[]): string {
    let restored = translatedText
    for (const tok of tokenMap) {
      const idx = tok.placeholder.replace('[[TK_', '').replace(']]', '')
      const flexibleRegex = new RegExp(`\\[\\s*\\[\\s*TK_${idx}\\s*\\]\\s*\\]`, 'g')
      restored = restored.replace(flexibleRegex, tok.original)
    }
    return restored
  }

  validateTokens(_originalText: string, restoredText: string, tokenMap: ProtectedToken[]): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    const preservedTokens: ValidationResult['preservedTokens'] = []

    for (const tok of tokenMap) {
      if (tok.type === 'HTML_TAG') continue
      const escaped = tok.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const foundCount = (restoredText.match(new RegExp(escaped, 'g')) || []).length
      const found = foundCount > 0

      preservedTokens.push({
        original: tok.original,
        found,
        count: foundCount,
        expected: tok.count,
      })

      if (!found) {
        errors.push(`Protected token missing in translation: "${tok.original}"`)
      } else if (foundCount !== tok.count) {
        warnings.push(`Token occurrence mismatch for "${tok.original}": expected ${tok.count}, found ${foundCount}`)
      }
    }

    const leftover = restoredText.match(/\[\[\s*TK_\d+\s*\]\]/g)
    if (leftover) {
      errors.push(`Unrestored placeholders detected: ${leftover.join(', ')}`)
    }

    return {
      passed: errors.length === 0,
      warnings,
      errors,
      preservedTokens,
    }
  }

  parsePassageStructure(rawText: string, extraTerms: string[] = []): ParsedPassageStructure {
    const headings: string[] = []
    const headingRegex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi
    let hm: RegExpExecArray | null
    while ((hm = headingRegex.exec(rawText)) !== null) {
      headings.push(hm[1].replace(/<[^>]+>/g, '').trim())
    }

    const plainText = rawText.replace(/<[^>]+>/g, '\n')
    const paragraphs = plainText
      .split(/\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0)

    const protectedTokens = this.extractProtectedTokens(rawText, extraTerms)

    const candidates = new Set<string>(extraTerms.map((t) => t.trim()).filter(Boolean))
    for (const tok of protectedTokens) {
      if (tok.type === 'ACRONYM' || tok.type === 'TEACHER_TERM' || tok.type === 'CHEMICAL') {
        candidates.add(tok.original)
      }
    }
    const techWords = plainText.match(/\b[A-Z][a-z]{4,}(?:\s+[A-Z][a-z]{3,})?\b/g) || []
    for (const w of techWords.slice(0, 12)) {
      candidates.add(w)
    }

    return {
      headings,
      paragraphs,
      protectedTokens,
      candidateGlossaryTerms: Array.from(candidates).slice(0, 10),
    }
  }
}
