"use client"

import { AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

import {
  PaisanosBanner,
  BANNER_DURATION,
} from "@/components/home/components/paisanos-banner"
import {
  ThunderFlash,
  THUNDER_DURATION,
} from "@/components/home/components/thunder-flash"

export interface EffectTiming {
  audioStartTime: number
  audioDuration: number
  thunderTimes: number[]
  thunderDuration?: number
  bannerTimes: number[]
  bannerDuration?: number
}

interface PaisanosEffectProps {
  trigger: number
  timing?: EffectTiming
}

const DEFAULT_TIMING: EffectTiming = {
  audioStartTime: 26,
  audioDuration: 16500,
  thunderTimes: [3300, 3700, 6900, 7300, 10350, 10750, 13800, 14200],
  bannerTimes: [3700, 7300, 10750, 14200],
}

export function PaisanosEffect({
  trigger,
  timing = DEFAULT_TIMING,
}: PaisanosEffectProps) {
  const [activeThunders, setActiveThunders] = useState<Set<number>>(new Set())
  const [activeBanners, setActiveBanners] = useState<Set<number>>(new Set())
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    if (trigger === 0) return

    // Limpiar si quedo algo de audio o timeouts
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
    timeoutRefs.current = []
    setActiveThunders(new Set())
    setActiveBanners(new Set())

    const audio = new Audio("/assets/paisanos.mp3")
    audio.volume = 0.5
    audioRef.current = audio

    audio.addEventListener("loadedmetadata", () => {
      audio.currentTime = timing.audioStartTime

      // Los efectos visuales, solo cuando el audio esta disponible
      timing.thunderTimes.forEach((thunderTime, index) => {
        const thunderId = trigger * 1000 + index

        const thunderTimeout = setTimeout(() => {
          setActiveThunders((prev) => new Set(prev).add(thunderId))

          // Limpiar trueno
          const removeThunderTimeout = setTimeout(() => {
            setActiveThunders((prev) => {
              const next = new Set(prev)
              next.delete(thunderId)
              return next
            })
          }, timing.thunderDuration ?? THUNDER_DURATION)

          timeoutRefs.current.push(removeThunderTimeout)
        }, thunderTime)

        timeoutRefs.current.push(thunderTimeout)
      })

      timing.bannerTimes.forEach((bannerTime, index) => {
        const bannerId = trigger * 1000 + index

        const bannerTimeout = setTimeout(() => {
          setActiveBanners((prev) => new Set(prev).add(bannerId))

          // Limpiar banner de Paisanos
          const removeBannerTimeout = setTimeout(() => {
            setActiveBanners((prev) => {
              const next = new Set(prev)
              next.delete(bannerId)
              return next
            })
          }, timing.bannerDuration ?? BANNER_DURATION)

          timeoutRefs.current.push(removeBannerTimeout)
        }, bannerTime)

        timeoutRefs.current.push(bannerTimeout)
      })

      audio.play().catch((error) => {
        return error
      })
    })

    const stopAudioTimeout = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }, timing.audioDuration)

    timeoutRefs.current.push(stopAudioTimeout)
    audio.load()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
      timeoutRefs.current = []
      setActiveThunders(new Set())
      setActiveBanners(new Set())
    }
  }, [trigger, timing])

  return (
    <>
      <AnimatePresence>
        {Array.from(activeThunders).map((thunderId) => (
          <ThunderFlash key={thunderId} />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {Array.from(activeBanners).map((bannerId) => (
          <PaisanosBanner key={bannerId} />
        ))}
      </AnimatePresence>
    </>
  )
}
