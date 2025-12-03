import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { storage } from "@/lib/storage"

export function useAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = storage.getToken()

    if (!token) {
      router.push("/login")
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  return isAuthenticated
}
