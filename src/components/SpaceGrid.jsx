import SpaceCard from './SpaceCard'

const SpaceGrid = ({ spaces }) => {
  if (spaces.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600">No spaces found matching your search.</h3>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {spaces.map(space => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </div>
  )
}

export default SpaceGrid