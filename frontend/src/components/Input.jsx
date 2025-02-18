import React, { useId, forwardRef } from 'react'

const Input = forwardRef(function Input({
  label,
  type = "text",
  placeholder = 'type here...',
  className = '',
  // value = '',
  ...props
}, ref) {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id} className={`font-medium text-base ${className}`} {...props}>{label}</label>}
      <input 
        ref={ref} 
        className={`py-2 border-2 rounded bg-[#eee] placeholder:text-gray-500 placeholder:italic px-2 ${className}`} 
        id={id} 
        type={type} 
        placeholder={placeholder} 
        // value={value}
        {...props} />
    </>
  )
});

export default Input