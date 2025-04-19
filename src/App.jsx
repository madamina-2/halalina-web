import './App.css'
import { Route, Routes } from 'react-router-dom'
import Loginpage from './pages/loginpage/loginpage'
import RegisterPage from './pages/registerpage/registerpage'
import DashboardPage from './pages/dashboardpage'
import LandingPage from './pages/landingpage'
import PrivateRoute from './routes/PrivateRoute'
import InvestProfilePage from './pages/investprofilepage'
import Profiling from './pages/profilingpage/profilingpage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Loginpage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path='/profiling'
        element={
          <PrivateRoute>
            <Profiling />
          </PrivateRoute>
        }
      />
      <Route
        path='/invest-profile'
        element={
          <PrivateRoute>
            <InvestProfilePage />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App
