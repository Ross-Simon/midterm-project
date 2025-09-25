import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useBooking } from '../contexts/BookingContext'
import Modal from '../components/Modal'
import { formatCurrency, getStatusColor, formatDate } from '../utils/formatters'

const Dashboard = () => {
  const { user } = useAuth()
  const { getBookingsByUser, removeBooking } = useBooking()
  const [bookings, setBookings] = useState([])
  const [cancellingBooking, setCancellingBooking] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      const userBookings = getBookingsByUser(user.id)
      setBookings(userBookings)
    }
  }, [user, getBookingsByUser])

  const handleCancelBooking = () => {
    if (cancellingBooking) {
      removeBooking(cancellingBooking.id)
      setBookings(prev => prev.filter(b => b.id !== cancellingBooking.id))
      setCancellingBooking(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your study space reservations</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v1a3 3 0 003 3h4a3 3 0 003-3v-1m-7 0V9a2 2 0 012-2h4a2 2 0 012 2v2M9 7h6m-7 0h8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Start exploring study spaces and make your first booking!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              Browse Spaces
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {booking.spaceName}
                    </h3>
                    <p className="text-gray-600">{booking.spaceLocation}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Booking Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">📅 Booking Date</label>
                    <p className="text-gray-800 text-lg font-medium">
                      {booking.selectedDate ? formatDate(booking.selectedDate) : 'Date not specified'}
                    </p>
                  </div>
                  
                  {/* Time Slot */}
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">⏰ Time Slot</label>
                    <p className="text-gray-800 text-lg font-medium">{booking.timeSlot}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-lg font-semibold text-gray-800">
                      Total: {formatCurrency(booking.totalPrice)}
                    </span>
                  </div>
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => setCancellingBooking(booking)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        <Modal
          isOpen={!!cancellingBooking}
          onClose={() => setCancellingBooking(null)}
          title="Cancel Booking"
        >
          {cancellingBooking && (
            <>
              <p className="text-gray-700 mb-6">
                Are you sure you want to cancel your booking for{' '}
                <strong>{cancellingBooking.spaceName}</strong> on{' '}
                <strong>{cancellingBooking.selectedDate ? formatDate(cancellingBooking.selectedDate) : 'the selected date'}</strong> at{' '}
                <strong>{cancellingBooking.timeSlot}</strong>?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setCancellingBooking(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
                >
                  Yes, Cancel
                </button>
                </div>
            </>
          )}
        </Modal>
      </div>
    </div>
  )
}

export default Dashboard