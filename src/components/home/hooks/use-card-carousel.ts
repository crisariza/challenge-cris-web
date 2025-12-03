import { useState, useRef, useEffect } from "react"

import type { CardData } from "@/components/home/types"

interface UseCardCarouselReturn {
  scrollContainerRef: React.RefObject<HTMLDivElement>
  isDragging: boolean
  setIsDragging: (value: boolean) => void
  startXRef: React.MutableRefObject<number>
  scrollLeftRef: React.MutableRefObject<number>
  hasMoved: boolean
  setHasMoved: (value: boolean) => void
  mainCardIndex: number
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void
  handleTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void
  handleTouchEnd: () => void
}

/**
 * Hook for managing card carousel interactions
 */
export function useCardCarousel(cards: CardData[]): UseCardCarouselReturn {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const [hasMoved, setHasMoved] = useState(false)
  const [mainCardIndex, setMainCardIndex] = useState(0)

  // Drag handlers for card carousel
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setHasMoved(false)
    const rect = scrollContainerRef.current.getBoundingClientRect()
    startXRef.current = e.pageX - rect.left
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current) return
      const rect = scrollContainerRef.current.getBoundingClientRect()
      const x = e.pageX - rect.left
      const walk = (x - startXRef.current) * 2 // Scroll speed multiplier

      // Check if we've moved more than 5 pixels
      if (Math.abs(walk) > 5) {
        setHasMoved(true)
      }

      scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      // Reset hasMoved after a short delay to allow click handler to check it
      setTimeout(() => setHasMoved(false), 100)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging])

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setHasMoved(false)
    const rect = scrollContainerRef.current.getBoundingClientRect()
    startXRef.current = e.touches[0].pageX - rect.left
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return
    const rect = scrollContainerRef.current.getBoundingClientRect()
    const x = e.touches[0].pageX - rect.left
    const walk = (x - startXRef.current) * 2

    // Check if we've moved more than 5 pixels
    if (Math.abs(walk) > 5) {
      setHasMoved(true)
    }

    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(() => setHasMoved(false), 0)
  }

  // Track which card is currently the main/visible one based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || cards.length === 0) return

    const updateMainCard = () => {
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2

      // Find which card is closest to the center
      let closestIndex = 0
      let closestDistance = Infinity

      const cardElements = container.querySelectorAll("[data-card-index]")
      cardElements.forEach((cardEl) => {
        const index = parseInt(cardEl.getAttribute("data-card-index") || "0")
        const cardRect = cardEl.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distance = Math.abs(containerCenter - cardCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setMainCardIndex(closestIndex)
    }

    // Throttled update function
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(updateMainCard, 50)
    }

    // Update on scroll
    container.addEventListener("scroll", handleScroll, { passive: true })

    // Update on resize
    window.addEventListener("resize", updateMainCard)

    // Initial update
    updateMainCard()

    // Also update after a short delay to catch initial render
    const timeout = setTimeout(updateMainCard, 100)

    return () => {
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateMainCard)
      clearTimeout(timeout)
      clearTimeout(scrollTimeout)
    }
  }, [cards.length])

  return {
    scrollContainerRef: scrollContainerRef as React.RefObject<HTMLDivElement>,
    isDragging,
    setIsDragging,
    startXRef,
    scrollLeftRef,
    hasMoved,
    setHasMoved,
    mainCardIndex,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}
