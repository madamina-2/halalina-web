import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { fetchUserProfile, predictUserProfile } from '../services/userService'
import { useResultStore } from '../store/resultStore'
import { useUserStore } from '../store/userStore'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()
  const { setResult, clearResult } = useResultStore()
  const { clearUser } = useUserStore()

  const login = async (email, password, showAlert) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )

      const token = response.data.data.access_token
      const refreshToken = response.data.data.refresh_token

      localStorage.setItem('token', token)
      localStorage.setItem('refresh_token', refreshToken)
      setIsAuthenticated(true)

      // 🧠 Proceed to get user profile and prediction logic
      handleGetProfile(token)

      return { success: true }
    } catch (error) {
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

      showAlert(`${response?.data?.message}.`, 'OK', () =>
        navigate('/profiling')
      )

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
    clearResult()
    clearUser()
    localStorage.clear()
    navigate('/login')
  }

  const handleGetProfile = async (token) => {
    try {
      // 🔍 Try to get user profile
      const profile = await fetchUserProfile(token)

      // 🧠 If successful, get prediction
      const predictResponse = await predictUserProfile(token)
      setResult(predictResponse)

      navigate('/invest-profile')
    } catch (error) {
      if (error.response?.data?.message === 'Profil tidak ditemukan') {
        // 🚧 User has no profile → redirect to profiling
        navigate('/profiling')
      } else {
        console.error('Error fetching user profile:', error)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
