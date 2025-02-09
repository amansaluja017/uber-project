import React from 'react'

function Button({
    children,
    type='submit',
    className= '',
    ...props
}) {
  return (
    <button className={`bg-black text-white w-full py-2 rounded mt-4 flex items-center justify-center ${className}`} type={type} {...props}>{children}</button>
  )
}

export default Button