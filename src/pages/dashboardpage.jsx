// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import GeneralLayout from '../components/layouts/generallayout'
import Modal from '../components/organisms/modal'
import { showAlert } from '../components/organisms/showalerts'
import { useAuth } from '../context/AuthContext'
import { useResultStore } from '../store/resultStore'
import { useUserStore } from '../store/userStore'
import { convertInvestmentData } from '../utils/general'
import { productData, success_ajukan } from '../utils/products'
import { Menu, X } from 'lucide-react'

export default function DashboardPage() {
  const [hovered, setHovered] = useState(null)
  const [open, setOpen] = useState(false)
  const [openAjukan, setOpenAjukan] = useState(false)
  const [selectedItem, setSelectedItem] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { logout } = useAuth()

  const [data, setData] = useState([])
  const { result } = useResultStore()
  const { user } = useUserStore()
  // const navigate = useNavigate()

  useEffect(() => {
    const mappingChart = convertInvestmentData(result.data.floored_percentages)
    setData(mappingChart)
  }, [])

  const handleSelectedCard = (item) => {
    setSelectedItem(item)
    setOpen(true)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <GeneralLayout>
      {/* Navbar */}
      <nav className='sticky top-0 bg-white shadow-md px-8 py-4 flex items-center justify-between z-20'>
        <div className='flex items-center gap-3'>
          <img src='/halalina_nocaption.svg' alt='Logo' className='w-10' />
          <span className='text-[#12B5A5] text-xl font-bold'>HALALINA</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6 text-sm font-medium'>
          <a
            href='/dashboard'
            className='text-gray-600 hover:font-bold hover:cursor-pointer'
          >
            Beranda
          </a>
          <a
            onClick={() => logout()}
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

        {/* Mobile Menu Toggle */}
        <div 
          onClick={toggleMobileMenu} 
          className='md:hidden cursor-pointer'
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div 
        className={`
          fixed top-0 left-0 w-[70%] h-full bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out z-30
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className='p-6'>
          {/* Mobile Menu Header */}
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-3'>
              <img src='/halalina_nocaption.svg' alt='Logo' className='w-10' />
              <span className='text-[#12B5A5] text-xl font-bold'>HALALINA</span>
            </div>
            <button 
              onClick={closeMobileMenu} 
              className='text-gray-600 hover:text-[#12B5A5]'
              aria-label='Close Menu'
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Menu Navigation Links */}
          <nav className='space-y-4'>
            <a
              href='/dashboard'
              onClick={closeMobileMenu}
              className='block text-gray-700 hover:bg-emerald-50 p-3 rounded-lg'
            >
              Beranda
            </a>
            <a
              onClick={() => {
                logout();
                closeMobileMenu();
              }}
              className='block text-gray-700 hover:bg-emerald-50 p-3 rounded-lg cursor-pointer'
            >
              Keluar
            </a>
          </nav>

          {/* Mobile User Profile */}
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
                {user.data.user_name ?? 'Nasabah'}
              </p>
              <p className='text-xs text-gray-500'>Pengguna</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className='fixed inset-0 bg-black opacity-50 z-20'
          onClick={closeMobileMenu}
        />
      )}

      <div className='px-8 py-8'>
        <h1 className='text-3xl font-bold text-white mb-1'>
          Halo,{' '}
          <span className='text-yellow-400'>{`${
            user.data.user_name ?? 'Nasabah'
          }! `}</span>
        </h1>
        <p className='text-white text-lg mb-6'>
          Kamu belum ada portofolio pembelian investasi syariah, yuk ajukan
          sekarang?
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left Recommendations */}
          <div>
            <div className='space-y-4'>
              {productData.map((item, i) => (
                <div className='flex' key={i}>
                  <div className='flex-shrink-0'>
                    <img
                      src={item.image}
                      className='h-full w-auto rounded-s-xl'
                      alt=''
                    />
                  </div>
                  <div className='bg-white rounded-e-xl p-4 flex flex-col'>
                    <h3 className='font-bold text-md mb-1'>{item.title}</h3>
                    <p className='text-sm text-gray-700 mb-1 line-clamp-2'>
                      {item.caption}
                    </p>
                    <a
                      onClick={() => handleSelectedCard(item)}
                      className='text-emerald-600 text-sm font-semibold underline mt-auto'
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
            <div className='w-full h-70'>
              <ResponsiveContainer width='100%' height='100%'>
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
                    label={({ name, value }) => `${value}%`}
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
                onClick={() => setOpenAjukan(true)}
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
        bgImage={selectedItem.image || null}
        onClose={() => setOpen(false)}
      />
      <Modal
        buttonText='Oke'
        open={openAjukan}
        data={success_ajukan}
        bgImage='success_ajukan.png'
        buttonCenter={true}
        onClose={() => setOpenAjukan(false)}
      />
    </GeneralLayout>
  )
}