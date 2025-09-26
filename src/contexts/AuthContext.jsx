import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('studyspot_user', null)
  const [registeredUsers, setRegisteredUsers] = useLocalStorage('studyspot_registered_users', [])
  // Adds demo user name and email to localStorage
  const [demoUsers, setDemoUsers] = useLocalStorage('studyspot_demo_users', [
    { id: 'demo-juan', name: 'Juan dela Cruz', email: 'juan@example.com', isDemo: true }
  ])

  const register = (userData) => {
    // Check if user already exists
    const existingUser = registeredUsers.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Create new registered user with unique ID
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isDemo: false
    }

    // Adds a new registered user to localStorage
    setRegisteredUsers(prev => [...prev, newUser])
    
    // Logs in the newly registered user
    setUser(newUser)
    return newUser
  }

  const login = (loginData) => {
    // For registered users, check if email exists then log in the user
    if (loginData.email && !loginData.id) {
      const existingUser = registeredUsers.find(u => u.email === loginData.email)
      if (existingUser) {
        setUser(existingUser)
        return existingUser
      } else {
        throw new Error('No account found with this email')
      }
    }
    
    // For demo users logging in, check via localStorage in the demoUsers
    if (loginData.email && loginData.name && !loginData.id) {
      const existingDemoUser = demoUsers.find(u => u.email === loginData.email)
      if (existingDemoUser) {
        setUser(existingDemoUser)
        return existingDemoUser
      }
    }
    
    // For quick login of users with ID
    if (loginData.id) {
      setUser(loginData)
      return loginData
    }

    // If no existing account, register the created account as new user
    return register(loginData)
  }

  const logout = () => {
    setUser(null)
  }

  const getUserByEmail = (email) => {
    return registeredUsers.find(u => u.email === email)
  }

  const getAllUsers = () => {
    return [...registeredUsers, ...demoUsers]
  }

  const getAllRegisteredUsers = () => {
    return registeredUsers
  }

  const getDemoUsers = () => {
    return demoUsers
  }

  const value = {
    user,
    registeredUsers,
    demoUsers,
    login,
    register,
    logout,
    getUserByEmail,
    getAllUsers,
    getAllRegisteredUsers,
    getDemoUsers,
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