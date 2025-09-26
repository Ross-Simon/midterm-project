import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import ProtectedRoute from '../components/ProtectedRoute'
import Home from '../pages/Home'
import SpaceDetail from '../pages/SpaceDetail'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/space/:spaceId" element={<SpaceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard/my-bookings" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter