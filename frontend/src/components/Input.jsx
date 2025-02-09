import React from 'react'
import { useId } from 'react'

function Input({
    label,
    type="text",
    placeholder= 'type here...',
    classNmae= '',
    ...props
}) {
    const id = useId();
  return (
    <>
        {label && <label htmlFor={id} className={`font-medium text-base ${classNmae}`} {...props}>{label}</label>}

        <input className={`py-2 border-2 rounded bg-gray-100 placeholder:text-gray-500 placeholder:italic px-2 ${classNmae}`} id={id} type={type} placeholder={placeholder} {...props}></input>
    </>
  )
}

export default Input