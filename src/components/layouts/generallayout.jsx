import React from 'react'


const GeneralLayout = ({ children }) => {
  return (
    <>
      <div
        id='container-landing'
        className='relative h-screen w-screen bg-[linear-gradient(247.81deg,_rgba(229,_179,_63,_0.9)_1.7%,_rgba(29,_169,_150,_0.9)_78.83%)] overflow-hidden z-0'
      >
        <div className='h-screen w-screen bg-black opacity-40 pt-[4.7rem] pl-[4rem] '>
          <img
            src="customers.svg"
            alt='Logo'
            className='w-[48rem] h-full absolute bottom-0 mx-[20%]'
          />
        </div>
      </div>
      {/* Content placed above the background */}
      <div className='absolute top-0 left-0 w-full min-h-screen'>
        {children}
      </div>
    </>
  )
}

export default GeneralLayout
