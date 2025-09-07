import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('studyspot_user', null)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
    // Clear bookings on logout
    localStorage.removeItem('studyspot_bookings')
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}