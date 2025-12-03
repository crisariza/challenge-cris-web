const TOKEN_KEY = "paisabank_token"
const USER_NAME_KEY = "paisabank_user_name"

// Manejo del local storage segun logout y recordarme true/false
export const storage = {
  setToken: (token: string, persistent: boolean = true): void => {
    if (typeof window !== "undefined") {
      if (persistent) {
        localStorage.setItem(TOKEN_KEY, token)
        sessionStorage.removeItem(TOKEN_KEY)
      } else {
        sessionStorage.setItem(TOKEN_KEY, token)
        localStorage.removeItem(TOKEN_KEY)
      }
    }
  },

  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
      )
    }
    return null
  },

  removeToken: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY)
      sessionStorage.removeItem(TOKEN_KEY)
    }
  },

  setUserName: (name: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_NAME_KEY, name)
    }
  },

  getUserName: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(USER_NAME_KEY)
    }
    return null
  },

  removeUserName: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_NAME_KEY)
    }
  },

  clearAuth: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_NAME_KEY)
      sessionStorage.removeItem(TOKEN_KEY)
    }
  },
}
