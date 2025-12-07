"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface AuthContextType {
  isLoggedIn: boolean
  username: string
  bio: string
  avatarUrl: string
  login: (name: string) => void
  logout: () => void
  updateBio: (newBio: string) => void
  updateAvatar: (url: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("こんにちは！study-trackで勉強を記録しています。")
  const [avatarUrl, setAvatarUrl] = useState("")

  const login = (name: string) => {
    setIsLoggedIn(true)
    setUsername(name)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUsername("")
    setAvatarUrl("")
  }

  const updateBio = (newBio: string) => {
    setBio(newBio)
  }

  const updateAvatar = (url: string) => {
    setAvatarUrl(url)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, bio, avatarUrl, login, logout, updateBio, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
