"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export interface Transaction {
  id: number
  type: "subscription" | "income" | "expense"
  name: string
  description: string
  amount: string
}

interface TransactionProps {
  transaction: Transaction
  index?: number
}

export default function Transaction({
  transaction,
  index = 0,
}: TransactionProps) {
  const iconBgClass =
    transaction.type === "subscription"
      ? "bg-purple-100"
      : transaction.type === "income"
        ? "bg-green-100"
        : transaction.type === "expense"
          ? "bg-orange-100"
          : "bg-gray-100"

  const amountColorClass =
    transaction.type === "subscription"
      ? "text-purple-500"
      : transaction.type === "income"
        ? "text-green-500"
        : transaction.type === "expense"
          ? "text-orange-500"
          : "text-gray-900"

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{
        y: -4,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.98, y: -2 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        opacity: { duration: 0.4, delay: index * 0.05 },
        x: { duration: 0.4, delay: index * 0.05 },
      }}
      className="bg-white rounded-xl px-4 py-6 flex items-center shadow-sm gap-4 shadow-gray-200 cursor-pointer"
    >
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: [0, -10, 10, -5, 0],
        }}
        transition={{
          scale: { duration: 0.2 },
          rotate: {
            duration: 0.5,
            ease: "easeOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          },
        }}
        className={`w-11 h-11 rounded-xl ${iconBgClass} flex items-center justify-center`}
      >
        {transaction.type === "income" && (
          <motion.div
            whileHover={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Image
              src="/icons/CASH_IN.svg"
              alt="Cash In"
              width={24}
              height={24}
              className="w-6 h-6"
              style={{ imageRendering: "pixelated" }}
            />
          </motion.div>
        )}
        {transaction.type === "expense" && (
          <motion.div
            whileHover={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Image
              src="/icons/CASH_OUT.svg"
              alt="Cash Out"
              width={24}
              height={24}
              className="w-6 h-6"
              style={{ imageRendering: "pixelated" }}
            />
          </motion.div>
        )}
        {transaction.type === "subscription" && (
          <motion.div
            whileHover={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Image
              src="/icons/SUS.svg"
              alt="Subscription"
              width={24}
              height={24}
              className="w-6 h-6"
              style={{ imageRendering: "pixelated" }}
            />
          </motion.div>
        )}
      </motion.div>
      <div className="flex-1">
        <p className="text-gray-900 font-heading">{transaction.name}</p>
        <p className="text-xs text-gray-400 font-heading">
          {transaction.description}
        </p>
      </div>
      <div className="text-right">
        <motion.p
          className={`${amountColorClass} text-sm font-medium`}
          animate={
            transaction.type === "income" || transaction.type === "expense"
              ? {
                  scale: [1, 1.05, 1],
                  opacity: [1, 0.9, 1],
                }
              : {}
          }
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          {transaction.amount}
        </motion.p>
      </div>
    </motion.div>
  )
}
