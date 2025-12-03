"use client"

import { motion } from "framer-motion"
import { useState } from "react"

import {
  PixelDollar,
  PixelPeso,
  PixelArgentinaFlag,
  PixelUSAFlag,
} from "@/components/home/components/pixel-art"

const generateConfettiPieces = (flagType: "argentina" | "usa" = "argentina") =>
  Array.from({ length: 240 }, (_, i) => {
    const types: Array<"square" | "dollar" | "peso" | "flag"> = [
      "square",
      flagType === "argentina" ? "peso" : "dollar",
      "flag",
    ]
    const type = types[Math.floor(Math.random() * types.length)]

    return {
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 4 + Math.random() * 4,
      xOffset: (Math.random() - 0.5) * 200,
      rotation: Math.random() * 360,
      type,
      flagType,
    }
  })

export function Confetti({
  flagType = "argentina",
}: {
  flagType?: "argentina" | "usa"
}) {
  const [confettiPieces] = useState(() => generateConfettiPieces(flagType))

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => {
        const screenHeight =
          typeof window !== "undefined" ? window.innerHeight : 1000
        const startHeight = -screenHeight * 2

        return (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.left}%`,
              top: `${startHeight}px`,
            }}
            initial={{
              y: 0,
              x: 0,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: screenHeight * 3 + 100,
              x: piece.xOffset,
              rotate: piece.rotation + 360,
              opacity: 1,
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "easeOut",
            }}
          >
            {piece.type === "square" && (
              <div
                className="w-3 h-3"
                style={{
                  backgroundColor: Math.random() > 0.5 ? "#e1fe03" : "#000000",
                }}
              />
            )}
            {piece.type === "dollar" && <PixelDollar />}
            {piece.type === "peso" && <PixelPeso />}
            {piece.type === "flag" &&
              (piece.flagType === "argentina" ? (
                <PixelArgentinaFlag />
              ) : (
                <PixelUSAFlag />
              ))}
          </motion.div>
        )
      })}
    </div>
  )
}
