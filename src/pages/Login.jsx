import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
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

    // Simulate API call delay
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim()
      }
      
      login(userData)
      setIsLoading(false)
      navigate('/')
    }, 1000)
  }

  const handleQuickLogin = (userData) => {
    setIsLoading(true)
    setTimeout(() => {
      login({
        id: Date.now().toString(),
        ...userData
      })
      setIsLoading(false)
      navigate('/')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to book your study space</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 border-t pt-6">
          <p className="text-sm text-gray-600 text-center mb-4">Quick login for demo:</p>
          <div className="space-y-2">
            <button
              onClick={() => handleQuickLogin({ name: 'Juan dela Cruz', email: 'juan@example.com' })}
              disabled={isLoading}
              className="w-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-800 py-2 px-4 rounded-md transition-colors text-sm"
            >
              Login as Juan dela Cruz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login