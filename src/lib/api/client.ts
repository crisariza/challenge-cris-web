import type {
  ApiError,
  LoginRequest,
  LoginResponse,
  Transaction,
  Card,
} from "@/lib/api/types"
import { storage } from "@/lib/storage"

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/paisabank`

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`
  const url = `${API_BASE_URL}${normalizedEndpoint}`
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const responseText = await response.text()

    let responseData: T | ApiError
    try {
      responseData = JSON.parse(responseText)
    } catch (error) {
      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}. Server returned non-JSON response, error: ${error}`
        )
      }
      throw new Error(`Server returned non-JSON response, error: ${error}`)
    }

    if (!response.ok) {
      const errorData = responseData as ApiError
      throw new Error(
        errorData.message ||
          errorData.error ||
          `HTTP error! status: ${response.status}`
      )
    }

    return responseData as T
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to process request")
  }
}

async function login(credentials: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>("login", {
    method: "POST",
    body: JSON.stringify(credentials),
  })
}

async function getLastMovements(): Promise<{
  success: boolean
  data: Transaction[]
}> {
  const token = storage.getToken()
  if (!token) {
    throw new Error("No authentication token found")
  }

  return request<{ success: boolean; data: Transaction[] }>("/movements/last", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

async function getAllMovements(
  filter?: "SUS" | "CASH_IN" | "CASH_OUT"
): Promise<{ success: boolean; data: Transaction[] }> {
  const token = storage.getToken()
  if (!token) {
    throw new Error("No authentication token found")
  }

  const url = filter ? `/movements/all?filter=${filter}` : "/movements/all"

  return request<{ success: boolean; data: Transaction[] }>(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

async function getCards(): Promise<{ success: boolean; data: Card[] }> {
  const token = storage.getToken()
  if (!token) {
    throw new Error("No authentication token found")
  }

  return request<{ success: boolean; data: Card[] }>("/cards", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const apiClient = {
  login,
  getLastMovements,
  getAllMovements,
  getCards,
}
