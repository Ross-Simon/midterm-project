import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useBooking } from '../contexts/BookingContext'
import { formatCurrency } from '../utils/formatters'

const BookingForm = ({ space }) => {
  const [selectedDate, setSelectedDate] = useState('') 
  const [selectedSlot, setSelectedSlot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [error, setError] = useState('')
  const { user } = useAuth()
  const { addBooking, getBookingsByUser } = useBooking()
  const navigate = useNavigate()

  // Function to get today's date in YYYY-MM-DD format, prevents selecting of past dates
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Check if the user already has the same exact booking, to prevent duplicates
  const checkForDuplicateBooking = (spaceId, date, timeSlot) => {
    const userBookings = getBookingsByUser(user.id)
    return userBookings.some(booking => 
      booking.spaceId === spaceId && 
      booking.selectedDate === date && 
      booking.timeSlot === timeSlot &&
      booking.status === 'confirmed' // To check only confirmed bookings
    )
  }

  // Handle form submission, creates a booking if no duplicates are found
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Check for duplicate booking based on user, space, date, and time slot
      const isDuplicate = checkForDuplicateBooking(space.id, selectedDate, selectedSlot)
      
      if (isDuplicate) {
        setError(`You already have a booking for ${space.name} on ${new Date(selectedDate).toLocaleDateString('en-PH', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} at ${selectedSlot}. Please choose a different date or time slot.`)
        setIsSubmitting(false)
        return
      }

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create booking object with necessary details
      const booking = {
        userId: user.id,
        spaceId: space.id,
        spaceName: space.name,
        spaceLocation: space.location,
        selectedDate,
        timeSlot: selectedSlot,
        totalPrice: space.price,
        status: 'confirmed'
      }

      // Add booking to context and messages user of success or failure of booking
      addBooking(booking)
      alert('Booking confirmed successfully!')
      navigate('/dashboard/my-bookings')
    } catch (error) {
      console.error('Booking error:', error)
      setError('Failed to create booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Clear error when user changes selection inputs in date and time slot
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
    setError('')
  }

  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value)
    setError('')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Book This Space</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Input Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📅 Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={getTodayDate()}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          />
          <p className="text-sm text-gray-500 mt-1">
            Choose your preferred booking date
          </p>
        </div>

        {/* Time Slot Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ⏰ Select Time Slot
          </label>
          <select
            value={selectedSlot}
            onChange={handleSlotChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          >
            <option value="">Select a time slot</option>
            {space.time_slots.map(slot => {
              // To check if this slot is already booked by the user for the selected date
              const isAlreadyBooked = selectedDate && checkForDuplicateBooking(space.id, selectedDate, slot)
              
              return (
                <option key={slot} value={slot} disabled={isAlreadyBooked}>
                  {slot} {isAlreadyBooked ? '(Already booked)' : ''}
                </option>
              )
            })}
          </select>
          {selectedDate && (
            <p className="text-sm text-gray-500 mt-1">
              Note: Slots marked as "Already booked" are unavailable for the selected date.
            </p>
          )}
        </div>

        {/* Price Display */}
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total Price:</span>
            <span className="text-2xl font-bold text-green-600">
              {formatCurrency(space.price)}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !selectedDate || !selectedSlot}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors"
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  )
}

export default BookingForm