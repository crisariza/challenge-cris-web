import { useState, useEffect } from "react"

import { sounds } from "@/lib/sounds"

interface UseEasterEggReturn {
  usdTrigger: number
  arsTrigger: number
  paisanosTrigger: number
}

export function useEasterEgg(
  currency: "USD" | "ARS",
  setCurrency: (currency: "USD" | "ARS") => void
): UseEasterEggReturn {
  const [typedSequence, setTypedSequence] = useState("")
  const [usdTrigger, setUsdTrigger] = useState(0)
  const [arsTrigger, setArsTrigger] = useState(0)
  const [paisanosTrigger, setPaisanosTrigger] = useState(0)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.length === 1 && /[a-z]/.test(e.key)) {
        const newSequence = (typedSequence + e.key.toLowerCase()).slice(-8)
        setTypedSequence(newSequence)

        // ARS solo si estas en USD
        if (newSequence.slice(-3) === "ars" && currency === "USD") {
          setCurrency("ARS")
          setTypedSequence("")
          sounds.currencySwitch()
          setArsTrigger((prev) => prev + 1)
        }
        // USD solo si estas en ARS
        else if (newSequence.slice(-3) === "usd" && currency === "ARS") {
          setCurrency("USD")
          setTypedSequence("")
          sounds.currencySwitch()
          setUsdTrigger((prev) => prev + 1)
        }
        // Paisanos con banner y trueno
        else if (newSequence.slice(-8) === "paisanos") {
          setTypedSequence("")
          setPaisanosTrigger((prev) => prev + 1)
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [typedSequence, currency, setCurrency])

  return {
    usdTrigger,
    arsTrigger,
    paisanosTrigger,
  }
}
