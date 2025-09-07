import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useLocalStorage('studyspot_bookings', [])

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setBookings(prev => [...prev, newBooking])
    return newBooking
  }

  const removeBooking = (bookingId) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId))
  }

  const getBookingsByUser = (userId) => {
    return bookings.filter(booking => booking.userId === userId)
  }

  const value = {
    bookings,
    addBooking,
    removeBooking,
    getBookingsByUser
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}