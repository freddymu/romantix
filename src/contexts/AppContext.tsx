'use client'

import type React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import api from '@/lib/client/api'

type User = {
  id: string
  email: string
  name?: string
}

type AppContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setUserProfile: (userData: Partial<User>) => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for existing session on component mount
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const response = await api.user.getUser('me') // Assuming 'me' endpoint returns current user
      if (response.data) {
        setUser(response.data)
      }
    } catch (error) {
      console.error('Failed to check session:', error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      // Assuming the API has a login endpoint
      const response = await api.user.login({ email, password })
      if (response.data) {
        setUser(response.data)
      } else {
        throw new Error('Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      // Assuming the API has a logout endpoint
      await api.user.logout()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  const setUserProfile = async (userData: Partial<User>) => {
    if (!user) {
      throw new Error('No user logged in')
    }

    try {
      const response = await api.user.updateUser(user.id, userData)
      if (response.data) {
        setUser({ ...user, ...response.data })
      } else {
        throw new Error('Failed to update user profile')
      }
    } catch (error) {
      console.error('Set user profile error:', error)
      throw error
    }
  }

  return (
    <AppContext.Provider value={{ user, login, logout, setUserProfile }}>
      {children}
    </AppContext.Provider>
  )
}
