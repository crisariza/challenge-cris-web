"use client"

import { motion, AnimatePresence } from "framer-motion"
import * as React from "react"

import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onClick, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<
      Array<{ id: number; x: number; y: number }>
    >([])

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = {
        id: Date.now(),
        x,
        y,
      }

      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 400)

      onClick?.(e)
    }

    return (
      <div className="relative inline-flex items-center justify-center">
        <motion.div
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="relative flex items-center justify-center"
        >
          <input
            type="checkbox"
            className={cn(
              "peer h-[18px] w-[18px] shrink-0 rounded-[4px] border-none bg-gray-300 text-paisabank-default accent-paisabank-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paisabank-default focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer appearance-none checked:bg-paisabank-default checked:border-none transition-all duration-200 relative z-10",
              className
            )}
            ref={ref}
            checked={checked}
            onClick={handleClick}
            {...props}
          />

          {/* Efecto */}
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.div
                key={ripple.id}
                className="absolute top-0 left-0 w-[18px] h-[18px] rounded-[4px] bg-paisabank-default/20 pointer-events-none z-0"
                initial={{
                  scale: 0,
                  opacity: 0.4,
                  x: ripple.x - 9,
                  y: ripple.y - 9,
                }}
                animate={{
                  scale: 1.8,
                  opacity: 0,
                  x: ripple.x - 9,
                  y: ripple.y - 9,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  transformOrigin: `${ripple.x}px ${ripple.y}px`,
                }}
              />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {checked && (
              <motion.svg
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-0 left-0 h-[18px] w-[18px] pointer-events-none z-20"
                fill="none"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M4 9L7 12L14 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
