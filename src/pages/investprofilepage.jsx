import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import HomeLayout from '../components/layouts/homelayout'
import { investProfile } from '../utils/profiles'

const data = [
  { name: 'BSI Deposito', value: 40, color: '#FFA726' },
  { name: 'Tabungan Emas', value: 30, color: '#FFEB3B' },
  { name: 'SBSN', value: 20, color: '#26A69A' },
  { name: 'Reksadana Pasar Uang Syariah', value: 10, color: '#00ACC1' },
]

export default function InvestProfilePage() {
  const [hovered, setHovered] = useState(null)

  return (
    <HomeLayout>
      <div className='flex flex-col min-h-screen items-center justify-center rounded-xl px-15'>
        <div className='flex flex-col items-end w-full md:flex-row gap-10'>
          {/* Left Box */}
          <div className='flex-1'>
            <div className='bg-white rounded-xl p-6 shadow'>
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-4'>
                  {/* <span className='text-4xl'>🐎</span> */}
                  <img
                    src={investProfile[0].img}
                    alt='profile-logo'
                    className='w-20 h-auto'
                  />
                  <div>
                    <h2 className='text-lg font-bold leading-snug'>
                      {investProfile[0].title}
                    </h2>
                  </div>
                </div>
                <div className='text-center'>
                  <span className='text-gray-500 block mb-1 text-[0.75rem] mb-2'>
                    Jenis Profile Resiko
                  </span>
                  <span
                    className={`font-semibold px-8 py-2 rounded-full text-md ${
                      investProfile[0].name === 'Moderate'
                        ? 'bg-emerald-100 text-emerald-700'
                        : investProfile[0].name === 'Agresif'
                        ? 'text-[#A72814] bg-[#FFF1EF]'
                        : 'text-[#866724] bg-[#FFF1EF]'
                    }`}
                  >
                    {investProfile[0].name}
                  </span>
                </div>
              </div>
              <p className='text-sm text-gray-700 leading-relaxed'>
                {investProfile[0].description}
              </p>
            </div>
          </div>

          {/* Right Box with Chart */}
          <div className='flex-1'>
            <div className='bg-white rounded-xl p-6 shadow h-full flex flex-col justify-between'>
              <div>
                <h3 className='text-lg font-semibold mb-4'>
                  Portofolio Rekomendasi
                </h3>
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
              </div>
            </div>
          </div>
        </div>
        <button className='bg-[#1DA996] hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow mt-10 px-5 w-fit self-end'>
          Mulai Investasi
        </button>
      </div>
    </HomeLayout>
  )
}
