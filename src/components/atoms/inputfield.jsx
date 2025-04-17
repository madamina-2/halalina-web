import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react' // Optional: using Lucide icons

const InputField = ({ type, name, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  return (
    <div className='relative w-full'>
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='border-[1.5px] px-2 py-1 rounded-md w-full bg-[#F9FAFB] border-[#E5E7EA] text-[#9EA2AE]'
      />
      {isPassword && (
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      )}
    </div>
  )
}

export default InputField
