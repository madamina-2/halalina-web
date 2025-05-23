import { Home, Wallet, Menu, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../../components/atoms/buttonprimary'
import InputField from '../../components/atoms/inputfield'
import GeneralLayout from '../../components/layouts/generallayout'
import { showAlert } from '../../components/organisms/showalerts'
import {
  createUserProfile,
  fetchJobType,
  fetchUserProfile,
  predictUserProfile,
} from '../../services/userService'
import { useUserStore } from '../../store/userStore'
import { useResultStore } from '../../store/resultStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatRupiahInput, handleChangeOnlyDigit } from '../../utils/general'
import { useAuth } from '../../context/AuthContext'
import { Loader2 } from 'lucide-react'

const Profiling = () => {
  const [age, setAge] = React.useState('')
  const [balance, setBalance] = React.useState('')
  const [loan, setLoan] = useState([])
  const [jobType, setjobType] = useState([])
  const [ageGroup, setAgeGroup] = useState(null)
  const [marital, setMarital] = useState(null)
  const [job, setJob] = useState(null)
  const { setUser, user } = useUserStore()
  const { setResult } = useResultStore()
  const navigate = useNavigate()
  const location = useLocation()
  const { userName, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    const init = async () => {
      try {
        let jobData = await fetchJobType(token)
        setjobType(jobData.job_types)
      } catch (error) {
        const msg = error.response?.data?.message || 'Something went wrong'
        showAlert(`Oop! ${msg}`, 'OK', navigate('/login'))
      }
    }
    init()
  }, [])

  const handleAgeChange = (e) => {
    const value = e.target.value
    if (/^\d{0,2}$/.test(value)) {
      setAge(value)
    }
    setAgeGroup(getGeneration(value))
  }

  const getGeneration = (age) => {
    if (age < 30) {
      return 'gen_Z'
    } else if (age >= 30 && age < 40) {
      return 'millennials'
    } else {
      return 'gen_X'
    }
  }

  const handleGetPredict = async (e) => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem('token')
    try {
      setError('')

      const profileData = {
        job_type_id: Number(job),
        married: marital,
        debt_type: loan,
        account_balance: Number(balance),
        age_group: ageGroup,
      }

      await createUserProfile(token, profileData)
      const profile = await fetchUserProfile(token)
      setUser(profile)

      const predictResponse = await predictUserProfile(token)
      setResult(predictResponse)

      setLoading(false)
      navigate('/invest-profile')
    } catch (error) {
      setLoading(false)
      setError(
        error.response?.data?.message ||
          error.response?.data?.msg ||
          error.message
      )
      console.error('Error:', error)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <GeneralLayout>
      {/* Navbar */}
      <nav className='sticky left-0 top-0 bg-white shadow-md px-8 py-4 flex items-center justify-between z-20'>
        <div className='flex items-center gap-3'>
          <img src='/halalina_nocaption.svg' alt='Logo' className='w-10' />
          <span className='text-[#12B5A5] text-xl font-bold'>HALALINA</span>
        </div>

        <div className='hidden md:flex items-center gap-6 text-sm font-medium'>
          <a
            onClick={handleLogout}
            className='text-gray-600 hover:font-bold hover:cursor-pointer'
          >
            Keluar
          </a>
          <div className='w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-5 h-5 text-emerald-700'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.25a8.25 8.25 0 0115 0'
              />
            </svg>
          </div>
        </div>

        <div onClick={toggleMobileMenu} className='md:hidden cursor-pointer'>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 left-0 w-[70%] h-full bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out z-30
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className='p-6'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-3'>
              <img src='/halalina_nocaption.svg' alt='Logo' className='w-10' />
              <span className='text-[#12B5A5] text-xl font-bold'>HALALINA</span>
            </div>
            <button
              onClick={closeMobileMenu}
              className='text-gray-600 hover:text-[#12B5A5]'
            >
              <X size={24} />
            </button>
          </div>

          <nav className='space-y-4'>
            <a
              onClick={() => {
                handleLogout()
                closeMobileMenu()
              }}
              className='block text-gray-700 hover:bg-emerald-50 p-3 rounded-lg cursor-pointer'
            >
              Keluar
            </a>
          </nav>

          <div className='mt-8 flex items-center gap-4 bg-emerald-50 p-4 rounded-lg'>
            <div className='w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6 text-emerald-700'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.25a8.25 8.25 0 0115 0'
                />
              </svg>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-700'>
                {userName ?? 'Nasabah'}
              </p>
              <p className='text-xs text-gray-500'>Pengguna</p>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-20'
          onClick={closeMobileMenu}
        />
      )}

      {/* Main Content */}
      <div className='fixed mt-10 inset-0 flex items-center justify-center min-h-screen px-4 mx-auto'>
        <div className='bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full md:max-w-4xl z-10 flex flex-col gap-4'>
          <div className='flex flex-col items-center gap-2'>
            <img src='halalina.svg' alt='' className='h-[60px]' />
            <div className='text-center'>
              <h1 className='font-semibold sm:text-xl md:text-2xl'>
                Hai, {userName ?? 'Pengguna'}! Bantu kami kenal kamu lebih dekat
                yuk!
              </h1>
              <p className='text-[#434343] text-[10px] mt-1'>
                Yuk, isi profilmu untuk dapat rekomendasi investasi syariah yang
                sesuai!
              </p>
              {error && <p className='text-red-500 text-sm'>{error}</p>}
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-8 mt-2 overflow-auto'>
            <div className='w-full lg:w-1/2 flex flex-col gap-3'>
              <div>
                <label className='label-text mb-1 md:text-[16px] sm:text-[14px] text-[10px]'>
                  Apa tipe pekerjaan mu? <span className='text-red-500'>*</span>
                </label>
                <select
                  className='border text-field border-gray-300 rounded-md px-2 py-1 w-full cursor-pointer'
                  onChange={(e) => setJob(e.target.value)}
                >
                  <option value={null}>Pilih Tipe Pekerjaan</option>
                  {jobType.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label_id}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='label-text mb-1 md:text-[16px] sm:text-[14px] text-[10px]'>
                  Berapa umur kamu? <span className='text-red-500'>*</span>
                </label>
                <InputField
                  type='text'
                  name='age'
                  placeholder='Umur'
                  value={age}
                  onChange={handleAgeChange}
                  className='text-field '
                />
              </div>

              <div>
                <label className='label-text mb-1 md:text-[16px] sm:text-[14px] text-[10px]'>
                  Berapa jumlah saldo di tabungan kamu?{' '}
                  <span className='text-red-500'>*</span>
                </label>
                <InputField
                  type='text'
                  name='balance'
                  placeholder='Jumlah Saldo Tabungan'
                  value={formatRupiahInput(balance)}
                  onChange={(e) =>
                    setBalance(handleChangeOnlyDigit(e.target.value))
                  }
                  className='text-field '
                />
              </div>
            </div>

            <div className='w-full lg:w-1/2 flex flex-col gap-3'>
              <div>
                <label className='label-text mb-1 md:text-[16px] sm:text-[14px] text-[10px] '>
                  Apa kamu sudah menikah?{' '}
                  <span className='text-red-500'>*</span>
                </label>
                <select
                  className='text-field border border-gray-300 rounded-md px-2 py-1 w-full text-sm cursor-pointer'
                  onChange={(e) => setMarital(e.target.value)}
                >
                  <option value={null}>Status</option>
                  <option value='single'>Belum Menikah</option>
                  <option value='married'>Menikah</option>
                </select>
              </div>

              <div>
                <label className='label-text mb-1 md:text-[16px] sm:text-[14px] text-[10px]'>
                  Apakah kamu mempunyai pinjaman?
                </label>
                <p className='text-[10px] text-gray-500 mb-1'>
                  Abaikan jika tidak punya pinjaman
                </p>
                <ul className='space-y-2'>
                  {['Housing', 'Loan'].map((type) => (
                    <li
                      key={type}
                      className='flex justify-between items-center'
                      onClick={() =>
                        setLoan((prev) =>
                          prev.includes(type)
                            ? prev.filter((item) => item !== type)
                            : [...prev, type]
                        )
                      }
                    >
                      <div className='flex gap-2 items-center cursor-pointer '>
                        {type === 'Housing' ? (
                          <Home size={16} color='#12B5A5' />
                        ) : (
                          <Wallet size={16} color='#12B5A5' />
                        )}
                        <span className='md:text-[16px] sm:text-[14px] text-[10px] '>
                          {type === 'Housing' ? 'KPR' : 'Pinjaman'}
                        </span>
                      </div>

                      <input
                        type='checkbox'
                        className='border-[1.5px] border-[#12B5A5] cursor-pointer '
                        checked={loan.includes(type)}
                        onChange={() => {}}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className='text-[10px] text-gray-500'>
                  <span className='text-red-500'>*</span>Wajib diisi
                </p>
              </div>
            </div>
          </div>

          <div className='mt-3'>
            <ButtonPrimary onClick={handleGetPredict}>
              {loading ? (
                <Loader2 className='mx-auto h-5 w-5 animate-spin' />
              ) : (
                'Temukan Rekomendasi Investasi Saya!'
              )}
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default Profiling
