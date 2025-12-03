"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-[54px] w-full rounded-[12px] border bg-white px-4 py-3 text-sm shadow-[0px_8px_30px_0px_rgba(0,0,0,0.06)] transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#aaaaaa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paisabank-default focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            isFocused
              ? "border-paisabank-default scale-[1.01] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.1)]"
              : "border-gray-100 scale-100",
            className
          )}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
