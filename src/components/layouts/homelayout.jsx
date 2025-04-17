import React from 'react'
import customers from '/customers.svg'

const HomeLayout = ({ children }) => {
  return (
    <>
      <div
        id='container-landing'
        className='relative h-screen w-screen bg-[linear-gradient(247.81deg,_rgba(229,_179,_63,_0.9)_1.7%,_rgba(29,_169,_150,_0.9)_78.83%)] overflow-hidden'
      >
        {/* Background image - behind text */}
        <img
          src={customers}
          alt='Logo'
          className='w-[80%] max-w-[700px] h-auto absolute bottom-0 left-1/2 -translate-x-1/2 z-0 opacity-90'
        />
      </div>

      {/* Content placed above everything */}
      <div className='absolute top-0 left-0 w-full h-full z-20'>{children}</div>
    </>
  )
}

export default HomeLayout
