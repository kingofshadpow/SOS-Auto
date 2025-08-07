"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'client' | 'admin'
  phone?: string
  address?: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  createdAt: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

// Mock users for testing
const mockUsers: User[] = [
  {
    id: '1',
    email: 'client@test.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    role: 'client',
    phone: '06 12 34 56 78',
    address: {
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    },
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    email: 'admin@test.com',
    firstName: 'Marie',
    lastName: 'Martin',
    role: 'admin',
    phone: '06 98 76 54 32',
    createdAt: '2024-01-01T08:00:00Z'
  }
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,

      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock authentication - accept any password for demo
        const user = mockUsers.find(u => u.email === email)
        
        if (user) {
          set({ isAuthenticated: true, user })
          return true
        }
        
        return false
      },

      register: async (userData) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === userData.email)
        if (existingUser) {
          return false
        }
        
        // Create new user
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        }
        
        mockUsers.push(newUser)
        set({ isAuthenticated: true, user: newUser })
        return true
      },

      logout: () => {
        set({ isAuthenticated: false, user: null })
      },

      updateUser: (userData) => {
        const { user } = get()
        if (user) {
          const updatedUser = { ...user, ...userData }
          set({ user: updatedUser })
          
          // Update in mock data
          const userIndex = mockUsers.findIndex(u => u.id === user.id)
          if (userIndex !== -1) {
            mockUsers[userIndex] = updatedUser
          }
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
