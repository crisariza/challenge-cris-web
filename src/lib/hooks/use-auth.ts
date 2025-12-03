import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { storage } from "@/lib/storage"

export function useAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = storage.getToken()

    if (!token) {
      setIsAuthenticated(false)
      setIsLoading(false)
      router.push("/login")
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [router])

  return { isAuthenticated, isLoading }
}
