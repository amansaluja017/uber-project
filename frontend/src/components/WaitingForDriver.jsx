import React from 'react'
import { useSelector } from 'react-redux'

function WaitingForDriver(props) {
  const captian = useSelector(state => state.captian.captianSignupData)
  return (
    <div>
      <div className='flex mt-10 mb-10 justify-between'>
        <img className='h-12 w-12 object-contain' src="https://www.jaipurcitycab.in/images/car2.png" alt="car" />
        <div className='text-end'>
          <h4 className='text-xs text-gray-500'>test test</h4>
          <h2 className='font-semibold'>123456789</h2>
          <h4 className='text-xs text-gray-500'>car's details</h4>
        </div>
      </div>
      <div className='h-[1px] absolute  bg-gray-200 w-full'></div>
      <div>
        <div className='flex items-center mt-4 mb-3'>
          <div>
            <i className="ri-map-pin-fill"></i>
          </div>
          <div className='ml-3'>
            <h3 className='font-semibold text-xl'>Pickup</h3>
            <p className='text-sm'>{props.start.name}</p>
          </div>
        </div>
        <div className='h-[1px] absolute  bg-gray-200 w-full'></div>

        <div className='flex items-center mt-4 mb-3'>
          <div>
            <i className="ri-map-pin-3-fill"></i>
          </div>
          <div className='ml-3'>
            <h3 className='font-semibold text-xl'>Destination</h3>
            <p className='text-sm'>{props.end.name}</p>
          </div>
        </div>
        <div className='h-[1px] absolute  bg-gray-200 w-full'></div>

        <div className='flex items-center mt-4 mb-3'>
          <div>
            <i className="ri-cash-line"></i>
          </div>
          <div className='ml-3'>
            <h3 className='font-semibold text-xl'>₹{props.fare[props.vehicleType]}</h3>
            <p className='text-sm'>Cash Cash</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver