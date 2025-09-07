import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useBooking } from '../contexts/BookingContext'
import { formatCurrency } from '../utils/formatters'

const BookingForm = ({ space }) => {
  const [selectedSlot, setSelectedSlot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { user } = useAuth()
  const { addBooking } = useBooking()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const booking = {
        userId: user.id,
        spaceId: space.id,
        spaceName: space.name,
        spaceLocation: space.location,
        timeSlot: selectedSlot,
        totalPrice: space.price,
        status: 'confirmed'
      }

      addBooking(booking)
      alert('Booking confirmed successfully!')
      navigate('/dashboard/my-bookings')
    } catch (error) {
      console.error('Booking error:', error)
      alert('Failed to create booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Book This Space</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time Slot
          </label>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a time slot</option>
            {space.time_slots.map(slot => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total Price:</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(space.price)}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md"
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  )
}

export default BookingForm