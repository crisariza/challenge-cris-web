"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

import BottomNavigation from "@/components/bottom-navigation"
import { BalanceCard } from "@/components/home/components/balance-card"
import { CardSkeleton } from "@/components/home/components/card-skeleton"
import { Confetti } from "@/components/home/components/confetti"
import { Header } from "@/components/home/components/header"
import { PaisanosEffect } from "@/components/home/components/paisanos-effect"
import { useCardCarousel } from "@/components/home/hooks/use-card-carousel"
import { useEasterEgg } from "@/components/home/hooks/use-easter-egg"
import type { CardData } from "@/components/home/types"
import {
  mapApiTransactionToComponent,
  mapApiCardToCardData,
} from "@/components/home/utils"
import { type Transaction as TransactionType } from "@/components/transaction"
import TransactionsList from "@/components/transactions-list"
import { apiClient } from "@/lib/api/client"
import { useAuth } from "@/lib/hooks/use-auth"
import { Loading } from "@/components/ui/loading"

export default function HomePage() {
  const { isLoading: isAuthLoading, isAuthenticated } = useAuth()

  const [currency, setCurrency] = useState<"USD" | "ARS">("USD")
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const [isLoadingMovements, setIsLoadingMovements] = useState(true)
  const [movementsError, setMovementsError] = useState<string | null>(null)

  const EXCHANGE_RATE = 1400

  const [cards, setCards] = useState<CardData[]>([])
  const [isLoadingCards, setIsLoadingCards] = useState(true)
  const [cardsError, setCardsError] = useState<string | null>(null)

  const {
    scrollContainerRef,
    isDragging,
    mainCardIndex,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useCardCarousel(cards)

  const { usdTrigger, arsTrigger, paisanosTrigger } = useEasterEgg(
    currency,
    setCurrency
  )

  const [showUsdConfetti, setShowUsdConfetti] = useState(false)
  const [showArsConfetti, setShowArsConfetti] = useState(false)

  useEffect(() => {
    if (usdTrigger > 0) {
      setShowUsdConfetti(true)
      const timer = setTimeout(() => {
        setShowUsdConfetti(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [usdTrigger])

  useEffect(() => {
    if (arsTrigger > 0) {
      setShowArsConfetti(true)
      const timer = setTimeout(() => {
        setShowArsConfetti(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [arsTrigger])

  const getCardData = (cardId: string): CardData | null => {
    if (cards.length === 0) {
      return null
    }
    const card = cards.find((c) => c.id === cardId) || cards[0]
    if (cardId === cards[0]?.id) {
      return {
        ...card,
        balanceUSD: card.balanceUSD,
      }
    }
    return card
  }

  const renderCardsCarousel = () => {
    if (isLoadingCards) {
      return (
        <div className="p-2 flex gap-4 mb-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory scroll-momentum items-center">
          {[0, 1].map((index) => (
            <CardSkeleton key={index} index={index} />
          ))}
        </div>
      )
    }

    if (cardsError || cards.length === 0) {
      return (
        <div className="mb-6">
          <div className="bg-white rounded-3xl px-6 py-4 shadow-md text-center">
            <p className="text-gray-500 text-sm font-heading">
              {cardsError || "No tenés ninguna tarjeta disponible"}
            </p>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={scrollContainerRef}
        className={`p-2 flex gap-4 mb-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory scroll-momentum items-center ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cards.map((cardData, cardIndex) => {
          const card = getCardData(cardData.id)
          if (!card) return null
          return (
            <BalanceCard
              key={card.id}
              card={card}
              currency={currency}
              exchangeRate={EXCHANGE_RATE}
              index={cardIndex}
              isMainCard={mainCardIndex === cardIndex}
            />
          )
        })}
      </div>
    )
  }

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) {
      return
    }

    const fetchCards = async () => {
      try {
        setIsLoadingCards(true)
        setCardsError(null)
        const response = await apiClient.getCards()
        if (response.success && response.data) {
          const mappedCards = response.data.map(mapApiCardToCardData)
          setCards(mappedCards)
        } else {
          setCardsError("No se pudieron cargar las tarjetas")
        }
      } catch (error) {
        setCardsError(
          error instanceof Error
            ? error.message
            : "Error al cargar las tarjetas"
        )
      } finally {
        setIsLoadingCards(false)
      }
    }

    fetchCards()
  }, [isAuthLoading, isAuthenticated])

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) {
      return
    }

    const fetchLastMovements = async () => {
      try {
        setIsLoadingMovements(true)
        setMovementsError(null)
        const response = await apiClient.getLastMovements()
        if (response.success && response.data) {
          const mappedTransactions = response.data.map(
            mapApiTransactionToComponent
          )
          setTransactions(mappedTransactions)
        } else {
          setMovementsError("No se pudieron cargar los movimientos")
        }
      } catch (error) {
        setMovementsError(
          error instanceof Error
            ? error.message
            : "Error al cargar los movimientos"
        )
      } finally {
        setIsLoadingMovements(false)
      }
    }

    fetchLastMovements()
  }, [isAuthLoading, isAuthenticated])

  if (isAuthLoading || !isAuthenticated) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-daybg pt-8 pb-18">
      <div className="max-w-[414px] mx-auto px-6">
        <Header />

        {renderCardsCarousel()}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              opacity: { duration: 0.4, delay: 0 },
              x: { duration: 0.4, delay: 0 },
            }}
            className="text-xl font-medium text-gray-900 mb-4 font-heading"
          >
            Últimos movimientos
          </motion.h2>
          <TransactionsList
            transactions={transactions}
            isLoading={isLoadingMovements}
            error={movementsError}
            emptyMessage="No hay movimientos recientes"
            showEmptyIcon={false}
          />
        </motion.div>
      </div>

      <BottomNavigation />

      {showUsdConfetti && <Confetti flagType="usa" />}

      {showArsConfetti && <Confetti flagType="argentina" />}

      <PaisanosEffect trigger={paisanosTrigger} />
    </div>
  )
}
