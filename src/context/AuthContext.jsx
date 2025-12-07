import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    const userWithRole = {
      ...userData,
      role: userData.role || 'customer' // Default to customer if not specified
    }
    setUser(userWithRole)
    localStorage.setItem('user', JSON.stringify(userWithRole))
  }

  const register = (userData) => {
    const userWithRole = {
      ...userData,
      role: 'customer' // New registrations are always customers
    }
    setUser(userWithRole)
    localStorage.setItem('user', JSON.stringify(userWithRole))
  }

  const updateProfile = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const deleteProfile = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, deleteProfile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
