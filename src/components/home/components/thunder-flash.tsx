"use client"

import { motion } from "framer-motion"

export const THUNDER_DURATION = 500 // Duration in milliseconds

export function ThunderFlash() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-9999"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0.8, 0.3, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: THUNDER_DURATION / 1000 }}
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 8%, rgba(255, 255, 255, 0.7) 20%, rgba(200, 220, 255, 0.4) 40%, transparent 70%)",
      }}
    />
  )
}
