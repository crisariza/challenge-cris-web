"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

export const BANNER_DURATION = 3000

const generateBannerPieces = () =>
  Array.from({ length: 24 }, (_, i) => {
    const directions = [
      "top",
      "bottom",
      "left",
      "right",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
    ]
    const direction = directions[Math.floor(Math.random() * directions.length)]

    const targetX = Math.random() * 100
    const targetY = Math.random() * 100

    return {
      id: i,
      targetX,
      targetY,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1.5,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.5 + Math.random() * 0.5,
      direction,
    }
  })

export function PaisanosBanner() {
  const [bannerPieces] = useState(() => generateBannerPieces())

  return (
    <div className="fixed inset-0 pointer-events-none z-9998 overflow-hidden">
      {bannerPieces.map((piece) => {
        const screenWidth =
          typeof window !== "undefined" ? window.innerWidth : 414
        const screenHeight =
          typeof window !== "undefined" ? window.innerHeight : 1000

        const targetX = (piece.targetX / 100) * screenWidth
        const targetY = (piece.targetY / 100) * screenHeight

        let startX = 0
        let startY = 0
        let endX = 0
        let endY = 0

        switch (piece.direction) {
          case "top":
            startX = targetX
            startY = -300
            endX = targetX + (Math.random() - 0.5) * 200
            endY = targetY + (Math.random() - 0.5) * 200
            break
          case "bottom":
            startX = targetX
            startY = screenHeight + 300
            endX = targetX + (Math.random() - 0.5) * 200
            endY = targetY + (Math.random() - 0.5) * 200
            break
          case "left":
            startX = -300
            startY = targetY
            endX = targetX + (Math.random() - 0.5) * 200
            endY = targetY + (Math.random() - 0.5) * 200
            break
          case "right":
            startX = screenWidth + 300
            startY = targetY
            endX = targetX + (Math.random() - 0.5) * 200
            endY = targetY + (Math.random() - 0.5) * 200
            break
          case "top-left":
            startX = -300
            startY = -300
            endX = targetX + (Math.random() - 0.5) * 200
            endY = targetY + (Math.random() - 0.5) * 200
            break
          case "top-right":
            startX = screenWidth + 300
            startY = -300
            endX = targetX + (Math.random() - 0.5) * 200
            endY = targetY + (Math.random() - 0.5) * 200
            break
          case "bottom-left":
            startX = -300
            startY = screenHeight + 300
            endX = targetX + (Math.random() - 0.5) * 200
            endY = targetY + (Math.random() - 0.5) * 200
            break
          case "bottom-right":
            startX = screenWidth + 300
            startY = screenHeight + 300
            endX = targetX + (Math.random() - 0.5) * 200
            endY = targetY + (Math.random() - 0.5) * 200
            break
        }

        return (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              left: `${startX}px`,
              top: `${startY}px`,
            }}
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 0,
              scale: piece.scale * 0.5,
            }}
            animate={{
              x: endX - startX,
              y: endY - startY,
              rotate: piece.rotation + 180,
              opacity: [0, 1, 1, 0.8, 0],
              scale: [
                piece.scale * 0.5,
                piece.scale,
                piece.scale,
                piece.scale * 0.8,
                piece.scale * 0.3,
              ],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "easeOut",
            }}
          >
            <Image
              src="/assets/paisanos-banner.png"
              alt="Paisanos Banner"
              width={300}
              height={120}
              className="object-contain"
              style={{
                imageRendering: "auto",
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
