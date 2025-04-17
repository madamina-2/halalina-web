// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import GeneralLayout from '../components/layouts/generallayout'
import Modal from '../components/organisms/modal'
import { useAuth } from '../context/AuthContext'
import { useResultStore } from '../store/resultStore'
import { convertInvestmentData } from '../utils/general'
import { productData } from '../utils/products'
import { showAlert } from '../components/organisms/showalerts'
export default function DashboardPage() {
  const [hovered, setHovered] = useState(null)
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState([])

  const { logout } = useAuth()

  const [data, setData] = useState([])
  const { result } = useResultStore()
  // const navigate = useNavigate()

  useEffect(() => {
    const mappingChart = convertInvestmentData(result.data.floored_percentages)
    setData(mappingChart)
  }, [])

  const handleSelectedCard = (item) => {
    setSelectedItem(item)
    setOpen(true)
  }

  const handleShowAlert = () => {
    showAlert('Selamat!', 'OK', null)
  }

  return (
    <GeneralLayout>
      {/* Navbar */}
      <nav className='sticky top-0 bg-white shadow-md px-8 py-4 flex items-center justify-between z-20'>
        <div className='flex items-center gap-3'>
          <img src='/halalina_nocaption.svg' alt='Logo' className='w-10' />
          <span className='text-[#12B5A5] text-xl font-bold'>HALALINA</span>
        </div>
        <div className='flex items-center gap-6 text-sm font-medium'>
          <a
            href='/dashboard'
            className='text-gray-600 hover:font-bold hover:cursor-pointer text-[#12B5A5]-800'
          >
            Beranda
          </a>
          <a
            onClick={() => logout()}
            className='text-gray-600 hover:font-bold hover:cursor-pointer text-[#12B5A5]-800'
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
      </nav>

      <div className='px-8 py-8'>
        <h1 className='text-3xl font-bold text-white mb-1'>
          Halo, <span className='text-yellow-400'>Madam Ina!</span>
        </h1>
        <p className='text-white text-lg mb-6'>
          Kamu belum ada portofolio pembelian investasi syariah, yuk ajukan
          sekarang?
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left Recommendations */}
          <div>
            <div className='max-h-[65vh] overflow-y-auto space-y-4'>
              {productData.map((item, i) => (
                <div
                  key={i}
                  className='rounded-lg shadow flex items-start gap-4'
                >
                  <div className='w-20 h-20 bg-gray-200 rounded-lg'>
                    <img src={item.image} alt='Logo' className='w-20 h-20' />
                  </div>
                  <div className='bg-white p-4 rounded-lg'>
                    <h3 className='font-bold text-md mb-1'>{item.title}</h3>
                    <p className='text-sm text-gray-700 mb-1 line-clamp-2'>
                      {item.caption}
                    </p>
                    <a
                      onClick={() => handleSelectedCard(item)}
                      className='text-emerald-600 text-sm font-semibold underline'
                    >
                      Baca Selengkapnya
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Chart Section */}
          <div className='bg-white rounded-xl p-6 shadow flex flex-col justify-between'>
            <h3 className='text-lg font-semibold mb-2'>
              Portofolio Rekomendasi
            </h3>
            <div className='w-full h-64 m-5'>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={100}
                    innerRadius={70}
                    // onMouseEnter={(_, index) => setHovered(index)}
                    // onMouseLeave={() => setHovered(null)}
                    label={({ name, value }) => `${value}%`} // 👈 ini kuncinya
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={hovered === index ? '#000' : '#fff'}
                        strokeWidth={hovered === index ? 2 : 1}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className='flex justify-between'>
              <div className='grid grid-cols-2 gap-2 text-sm mt-2'>
                {data.map((entry, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span>{entry.name}</span>
                  </div>
                ))}
              </div>
              <button
                className='self-end bg-[#1DA996] hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow mt-4'
                onClick={() => handleShowAlert()}
              >
                Ajukan
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal
        buttonText='Oke'
        open={open}
        data={selectedItem}
        bgImage={selectedItem?.image || null}
        onClose={() => setOpen(false)}
      />
    </GeneralLayout>
  )
}
