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
  const { setUser, clearUser } = useUserStore()
  const [userName, setUserName] = useState(null)

  // On component mount, check if userName exists in localStorage
  useEffect(() => {
    const savedUserName = localStorage.getItem('user_name')
    if (savedUserName) {
      setUserName(savedUserName) // Set the userName from localStorage if available
    }
  }, [])

  const login = async (email, password, showAlert) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )

      const token = response.data.data.access_token
      const refreshToken = response.data.data.refresh_token
      const user_name = response.data.data?.user_name

      localStorage.setItem('token', token)
      localStorage.setItem('refresh_token', refreshToken)
      localStorage.setItem('user_name', user_name)
      setIsAuthenticated(true)
      setUserName(user_name)

      // 🧠 Proceed to get user profile and prediction logic
      handleGetProfile(token, user_name)

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
      localStorage.setItem('user_name', response?.data?.data?.user_name)

      setUserName(response?.data?.data?.user_name)

      showAlert(`${response?.data?.message}.`, 'OK', () =>
        navigate('/profiling', {
          state: response?.data?.data?.user_name || 'Nasabah!',
        })
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
    setUserName(null) 
    localStorage.clear()
    navigate('/login')
  }

  const handleGetProfile = async (token, user_name) => {
    try {
      // 🔍 Try to get user profile
      const profile = await fetchUserProfile(token)
      setUser(profile)

      // 🧠 If successful, get prediction
      const predictResponse = await predictUserProfile(token)
      setResult(predictResponse)

      navigate('/invest-profile')
    } catch (error) {
      if (error.response?.data?.message === 'Profil tidak ditemukan') {
        // 🚧 User has no profile → redirect to profiling
        navigate('/profiling', {
          state: user_name || 'Nasabah!',
        })
      } else {
        console.error('Error fetching user profile:', error)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName,login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)