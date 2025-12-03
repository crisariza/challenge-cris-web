"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useState } from "react"

import { Input } from "@/components/ui/input"

interface SearchbarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function Searchbar({
  value,
  onChange,
  placeholder = "Ingresa un nombre o servicio",
}: SearchbarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [iconAnimationKey, setIconAnimationKey] = useState(0)

  return (
    <motion.div
      className="relative mb-4"
      animate={{
        scale: isSearchFocused ? 1.02 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <motion.div
        key={iconAnimationKey}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
        initial={{ scale: 1, rotate: 0 }}
        animate={{
          scale: isSearchFocused ? 1.2 : 1,
          rotate: isSearchFocused ? [0, -10, 10, -5, 0] : 0,
        }}
        transition={{
          scale: {
            duration: 0.3,
            ease: "easeOut",
          },
          rotate: isSearchFocused
            ? {
                duration: 0.5,
                ease: "easeOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }
            : {
                duration: 0.2,
                ease: "easeOut",
              },
        }}
      >
        <Search className="w-5 h-5 text-gray-400" />
      </motion.div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setIsSearchFocused(true)
          setIconAnimationKey((prev) => prev + 1)
        }}
        onBlur={() => setIsSearchFocused(false)}
        className="pl-12 border-none"
      />
    </motion.div>
  )
}
