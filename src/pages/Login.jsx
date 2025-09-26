import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loginMode, setLoginMode] = useState('existing') // 'existing' or 'new'
  const [error, setError] = useState('')
  const { login, register, isAuthenticated, getAllRegisteredUsers, getDemoUsers, getUserByEmail } = useAuth()
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (loginMode === 'existing') {
        // Log in mode - only check email
        const existingUser = getUserByEmail(email.trim())
        if (!existingUser) {
          setError('No account found with this email. Please switch to Sign Up to create a new account.')
          setIsLoading(false)
          return
        }
        // Login with existing account
        login({ email: email.trim() })
      } else {
        // Sign Up mode - create new account using register function
        const userData = {
          name: name.trim(),
          email: email.trim()
        }
        
        // Use register function which handles duplicate checking
        register(userData)
      }

      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = (userData) => {
    setIsLoading(true)
    setError('')
    
    setTimeout(() => {
      try {
        // Use the userData as-is (it already has consistent IDs)
        login(userData)
        navigate('/')
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }, 500)
  }

  const handleModeChange = (mode) => {
    setLoginMode(mode)
    setError('')
    setName('')
    setEmail('')
  }

  const registeredUsers = getAllRegisteredUsers()
  const demoUsers = getDemoUsers()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {loginMode === 'existing' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600">
            {loginMode === 'existing' 
              ? 'Log In with your existing account' 
              : 'Create a new account to get started'
            }
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => handleModeChange('existing')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMode === 'existing' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('new')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMode === 'new' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {loginMode === 'new' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            {isLoading 
              ? (loginMode === 'existing' ? 'Logging in...' : 'Creating account...') 
              : (loginMode === 'existing' ? 'Log In' : 'Create Account')
            }
          </button>
        </form>

        {/* Quick Demo Login - combines demo accounts and registered users */}
        <div className="mt-8 border-t pt-6">
          <p className="text-sm text-gray-600 text-center mb-4">Quick login:</p>
          <div className="space-y-2">
            {/* Demo accounts */}
            {demoUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleQuickLogin(user)}
                disabled={isLoading}
                className="w-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-800 py-2 px-4 rounded-md transition-colors text-sm"
              >
                {user.name} (Demo)
              </button>
            ))}
            
            {/* Show registered users */}
            {registeredUsers.length > 0 && (
              <>
                <div className="text-xs text-gray-500 text-center py-1">— Registered Users —</div>
                {registeredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleQuickLogin(user)}
                    disabled={isLoading}
                    className="w-full bg-blue-100 hover:bg-blue-200 disabled:bg-blue-50 text-blue-800 py-2 px-4 rounded-md transition-colors text-sm"
                  >
                    {user.name}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login