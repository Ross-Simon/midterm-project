import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import BookingForm from '../components/BookingForm'
import { formatCurrency, fetchSpacesData } from '../utils/formatters'

const SpaceDetail = () => {
  const { spaceId } = useParams()
  const { isAuthenticated } = useAuth()
  const [space, setSpace] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadSpace = async () => {
      try {
        const spacesData = await fetchSpacesData()
        const foundSpace = spacesData.find(s => s.id === parseInt(spaceId))
        setSpace(foundSpace || null)
      } catch (error) {
        console.error('Failed to load space details:', error)
        setSpace(null)
      } finally {
        setIsLoading(false)
      }
    }
    loadSpace()
  }, [spaceId])

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (!space) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Space not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => navigate('/')} className="mb-6 text-green-600">← Back to Spaces</button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={space.main_image} 
                alt={space.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{space.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{space.location}</p>
                <p className="text-gray-700 mb-6">{space.description}</p>
                
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {space.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-gray-700">• {amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Booking Information</h3>
              <p className="text-2xl font-bold text-green-600 mb-4">
                {formatCurrency(space.price)}/session
              </p>
              <p className="text-gray-600 mb-4">Hours: {space.hours}</p>
              
              {isAuthenticated ? (
                <BookingForm space={space} />
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Please login to book this space</p>
                  <button onClick={() => navigate('/login')} className="bg-green-600 text-white px-4 py-2 rounded">
                    Login to Book
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpaceDetail