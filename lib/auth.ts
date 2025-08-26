export interface User {
  id: string
  name: string
  email: string
  picture: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Google OAuth configuration
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""

// Initialize Google OAuth
export const initializeGoogleAuth = () => {
  return new Promise<void>((resolve) => {
    if (typeof window !== "undefined" && window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      })
      resolve()
    } else {
      // Load Google Identity Services script
      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        })
        resolve()
      }
      document.head.appendChild(script)
    }
  })
}

// Handle Google OAuth response
const handleCredentialResponse = (response: any) => {
  const token = response.credential
  const payload = JSON.parse(atob(token.split(".")[1]))

  const user: User = {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
  }

  // Store user in localStorage
  localStorage.setItem("user", JSON.stringify(user))

  // Trigger custom event for auth state change
  window.dispatchEvent(new CustomEvent("authStateChange", { detail: user }))
}

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("user")
  return userStr ? JSON.parse(userStr) : null
}

// Sign out user
export const signOut = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
    window.google?.accounts.id.disableAutoSelect()
    window.dispatchEvent(new CustomEvent("authStateChange", { detail: null }))
  }
}

// Google Identity Services types
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, config: any) => void
          disableAutoSelect: () => void
        }
      }
    }
  }
}
