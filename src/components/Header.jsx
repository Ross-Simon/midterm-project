import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Use auth context to determine if user is logged in and display appropriate links
const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

// Handle user logout and redirect to home
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-green-600 text-white shadow-lg border-b-2 border-white-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 hover:text-green-200 transition-colors">
            <img 
              src="/public/studyspot-logo.png" 
              alt="StudySpot PH Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-2xl font-bold">StudySpot PH</span>
          </Link>
        
        <nav className="flex items-center space-x-6 font-bold">
          <Link 
            to="/" 
            className="hover:text-green-200 transition-colors"
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard/my-bookings" 
                className="hover:text-green-200 transition-colors font-bold"
              >
                Dashboard
              </Link>
              <div className="flex items-center space-x-4 font-bold">
                <span className="text-sm">Welcome, {user.name}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors font-bold"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded transition-colors font-bold"
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