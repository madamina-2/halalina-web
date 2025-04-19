import React, { useEffect } from 'react'
import { useState } from 'react'
import InputField from '../atoms/inputfield'
import ButtonPrimary from '../atoms/buttonprimary'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { showAlert } from '../organisms/showalerts'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const FormLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(email, password, showAlert)
    setLoading(false)

    if (!result.success) {
      setLoading(false)

      setError(result.message)
      console.error(result.message)
    }
  }

  return (
    <div className='flex justify-center lg:justify-end h-screen w-screen'>
      <div className='w-full lg:w-2/5 min-h-screen flex items-center bg-[#f9f6f3]  px-6 sm:px-10 sm: '>
        <form className='w-full py-8 flex flex-col gap-6 max-w-md mx-auto'>
          <div className='flex flex-col items-center'>
            <img
              src='halalina.svg'
              className='w-[200px] sm:w-[240px] md:w-[275px] h-auto'
              alt='Logo Halalina'
            />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <div className='flex flex-col gap-4'>
            <InputField
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-4 mt-6'>
            <ButtonPrimary onClick={(e) => handleLogin(e)}>
              {loading ? (
                <Loader2 className='mx-auto h-5 w-5 animate-spin' />
              ) : (
                'Masuk'
              )}
            </ButtonPrimary>
            <p className='text-center text-sm'>
              Belum punya akun?
              <Link to='/register' className='text-[#136A5E] underline ml-1'>
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormLogin
