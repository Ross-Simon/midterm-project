import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../utils/formatters'

const SpaceCard = ({ space }) => { // Props a space object that contains details about the study spot
  const navigate = useNavigate() 

  const handleViewDetails = () => { 
    navigate(`/space/${space.id}`) // Navigate to the space detail page based on space ID
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
        </div>
        
        <p className="text-gray-600 mb-2">{space.location}</p>
        <p className="text-gray-700 mb-4 overflow-hidden line-clamp-2">
          {space.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">
            {formatCurrency(space.price)}/Session
          </span>
          <button
            onClick={handleViewDetails}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default SpaceCard