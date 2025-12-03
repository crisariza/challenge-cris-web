"use client"

import { motion } from "framer-motion"
import { Search, Bell } from "lucide-react"
import Link from "next/link"

import { useAuthContext } from "@/lib/contexts/auth-context"
import { sounds } from "@/lib/sounds"

export function Header() {
  const { userName } = useAuthContext()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-6"
    >
      <div>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-heading"
        >
          Hola
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-2xl font-semibold text-gray-900 font-heading "
        >
          {userName || "Usuario"}
        </motion.h1>
      </div>
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/movements">
            <Search className="w-5 h-5" />
          </Link>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={() => sounds.bell()}
        >
          <Bell className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  )
}
