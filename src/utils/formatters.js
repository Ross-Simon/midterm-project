export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) {
    return '₱0.00'
  }
  
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(amount)
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${period}`
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    case 'completed':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const fetchSpacesData = async () => {
  try {
    const response = await fetch('/spaces.json')
    if (!response.ok) {
      throw new Error('Failed to fetch spaces data')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching spaces:', error)
    return []
  }
}