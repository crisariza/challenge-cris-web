"use client"

import { useState, useEffect } from "react"

import BottomNavigation from "@/components/bottom-navigation"
import { mapApiTransactionToComponent } from "@/components/home/utils"
import Filters, { type FilterType } from "@/components/movements/filters"
import Searchbar from "@/components/movements/searchbar"
import { type Transaction as TransactionType } from "@/components/transaction"
import TransactionsList from "@/components/transactions-list"
import { apiClient } from "@/lib/api/client"
import { useAuth } from "@/lib/hooks/use-auth"

export default function MovementsPage() {
  useAuth()

  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const [isLoadingMovements, setIsLoadingMovements] = useState(true)
  const [movementsError, setMovementsError] = useState<string | null>(null)

  const getApiFilter = (
    filter: FilterType
  ): "SUS" | "CASH_IN" | "CASH_OUT" | undefined => {
    switch (filter) {
      case "auto-debit":
        return "SUS"
      case "received":
        return "CASH_IN"
      case "sent":
        return "CASH_OUT"
      case "all":
      default:
        return undefined
    }
  }

  const getFilteredTransactions = () => {
    let filtered = transactions

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }

  const filteredTransactions = getFilteredTransactions()

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        setIsLoadingMovements(true)
        setMovementsError(null)
        const apiFilter = getApiFilter(activeFilter)
        const response = await apiClient.getAllMovements(apiFilter)
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

    fetchMovements()
  }, [activeFilter])

  return (
    <div className="min-h-screen bg-daybg pt-8 pb-24">
      <div className="max-w-[414px] mx-auto px-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl text-gray-600 font-medium">Movimientos</h1>
        </div>

        <Searchbar value={searchQuery} onChange={setSearchQuery} />

        <Filters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <TransactionsList
          transactions={filteredTransactions}
          isLoading={isLoadingMovements}
          error={movementsError}
          emptyMessage="No se encontraron movimientos"
          animationKey={`transactions-${activeFilter}-${searchQuery}`}
          showEmptyIcon={true}
        />
      </div>
      <BottomNavigation />
    </div>
  )
}
