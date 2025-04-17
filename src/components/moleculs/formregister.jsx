import React from 'react'
import ButtonPrimary from '../atoms/buttonprimary'
import InputField from '../atoms/inputfield'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { showAlert } from '../organisms/showalerts'
import Modal from '../organisms/modal'
import { tnc_data } from '../../utils/general'
import { Loader2 } from 'lucide-react'

const FormRegister = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [tnc, setTnc] = useState(false)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!tnc) {
      setError(
        'Untuk melanjutkan, wajib mengisi semua data dan menyetujui syarat & ketentuan.'
      )
      return
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password dan password tidak sesuai.')
      return
    }

    setLoading(true)
    const result = await register(
      {
        full_name: name,
        email,
        password,
        phone_number: phone,
      },
      showAlert
    )
    setLoading(false)

    if (!result.success) {
      setError(result.message)
      console.error(result.message)
    } else {
      setError(null)
    }
  }

  const handleCloseModal = () => {
    setTnc(true)
    setOpen(false)
  }

  return (
    <div className='flex justify-center lg:justify-end h-screen w-screen'>
      <div className='w-full lg:w-2/5 min-h-screen flex items-center bg-[#f9f6f3]  px-6 sm:px-10 sm: '>
        <form className='w-full py-8 flex flex-col gap-6 max-w-md mx-auto'>
          <div className='flex flex-col items-center'>
            <img
              src='/halalina.svg'
              className='w-[200px] sm:w-[240px] md:w-[275px] h-auto'
              alt='Logo Halalina'
            />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <div className='flex flex-col gap-4'>
            <InputField
              type='text'
              name='fullname'
              placeholder='Nama Lengkap'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            <InputField
              type='password'
              name='confirmPassword'
              placeholder='Konfirmasi Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <InputField
              type='number'
              name='phone'
              placeholder='Nomor Telepon'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className='flex gap-2'>
            <input
              className='border-[1.5px] border-[#E5E7EA]'
              type='checkbox'
              value={tnc}
              checked={tnc}
              onChange={(e) => setTnc(e.target.checked)}
            />
            <p className='text-[10px]'>
              Saya telah memahami dan menyetujui segala
              <Link
                className='text-[#136A5E] underline ml-1'
                onClick={() => setOpen(true)}
              >
                persyaratan dan kondisi
              </Link>
            </p>
          </div>

          <div className='flex flex-col gap-4 mt-6'>
            <ButtonPrimary onClick={(e) => handleRegister(e)}>
              {loading ? (
                <Loader2 className='mx-auto h-5 w-5 animate-spin' />
              ) : (
                'Daftar'
              )}
            </ButtonPrimary>
            <p className='text-center text-sm'>
              sudah mempunyai akun?
              <Link to='/login' className='text-[#136A5E] underline ml-1'>
                Masuk
              </Link>
            </p>
          </div>
        </form>
      </div>
      {/* Modal */}
      <Modal
        buttonText='Setuju'
        open={open}
        data={tnc_data}
        onClose={() => handleCloseModal()}
      />
    </div>
  )
}

export default FormRegister
