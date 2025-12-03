"use client"

import { motion } from "framer-motion"

interface HeaderProps {
  animationTimeline: {
    logoIcon: { delay: number; duration: number }
    logoContainer: { delay: number; duration: number }
    title: { delay: number; duration: number }
    subtitle: { delay: number; duration: number }
  }
}

export function Header({ animationTimeline }: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: animationTimeline.logoContainer.duration,
        delay: animationTimeline.logoContainer.delay,
        ease: "easeOut",
      }}
      className="flex flex-col items-center gap-3"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: animationTimeline.logoIcon.duration,
          delay: animationTimeline.logoIcon.delay,
          ease: "easeOut",
        }}
        className="bg-paisabank-default rounded-[12px] w-[48.825px] h-[48.825px] flex items-center justify-center overflow-hidden"
      >
        <svg
          width="48.825"
          height="48.825"
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="object-contain"
        >
          <rect width="48.8252" height="48.8252" rx="12" fill="#005CEE" />
          <path
            d="M13.7456 24.0009V13.3339H19.0796V8H8.4126V40H13.7456V29.333H29.7456V24.0009H13.7456Z"
            fill="white"
          />
          <path
            d="M19.0796 13.3339V18.667H35.0787V29.3339H29.7456V34.667C35.6373 34.667 40.4126 29.8916 40.4126 24C40.4126 18.1083 35.6373 13.333 29.7456 13.333H19.0796V13.3339Z"
            fill="white"
          />
        </svg>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: animationTimeline.title.duration,
          delay: animationTimeline.title.delay,
          ease: "easeOut",
        }}
        className="text-[40px] font-medium text-paisabank-default tracking-[-1.5583px] font-heading leading-[60.205px]"
      >
        PaisaBank
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: animationTimeline.subtitle.duration,
          delay: animationTimeline.subtitle.delay,
          ease: "easeOut",
        }}
        className="text-base font-normal text-gray-500 text-center"
      >
        Comienza a manejar tu vida financiera
      </motion.p>
    </motion.div>
  )
}
