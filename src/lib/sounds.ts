let audioContext: AudioContext | null = null
let audioContextInitialized = false

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null

  if (!audioContext) {
    try {
      audioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )()
    } catch (error) {
      throw new Error("AudioContext not available", { cause: error })
    }
  }

  if (audioContext.state === "suspended" && !audioContextInitialized) {
    audioContext.resume().catch(() => {})
    audioContextInitialized = true
  }

  return audioContext
}

interface SoundOptions {
  frequency?: number
  duration?: number
  volume?: number
  type?: OscillatorType
  fadeOut?: boolean
}

const playTone = (options: SoundOptions = {}) => {
  const {
    frequency = 440,
    duration = 100,
    volume = 0.1,
    type = "sine",
    fadeOut = true,
  } = options

  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = frequency
    oscillator.type = type

    const now = ctx.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.01)

    if (fadeOut) {
      gainNode.gain.linearRampToValueAtTime(
        volume,
        now + duration / 1000 - 0.05
      )
      gainNode.gain.linearRampToValueAtTime(0, now + duration / 1000)
    } else {
      gainNode.gain.linearRampToValueAtTime(0, now + duration / 1000)
    }

    oscillator.start(now)
    oscillator.stop(now + duration / 1000)
  } catch (error) {
    throw new Error("Failed to play tone", { cause: error })
  }
}

const soundDefinitions = {
  click: () => {
    playTone({
      frequency: 800,
      duration: 50,
      volume: 0.15,
      type: "sine",
    })
  },

  bell: () => {
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const frequencies = [523.25, 659.25, 783.99]

      frequencies.forEach((freq, index) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.frequency.value = freq
        oscillator.type = "sine"

        gainNode.gain.setValueAtTime(0, now + index * 0.05)
        gainNode.gain.linearRampToValueAtTime(0.15, now + index * 0.05 + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          now + index * 0.05 + 0.8
        )
        gainNode.gain.linearRampToValueAtTime(0, now + index * 0.05 + 1.0)

        oscillator.start(now + index * 0.05)
        oscillator.stop(now + index * 0.05 + 1.0)
      })
    } catch (error) {
      return error
    }
  },

  success: () => {
    const notes = [523.25, 659.25, 783.99]
    notes.forEach((freq, index) => {
      setTimeout(() => {
        playTone({
          frequency: freq,
          duration: 150,
          volume: 0.12,
          type: "sine",
        })
      }, index * 100)
    })
  },

  error: () => {
    playTone({
      frequency: 300,
      duration: 200,
      volume: 0.12,
      type: "sawtooth",
    })
  },

  hover: () => {
    playTone({
      frequency: 600,
      duration: 30,
      volume: 0.08,
      type: "sine",
    })
  },

  focus: () => {
    playTone({
      frequency: 500,
      duration: 80,
      volume: 0.1,
      type: "sine",
    })
  },

  toggle: () => {
    playTone({
      frequency: 400,
      duration: 60,
      volume: 0.1,
      type: "square",
    })
  },

  navigate: () => {
    playTone({
      frequency: 600,
      duration: 70,
      volume: 0.12,
      type: "sine",
    })
  },

  filter: () => {
    playTone({
      frequency: 550,
      duration: 60,
      volume: 0.1,
      type: "sine",
    })
  },

  transaction: () => {
    playTone({
      frequency: 700,
      duration: 50,
      volume: 0.1,
      type: "sine",
    })
  },

  currencySwitch: () => {
    playTone({
      frequency: 600,
      duration: 100,
      volume: 0.1,
      type: "sine",
    })
  },

  easterEgg: (
    triggerThunder?: () => void,
    exitEasterEgg?: () => void,
    triggerBanner?: () => void
  ) => {
    try {
      const audio = new Audio("/assets/paisanos.mp3")
      audio.volume = 0.5

      const thunderTimes = [3300, 3700, 6900, 7300, 10350, 10750, 13800, 14200]
      const bannerTimes = [3700, 7300, 10800, 14300]
      const lastThunderTime = Math.max(...thunderTimes)

      thunderTimes.forEach((time) => {
        setTimeout(() => {
          if (triggerThunder) {
            triggerThunder()
          }
        }, time)
      })

      bannerTimes.forEach((time) => {
        setTimeout(() => {
          if (triggerBanner) {
            triggerBanner()
          }
        }, time)
      })

      // El audio apra en el ultimo trueno
      const stopAudio = () => {
        setTimeout(() => {
          audio.pause()
          audio.currentTime = 0

          if (exitEasterEgg) {
            setTimeout(() => {
              exitEasterEgg()
            }, 500)
          }
        }, lastThunderTime + 2000)
      }

      audio.addEventListener("loadedmetadata", () => {
        audio.currentTime = 26
        audio
          .play()
          .then(() => {
            stopAudio()
          })
          .catch((error) => {
            return error
          })
      })

      audio.load()
    } catch (error) {
      return error
    }
  },
}

let soundsEnabled = true

export const setSoundsEnabled = (enabled: boolean) => {
  soundsEnabled = enabled
}

export const getSoundsEnabled = () => soundsEnabled

const createWrappedSounds = () => {
  const wrapped: typeof soundDefinitions = {} as typeof soundDefinitions

  ;(
    Object.keys(soundDefinitions) as Array<keyof typeof soundDefinitions>
  ).forEach((key) => {
    if (key === "easterEgg") {
      wrapped[key] = (
        triggerThunder?: () => void,
        exitEasterEgg?: () => void,
        triggerBanner?: () => void
      ) => {
        if (soundsEnabled) {
          soundDefinitions[key](triggerThunder, exitEasterEgg, triggerBanner)
        }
      }
    } else {
      wrapped[key] = () => {
        if (soundsEnabled) {
          soundDefinitions[key]()
        }
      }
    }
  })

  return wrapped
}

export const sounds = createWrappedSounds()
