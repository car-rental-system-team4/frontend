import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Check for existing session on page load
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user data", error)
        localStorage.clear() // Clear corrupted data
      }
    }
    setLoading(false)
  }, [])

  // 2. Login: Only called AFTER Backend gives us a Token
  const login = (userData) => {
    setUser(userData)
    
    
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // 3. Logout: Clears everything
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token') // CRITICAL: Remove the security key
    window.location.href = '/login'
  }

 

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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