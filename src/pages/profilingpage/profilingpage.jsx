import { Home, Wallet } from 'lucide-react'
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
import { useNavigate } from 'react-router-dom'
import { formatRupiahInput, handleChangeOnlyDigit } from '../../utils/general'

const Profiling = () => {
  const [age, setAge] = React.useState('')
  const [balance, setBalance] = React.useState('')
  const [loan, setLoan] = useState([])
  const [jobType, setjobType] = useState([])
  const [ageGroup, setAgeGroup] = useState(null)
  const [marital, setMarital] = useState(null)
  const [job, setJob] = useState(null)
  const { setUser } = useUserStore()
  const { setResult } = useResultStore()
  const [amount, setAmount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    const init = async () => {
      try {
        let jobData = await fetchJobType(token)
        setjobType(jobData.job_types)
      } catch (error) {
        const msg = error.response?.data?.message || 'Something went wrong'
        const status = error?.response?.status
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
    const token = localStorage.getItem('token')
    try {
      const profileData = {
        job_type_id: Number(job),
        married: marital,
        debt_type: loan,
        account_balance: Number(balance),
        age_group: ageGroup,
      }
      // console.log(profileData)

      // 1. Create user profile
      const createResponse = await createUserProfile(token, profileData)

      const profile = await fetchUserProfile(token)
      setUser(profile)

      // 2. Predict user profile
      const predictResponse = await predictUserProfile(token)
      setResult(predictResponse)

      // Optional: set prediction to state or navigate
      // setPrediction(predictResponse)
      navigate('/invest-profile')
    } catch (error) {
      console.error('Error:', error)
    } finally {
    }
  }

  return (
    <GeneralLayout>
      <div className='fixed inset-0 flex items-center justify-center min-h-screen px-4'>
        <div className='bg-white p-4 sm:p-6 rounded-xl shadow-lg  w-[50%] w-full md:max-w-4xl z-10 flex flex-col gap-4'>
          {/* Logo + Heading */}
          <div className='flex flex-col items-center gap-2'>
            <img src='halalina.svg' alt='' className='h-[60px]' />
            <div className='text-center'>
              <h1 className='font-semibold text-xl sm:text-2xl'>
                Bantu kami kenal kamu lebih dekat yuk!
              </h1>
              <p className='text-[#434343] text-[10px] mt-1'>
                Yuk, isi profilmu untuk dapat rekomendasi investasi syariah yang
                sesuai!
              </p>
            </div>
          </div>

          {/* Form Input Section */}
          <div className='flex flex-col lg:flex-row  gap-8  mt-2 overflow-auto'>
            {/* Left Side */}
            <div className='w-full lg:w-1/2 flex flex-col gap-3'>
              <div>
                <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                  Apa tipe pekerjaan mu?
                </label>
                <select
                  className='border text-field border-gray-300 rounded-md px-2 py-1 w-full text-sm'
                  onChange={(e) => setJob(e.target.value)}
                >
                  <option value={null}>Pilih Tipe Pekerjaan</option>
                  {jobType &&
                    jobType.map((item) => (
                      <option value={item.id}>{item.label_id}</option>
                    ))}
                </select>
              </div>

              <div>
                <label className='block text-[10px] font-medium mb-1 mt-1'>
                  Berapa umur kamu?
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
                <label className='block text-[10px] font-medium text-gray-700 mb-1 mt-1'>
                  Berapa jumlah saldo di tabungan kamu?
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

            {/* Right Side */}
            <div className='w-full lg:w-1/2 flex flex-col  gap-3'>
              <div>
                <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                  Apa kamu sudah menikah?
                </label>
                <select
                  className='text-field border border-gray-300 rounded-md px-2 py-1 w-full text-sm'
                  onChange={(e) => setMarital(e.target.value)}
                >
                  <option value={null}>Status</option>
                  <option value='single'>Single</option>
                  <option value='married'>Married</option>
                </select>
              </div>

              <div className='text-start'>
                <label className='block text-[10px] font-medium text-gray-700 mb-1 mt-1'>
                  Apakah kamu mempunya pinjaman?
                </label>
                <p className='text-[8px] text-gray-500 mb-1'>
                  Abaikan jika tidak punya pinjaman
                </p>
                <ul className='space-y-2'>
                  <li className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                      <Home size={16} />
                      <span className='text-sm'>KPR</span>
                    </div>
                    <input
                      type='checkbox'
                      className='border-[1.5px] border-[#12B5A5]'
                      onChange={(e) => {
                        if (e.target.checked) {
                          setLoan([...loan, 'Housing']) // tambahkan
                        } else {
                          setLoan(loan.filter((item) => item !== 'Housing')) // hapus jika uncheck
                        }
                      }}
                    />
                  </li>

                  <li className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                      <Wallet size={16} />
                      <span className='text-sm'>Pinjaman</span>
                    </div>
                    <input
                      type='checkbox'
                      className='border-[1.5px] border-[#12B5A5]'
                      onChange={(e) => {
                        if (e.target.checked) {
                          setLoan([...loan, 'Loan'])
                        } else {
                          setLoan(loan.filter((item) => item !== 'Loan'))
                        }
                      }}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className='mt-3'>
            <ButtonPrimary onClick={(e) => handleGetPredict(e)}>
              Temukan Rekomendasi Investasi Saya!
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default Profiling
