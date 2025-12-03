"use client"

import { useRef, useState, useEffect } from "react"

type FilterType =
  | "all"
  | "auto-debit"
  | "received"
  | "sent"
  | "subscription"
  | "expense"
  | "income"

interface FiltersProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

const filters = [
  { id: "all", label: "Todos" },
  { id: "auto-debit", label: "Debito Aut." },
  { id: "received", label: "Recibido" },
  { id: "sent", label: "Enviado" },
]

export default function Filters({
  activeFilter,
  onFilterChange,
}: FiltersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const [hasMoved, setHasMoved] = useState(false)

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
      const walk = (x - startXRef.current) * 2

      if (Math.abs(walk) > 5) {
        setHasMoved(true)
      }

      scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk
    }

    const handleMouseUp = () => {
      setIsDragging(false)
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

    if (Math.abs(walk) > 5) {
      setHasMoved(true)
    }

    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(() => setHasMoved(false), 0)
  }

  return (
    <div
      ref={scrollContainerRef}
      className={`flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x snap-mandatory scroll-momentum ${
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
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={(e) => {
            if (hasMoved) {
              e.preventDefault()
              e.stopPropagation()
              return
            }
            onFilterChange(filter.id as FilterType)
          }}
          className={`px-4 py-2 rounded-2xl text-sm font-medium font-heading whitespace-nowrap transition-colors snap-start ${
            activeFilter === filter.id
              ? "bg-gray-500 text-white"
              : "bg-white text-gray-900 hover:bg-gray-50 hover:cursor-pointer"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export type { FilterType }
