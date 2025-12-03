export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  data: {
    name: string
    token: string
  }
}

export interface ApiError {
  error: string
  message: string
  details?: string
}

export interface Card {
  id: number
  issuer: string
  name: string
  expDate: string
  lastDigits: number
  balance: string
  currency: string
}

export type TransactionType = "SUS" | "CASH_IN" | "CASH_OUT"

export interface Transaction {
  id: number
  title: string
  amount: string
  transactionType: TransactionType
  date: string
}
