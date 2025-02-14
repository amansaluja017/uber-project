import React from 'react'
import {Button} from '../components/index'

function ConfirmVehcile(props) {
  return (
    <div>
        
        <div className='flex items-center justify-center'>
            <img className='h-[10rem] w-[10rem] object-contain' src="https://www.jaipurcitycab.in/images/car2.png" alt="car" />
        </div>
        <div className='h-[1px] absolute  bg-gray-200 w-full'></div>
        <div>
            <div className='flex items-center mt-4 mb-3'>
                <div>
                    <i className="ri-map-pin-fill"></i>
                </div>
                <div className='ml-3'>
                    <h3 className='font-semibold text-xl'>562/11-A</h3>
                    <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur</p>
                </div>
            </div>
            <div className='h-[1px] absolute  bg-gray-200 w-full'></div>

            <div className='flex items-center mt-4 mb-3'>
                <div>
                    <i className="ri-map-pin-3-fill"></i>
                </div>
                <div className='ml-3'>
                    <h3 className='font-semibold text-xl'>Third Wave Coffee</h3>
                    <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur</p>
                </div>
            </div>
            <div className='h-[1px] absolute  bg-gray-200 w-full'></div>

            <div className='flex items-center mt-4 mb-3'>
                <div>
                    <i className="ri-cash-line"></i>
                </div>
                <div className='ml-3'>
                    <h3 className='font-semibold text-xl'>₹193.20</h3>
                    <p className='text-sm'>Cash Cash</p>
                </div>
            </div>

        </div>
        <Button onClick={() => {props.setlookingDriverPanel(true)}} className='bg-green-600 w-full'>Confirm</Button>
    </div>
  )
}

export default ConfirmVehcile