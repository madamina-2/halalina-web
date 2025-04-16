// src/pages/DashboardPage.jsx
import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import GeneralLayout from '../components/layouts/generallayout'

const data = [
  { name: 'Deposito', value: 40, color: '#FFA726' },
  { name: 'Tabungan Emas', value: 30, color: '#FFEB3B' },
  { name: 'SBSN', value: 20, color: '#26A69A' },
  { name: 'Reksadana Syariah', value: 10, color: '#00ACC1' },
]

export default function DashboardPage() {
  const [hovered, setHovered] = useState(null)

  return (
    <GeneralLayout>
      {/* Navbar */}
      <nav className='bg-white shadow-md px-8 py-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img
            src='/assets/halalina_nocaption.svg'
            alt='Logo'
            className='w-10 h-10'
          />
          <span className='text-emerald-600 text-xl font-bold'>HALALINA</span>
        </div>
        <div className='flex items-center gap-6 text-sm font-medium'>
          <a href='#' className='text-emerald-600'>
            Beranda
          </a>
          <a href='#' className='text-gray-700'>
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

      <div className='px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Left Recommendations */}
        <div>
          <h1 className='text-3xl font-bold text-white mb-1'>
            Halo, <span className='text-yellow-400'>Madam Ina!</span>
          </h1>
          <p className='text-white text-lg mb-6'>
            Kamu belum ada portofolio pembelian investasi syariah, yuk ajukan
            sekarang?
          </p>

          <div className='space-y-4'>
            {[
              {
                title: 'BSI Deposito',
                description:
                  'Produk simpanan berjangka oleh bank dengan imbal hasil tetap... cocok untuk Anda yang mengutamakan keamanan.',
              },
              {
                title: 'Tabungan Emas',
                description:
                  'Investasi cocok bagi Anda yang menginginkan imbal hasil tinggi... potensi keuntungan menarik.',
              },
              {
                title: 'SBSN (Surat Berharga Syariah Negara)',
                description:
                  'SBSN adalah instrumen investasi berbasis syariah yang diterbitkan pemerintah Indonesia.',
              },
              {
                title: 'Reksadana Pasar Uang Syariah',
                description:
                  'Bagi Anda yang mencari investasi yang mudah dicairkan... risiko rendah dan dikelola oleh manajer investasi profesional.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className='bg-white p-4 rounded-lg shadow flex items-start gap-4'
              >
                <div className='w-20 h-20 bg-gray-200 rounded-lg'></div>
                <div>
                  <h3 className='font-bold text-md mb-1'>{item.title}</h3>
                  <p className='text-sm text-gray-700 mb-1 line-clamp-2'>
                    {item.description}
                  </p>
                  <a
                    href='#'
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
          <h3 className='text-lg font-semibold mb-4'>Portofolio Rekomendasi</h3>
          <div className='w-full h-64'>
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
                  onMouseEnter={(_, index) => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
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
          <div className='grid grid-cols-2 gap-2 mt-4 text-sm'>
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
          <button className='self-end bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow mt-6'>
            Ajukan
          </button>
        </div>
      </div>
    </GeneralLayout>
  )
}
