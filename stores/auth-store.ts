import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    postalCode: string
    country: string
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, "id">) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // Mock successful login
        const mockUser: User = {
          id: "1",
          firstName: "Jean",
          lastName: "Dupont",
          email: email,
          phone: "06 12 34 56 78",
          address: {
            street: "123 Rue de la République",
            city: "Paris",
            postalCode: "75001",
            country: "France"
          }
        }

        set({ user: mockUser, isAuthenticated: true })
        return true
      },

      register: async (userData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        const newUser: User = {
          id: Date.now().toString(),
          ...userData
        }

        set({ user: newUser, isAuthenticated: true })
        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: (userData) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } })
        }
      }
    }),
    {
      name: "auth-storage",
    }
  )
)
