"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { Loading } from "@/components/ui/loading"
import { storage } from "@/lib/storage"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const token = storage.getToken()

    if (token) {
      // User has token, redirect to home
      router.push("/home")
    } else {
      // No token, redirect to login
      router.push("/login")
    }
  }, [router])

  return <Loading />
}
