import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Square, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AudioPlayerProps {
  text: string
  language: 'en' | 'hi' | 'mr'
  audioUrl?: string | null
  audioBlob?: Blob | null
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5]

export function AudioPlayer({ text, language, audioUrl, audioBlob }: AudioPlayerProps) {
  const [playing, setPlaying]   = useState(false)
  const [paused, setPaused]     = useState(false)
  const [rate, setRate]         = useState(1)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  const langLabel = language === 'hi' ? 'हिन्दी' : language === 'mr' ? 'मराठी' : 'English'
  const ttsLang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN'

  useEffect(() => {
    stop()
    return () => {
      window.speechSynthesis?.cancel()
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
      }
    }
  }, [text, language])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate
    }
  }, [rate])

  const stop = () => {
    window.speechSynthesis?.cancel()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setPlaying(false)
    setPaused(false)
    setProgress(0)
  }

  const playOrResume = () => {
    const srcUrl = audioBlob
      ? (objectUrlRef.current || (objectUrlRef.current = URL.createObjectURL(audioBlob)))
      : audioUrl

    if (srcUrl) {
      if (!audioRef.current) {
        const audio = new Audio(srcUrl)
        audio.playbackRate = rate
        audio.ontimeupdate = () => {
          if (audio.duration) setProgress(Math.round((audio.currentTime / audio.duration) * 100))
        }
        audio.onended = () => {
          setPlaying(false)
          setPaused(false)
          setProgress(100)
        }
        audioRef.current = audio
      }
      audioRef.current.play().catch(() => startSpeechSynthesis())
      setPlaying(true)
      setPaused(false)
      return
    }

    startSpeechSynthesis()
  }

  const startSpeechSynthesis = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    if (paused) {
      window.speechSynthesis.resume()
      setPlaying(true)
      setPaused(false)
      return
    }
    window.speechSynthesis.cancel()
    const cleanText = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (!cleanText) return

    const utt = new SpeechSynthesisUtterance(cleanText)
    utt.lang = ttsLang
    utt.rate = rate
    const totalLen = Math.max(cleanText.length, 1)
    utt.onboundary = (e) => {
      setProgress(Math.min(99, Math.round((e.charIndex / totalLen) * 100)))
    }
    utt.onend = () => {
      setPlaying(false)
      setPaused(false)
      setProgress(100)
    }
    utt.onerror = () => {
      setPlaying(false)
      setPaused(false)
    }
    window.speechSynthesis.speak(utt)
    setPlaying(true)
    setPaused(false)
    setProgress(5)
  }

  const pause = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
    } else if (window.speechSynthesis) {
      window.speechSynthesis.pause()
    }
    setPlaying(false)
    setPaused(true)
  }

  const handleSpeedChange = (newRate: number) => {
    setRate(newRate)
    if (playing && !audioRef.current) {
      // Restart Web Speech with updated speed from current text
      window.speechSynthesis?.cancel()
      setPaused(false)
      setTimeout(() => startSpeechSynthesis(), 50)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#D7E5F0] p-3 flex flex-wrap items-center gap-3 shadow-xs">
      <div className="flex items-center gap-2">
        <button
          onClick={playing ? pause : playOrResume}
          className="w-8 h-8 rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] text-white flex items-center justify-center transition-colors"
          title={playing ? 'Pause audio' : 'Play audio'}
        >
          {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>
        {(playing || paused) && (
          <button
            onClick={stop}
            className="w-8 h-8 rounded-xl bg-[#F0F5FA] hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            title="Stop audio"
          >
            <Square size={12} />
          </button>
        )}
      </div>

      <div className="flex-1 min-w-[140px]">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 mb-1">
          <span className="flex items-center gap-1">
            <Volume2 size={12} className="text-[#1B7FC9]" />
            Audio · {langLabel}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#E1EEF8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1B7FC9] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 bg-[#F0F5FA] p-0.5 rounded-xl border border-[#D7E5F0]">
        {SPEED_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleSpeedChange(s)}
            className={cn(
              'px-2 py-1 text-[10px] font-semibold rounded-lg transition-colors',
              rate === s
                ? 'bg-white text-[#1B7FC9] shadow-xs'
                : 'text-slate-500 hover:text-slate-800',
            )}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  )
}
