import { AuthProvider } from './contexts/AuthContext'
import { BookingProvider } from './contexts/BookingContext'
import AppRouter from './router/AppRouter'

const App = () => {
  return (
    <AuthProvider>
      <BookingProvider>
        <AppRouter />
      </BookingProvider>
    </AuthProvider>
  )
}

export default App