import React from 'react'
import { Link } from 'react-router-dom'

function WelcomeComponent() {
  return (
    <div className='w-full h-screen flex flex-col bg-[url(../../welcome-image.png)] bg-cover bg-center bg-no-repeat'>
      
      <div className='flex flex-col w-full'>
        <img className='w-20 h-20' src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png" alt="logo" />
      </div>
      <div className='flex h-full items-end'>
        <div className='bg-white flex flex-col justify-between w-full py-5'>
          <h1 className='text-2xl font-bold px-3 py-3'>Get Started With Uber</h1>
          <Link to='/login' className='bg-black  text-white mr-3 ml-3 py-2 rounded mt-4 flex items-center justify-center'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomeComponent