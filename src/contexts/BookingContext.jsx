import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useLocalStorage('studyspot_bookings', []) // Stores all bookings at localStorage

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now().toString(), // Unique ID for each booking
      createdAt: new Date().toISOString() // Timestamp of booking creation needed for sorting
    }
    setBookings(prev => [...prev, newBooking])
    return newBooking
  }
  
  // Remove booking by ID
  const removeBooking = (bookingId) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId)) // Remove booking by ID
  }

  const getBookingsByUser = (userId) => {
    return bookings.filter(booking => booking.userId === userId) // Get bookings for a specific user
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