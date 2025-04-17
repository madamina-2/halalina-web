import React from 'react'

const ButtonPrimary = ({ type, onClick, children, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#12B5A5] w-full py-1 px-8 rounded-md text-white ${className}`}
    >
      {children}
    </button>
  )
}

export default ButtonPrimary
