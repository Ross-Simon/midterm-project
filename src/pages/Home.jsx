import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import SpaceGrid from '../components/SpaceGrid'
import { fetchSpacesData } from '../utils/formatters'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [spaces, setSpaces] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch spaces data from public/spaces.json
    const loadSpaces = async () => {
      try {
        const spacesData = await fetchSpacesData()
        setSpaces(spacesData)
      } catch (error) {
        console.error('Failed to load spaces:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadSpaces()
  }, [])

  // Filter spaces based on search term
  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    space.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading spaces...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Find Your Perfect Study Space
          </h1>
          <p className="text-xl text-blue-100">
            Discover and book co-working spaces and study hubs across the Philippines
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <SpaceGrid spaces={filteredSpaces} />
      </div>
    </div>
  )
}

export default Home