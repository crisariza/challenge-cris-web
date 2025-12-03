"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"

import Transaction, {
  type Transaction as TransactionType,
} from "@/components/transaction"

interface TransactionsListProps {
  transactions: TransactionType[]
  isLoading: boolean
  error: string | null
  emptyMessage?: string
  animationKey?: string
  showEmptyIcon?: boolean
}

export default function TransactionsList({
  transactions,
  isLoading,
  error,
  emptyMessage = "No se encontraron movimientos",
  animationKey,
  showEmptyIcon = false,
}: TransactionsListProps) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl px-4 py-6 flex items-center shadow-sm gap-4 shadow-gray-200 animate-pulse"
            >
              <div className="w-11 h-11 rounded-xl bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </motion.div>
      ) : error ? (
        <motion.div
          key="error-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl px-4 py-6 text-center"
        >
          <p className="text-gray-500 text-sm font-heading">{error}</p>
        </motion.div>
      ) : transactions.length === 0 ? (
        <motion.div
          key="empty-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={
            showEmptyIcon
              ? "text-center py-12"
              : "bg-white rounded-xl px-4 py-6 text-center"
          }
        >
          {showEmptyIcon && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2,
              }}
              className="inline-block mb-4"
            >
              <Search className="w-16 h-16 text-gray-300" />
            </motion.div>
          )}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: showEmptyIcon ? 0.4 : 0 }}
            className="text-gray-400 font-heading"
          >
            {emptyMessage}
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key={animationKey || "transactions-list"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {transactions.map((transaction, index) => (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              index={index}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
