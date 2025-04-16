import React from 'react';

const InputField = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input 
      type={type} 
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='border-[1.5px] px-2 py-1 rounded-md w-full bg-[#F9FAFB] border-[#E5E7EA]'
    />
  );
}

export default InputField;