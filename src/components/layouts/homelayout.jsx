import React from 'react'
import customers from '/customers.svg'

const HomeLayout = ({ children }) => {
  return (
    <>
      {/* Background Layer */}
      <div
        id='container-landing'
        className='fixed top-0 left-0 w-full h-screen bg-[linear-gradient(247.81deg,_rgba(229,_179,_63,_0.9)_1.7%,_rgba(29,_169,_150,_0.9)_78.83%)] overflow-hidden -z-10'
      >
        {/* Background image - behind text */}
        <img
          src={customers}
          alt=''
          className='w-[80%] max-w-[700px] h-auto absolute bottom-0 left-1/2 -translate-x-1/2 opacity-90'
        />
      </div>

      {/* Scrollable Content Layer */}
      <div className='relative w-full h-screen overflow-y-auto z-20 '>
        {children}
      </div>
    </>
  )
}

export default HomeLayout
