import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../utils/formatters'

const SpaceCard = ({ space }) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/space/${space.id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={space.main_image} 
        alt={space.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{space.name}</h3>
          <div className="flex items-center">
            <svg className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="ml-1 text-sm text-gray-600">4.5</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-2">{space.location}</p>
        <p className="text-gray-700 mb-4 overflow-hidden line-clamp-2">
          {space.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            {formatCurrency(space.price)}/session
          </span>
          <button
            onClick={handleViewDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default SpaceCard