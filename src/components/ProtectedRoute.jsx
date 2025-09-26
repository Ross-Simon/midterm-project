import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Protects routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute