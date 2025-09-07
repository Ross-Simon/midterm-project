import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          StudySpot PH
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link 
            to="/" 
            className="hover:text-blue-200 transition-colors"
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard/my-bookings" 
                className="hover:text-blue-200 transition-colors"
              >
                Dashboard
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {user.name}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header