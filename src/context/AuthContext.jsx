import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/general'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const login = async (email, password, showAlert) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )

      localStorage.setItem('token', response.data.data.access_token)
      localStorage.setItem('refresh_token', response.data.data.refresh_token)
      setIsAuthenticated(true)

      showAlert(`${response.data.message}`, 'OK', () => navigate('/dashboard'))

      return { success: true }
    } catch (error) {
      // ⛔ Check for 401 Unauthorized
      if (error.response?.status === 401) {
        showAlert('Unauthorized. Please login again.', 'OK', logout)
        return { success: false, message: 'Unauthorized' }
      }

      return {
        success: false,
        message: error.response?.data?.message || error.message,
      }
    }
  }

  // Inside AuthProvider
  const register = async (data, showAlert) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/register`,
        {
          full_name: data.full_name,
          email: data.email,
          password: data.password,
          phone_number: data.phone_number,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      localStorage.setItem('token', response.data.data.access_token)
      localStorage.setItem('refresh_token', response.data.data.refresh_token)

      showAlert(`${response?.data?.message}.`, 'OK', () => navigate('/profiling'))

      return { success: true }
    } catch (error) {
      // Handle 401 as before
      if (error.response?.status === 401) {
        showAlert('Unauthorized. Please login again.', 'OK', logout)
        return { success: false, message: 'Unauthorized' }
      }

      return {
        success: false,
        message: error.response?.data?.message || error.message,
      }
    }
  }

  const logout = async () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
