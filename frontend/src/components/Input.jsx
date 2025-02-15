import React from 'react'
import { useId } from 'react'
import { forwardRef } from 'react';

const Input = forwardRef(function Input({
  label,
  type="text",
  placeholder= 'type here...',
  className= '',
  ...props
}, ref) {
  const id = useId();
return (
  <>
      {label && <label htmlFor={id} className={`font-medium text-base ${className}`} {...props}>{label}</label>}

      <input ref={ref} className={`py-2 border-2 rounded bg-[#eee] placeholder:text-gray-500 placeholder:italic px-2 ${className}`} id={id} type={type} placeholder={placeholder} {...props}></input>
  </>
)
})

export default Input