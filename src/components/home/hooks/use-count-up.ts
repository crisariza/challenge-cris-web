import { useState, useEffect } from "react"

export function useCountUp(
  end: number,
  duration: number = 1.5,
  decimals: number = 2,
  immediate: boolean = false
) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(0)

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      )

      const easeOutQuart = 1 - (1 - progress) ** 4
      setCount(end * easeOutQuart)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate)
    }, 50)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, immediate])

  return count.toFixed(decimals)
}
