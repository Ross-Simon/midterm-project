import { AuthProvider } from './contexts/AuthContext'
import { BookingProvider } from './contexts/BookingContext'
import AppRouter from './router/AppRouter'
import ScrollToTop from './components/ScrollToTop' 

const App = () => {
  return (
    <AuthProvider>
      <BookingProvider>
        <AppRouter />
        <ScrollToTop />
      </BookingProvider>
    </AuthProvider>
  )
}

export default App