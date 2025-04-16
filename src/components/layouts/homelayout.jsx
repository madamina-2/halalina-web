import React from 'react'
import customers from '/customers.svg'

const HomeLayout = ({ children }) => {
  return (
    <>
      <div
        id='container-landing'
        className='relative h-screen w-screen bg-[linear-gradient(247.81deg,_rgba(229,_179,_63,_0.9)_1.7%,_rgba(29,_169,_150,_0.9)_78.83%)] overflow-hidden z-0'
      >
        <div className='h-screen w-screen bg-black opacity-10 pt-[4.7rem] pl-[4rem] '>
          <h1 className='text-white font-medium text-[3rem] leading-[100%] tracking-[0%] font-inter'>
            Permudah perjalanan
          </h1>

          <h1 className='font-extrabold text-[4rem] leading-[100%] tracking-[0%] font-inter text-[#FFD573] pl-[6.75rem]'>
            Investasi Syariah<span className='text-white'>mu!</span>
          </h1>

          <img
            src={customers}
            alt='Logo'
            className='w-[48rem] h-auto absolute bottom-0 mx-[20%]'
          />
        </div>
      </div>
      {/* Content placed above the background */}
      <div className='absolute top-0 left-0 w-[100%] h-[100%]'>{children}</div>
    </>
  )
}

export default HomeLayout
