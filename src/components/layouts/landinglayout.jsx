import React from 'react'


const LandingLayout = ({ children }) => {
  return (
    <>
      <div
        id='container-landing'
        className='relative h-screen w-screen bg-[linear-gradient(247.81deg,_rgba(229,_179,_63,_0.9)_1.7%,_rgba(29,_169,_150,_0.9)_78.83%)] pt-[4.7rem] pl-[4rem] overflow-hidden z-0'
      >
       <h1 className='text-white font-medium max-sm:hidden lg:text-[3rem] text-xl leading-[100%] tracking-[0%] font-inter'>
      Permudah perjalanan
      </h1>

        <h1 className='font-extrabold max-sm:hidden lg:text-[4rem] text-2xl leading-[100%] tracking-[0%] font-inter text-[#FFD573] pl-[6.75rem]'>
        Investasi Syariah<span className='text-white'>mu!</span>
        </h1>

        <img
          src="customers.svg"
          alt='Logo'
          className='w-[48rem] h-auto absolute bottom-0 max-lg:w-[30rem] max-sm:hidden'
        />
      </div>
      {/* Content placed above the background */}
      <div className='absolute top-0 left-0 w-[100%] h-[100%]'>{children}</div>
    </>
  )
}

export default LandingLayout
