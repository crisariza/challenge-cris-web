"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

import { useCountUp } from "@/components/home/hooks/use-count-up"
import type { CardData } from "@/components/home/types"

export function useTypewriter(text: string, speed: number = 100) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  return displayedText
}

interface BalanceCardProps {
  card: CardData
  currency: "USD" | "ARS"
  exchangeRate: number
  index: number
  isMainCard: boolean
}

export function BalanceCard({
  card,
  currency,
  exchangeRate,
  index,
  isMainCard,
}: BalanceCardProps) {
  const cardBalanceUSD = card.balanceUSD
  const cardBalanceValue =
    currency === "USD" ? cardBalanceUSD : cardBalanceUSD * exchangeRate
  const animatedBalance = useCountUp(cardBalanceValue, 1.5, 2)
  const displayedCardNumber = useTypewriter(card.cardNumber, 150)

  const getCardBackgroundColor = () => {
    if (card.cardName === "Paisabank Mastercard Gold") {
      return "bg-paisabank-gold"
    }
    if (card.cardName === "Paisabank Visa Platinum") {
      return "bg-paisabank-platinum"
    }

    return "bg-paisabank-default"
  }

  const getTextColor = () => {
    if (card.cardName === "Paisabank Mastercard Gold") {
      return "text-black"
    }
    if (card.cardName === "Paisabank Visa Platinum") {
      return "text-black"
    }
    return "text-white"
  }

  const cardBgClass = getCardBackgroundColor()
  const textColorClass = getTextColor()

  return (
    <motion.div
      data-card-index={index}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        height: isMainCard ? "190px" : "170px",
      }}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.1,
        ease: "easeOut",
        height: { duration: 0.3, ease: "easeInOut" },
      }}
      className={`relative rounded-3xl shadow-md overflow-hidden shrink-0 w-[90%] snap-start ${cardBgClass} px-6 py-4`}
      style={{
        ...(!isMainCard ? { minHeight: "170px" } : {}),
      }}
    >
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent rounded-3xl"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className={`relative z-10 ${!isMainCard ? "flex items-center justify-between" : ""}`}
      >
        {isMainCard && (
          <>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p
                  className={`text-sm mb-2 font-heading ${
                    textColorClass === "text-black"
                      ? "text-black/80"
                      : "text-white/80"
                  }`}
                >
                  Balance
                </p>
                <div className="flex items-center gap-2">
                  <motion.div
                    key={currency}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-lg px-2 py-1 ${
                      textColorClass === "text-black"
                        ? "bg-black/10"
                        : "bg-linear-to-tl from-white/50 to-white/30"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium font-heading ${
                        textColorClass === "text-black"
                          ? "text-black"
                          : textColorClass
                      }`}
                    >
                      {currency}
                    </span>
                  </motion.div>
                  <motion.span
                    key={`${currency}-${animatedBalance}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`text-2xl font-medium font-heading ${
                      textColorClass === "text-black"
                        ? "text-black"
                        : textColorClass
                    }`}
                  >
                    {currency === "USD"
                      ? new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(parseFloat(animatedBalance))
                      : new Intl.NumberFormat("es-AR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(parseFloat(animatedBalance))}
                  </motion.span>
                </div>
              </div>
              <div className="w-8 h-6 flex items-center justify-center overflow-hidden">
                <Image
                  src={
                    card.issuer === "Visa"
                      ? "/assets/visa-logo.svg"
                      : "/assets/mastercard-logo.svg"
                  }
                  alt={card.issuer === "Visa" ? "Visa" : "Mastercard"}
                  width={32}
                  height={24}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-sm font-mono font-bold tracking-[0.25em] ${
                    textColorClass === "text-black"
                      ? "text-black"
                      : textColorClass
                  }`}
                >
                  ****
                </span>
                <span
                  className={`text-sm font-mono font-bold tracking-[0.25em] ${
                    textColorClass === "text-black"
                      ? "text-black"
                      : textColorClass
                  }`}
                >
                  ****
                </span>
                <span
                  className={`text-sm font-mono font-bold tracking-[0.25em] ${
                    textColorClass === "text-black"
                      ? "text-black"
                      : textColorClass
                  }`}
                >
                  ****
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className={`text-xl tracking-wide ${
                    textColorClass === "text-black"
                      ? "text-black"
                      : "text-gray-100"
                  }`}
                >
                  {displayedCardNumber}
                  {displayedCardNumber.length < card.cardNumber.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block"
                    >
                      |
                    </motion.span>
                  )}
                </motion.span>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-md font-heading ${
                    textColorClass === "text-black"
                      ? "text-black"
                      : textColorClass
                  }`}
                >
                  {card.cardName}
                </span>
                <div className="text-right">
                  <p
                    className={`text-xs font-heading ${
                      textColorClass === "text-black"
                        ? "text-black/70"
                        : "text-gray-200"
                    }`}
                  >
                    Vencimiento
                  </p>
                  <p
                    className={`text-sm font-medium font-heading ${
                      textColorClass === "text-black"
                        ? "text-black"
                        : textColorClass
                    }`}
                  >
                    {card.expDate}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
