"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

import { storage } from "@/lib/storage"

interface AuthContextType {
  token: string | null
  userName: string | null
  isAuthenticated: boolean
  setAuth: (token: string, userName: string, persistent: boolean) => void
  clearAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = storage.getToken()
    const storedUserName = storage.getUserName()

    if (storedToken) {
      setToken(storedToken)
    }
    if (storedUserName) {
      setUserName(storedUserName)
    }
  }, [])

  const setAuth = (
    newToken: string,
    newUserName: string,
    persistent: boolean
  ) => {
    storage.setToken(newToken, persistent)
    storage.setUserName(newUserName)
    setToken(newToken)
    setUserName(newUserName)
  }

  const clearAuth = () => {
    storage.clearAuth()
    setToken(null)
    setUserName(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userName,
        isAuthenticated: Boolean(token),
        setAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
