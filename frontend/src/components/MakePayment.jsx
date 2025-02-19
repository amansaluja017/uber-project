import React from 'react'
import { Link } from 'react-router-dom'

function MakePayment(props) {
    return (
        <div>
            <div>
                <div className='flex justify-between'>
                    <img className='h-12 w-12 object-contain' src="https://www.jaipurcitycab.in/images/car2.png" alt="car" />
                    <div className='text-end'>
                        <h4 className='text-xs text-gray-500'>{props.ride?.captian?.firstName + " " + props.ride?.captian?.lastName}</h4>
                        <h2 className='font-semibold text-sm'>{props.ride?.captian?.vehicle.plate}</h2>
                        <h4 className='text-xs text-gray-500'>{`${props.ride?.captian?.vehicle.color}, ${props.ride?.captian?.vehicle.vehicleType}, capicity:- ${props.ride?.captian?.vehicle.capicity}`}</h4>
                    </div>
                </div>
                <div>
                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-map-pin-fill"></i>
                        </div>
                        <div className='ml-3 mt-4'>
                            <h3 className='font-semibold text-sm'>Pickup</h3>
                            <p className='text-sm'>{props.ride?.start}</p>
                        </div>
                    </div>

                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-map-pin-3-fill"></i>
                        </div>
                        <div className='ml-3 mt-4'>
                            <h3 className='font-semibold text-sm'>Destination</h3>
                            <p className='text-sm'>{props.ride?.end}</p>
                        </div>
                    </div>

                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-cash-line"></i>
                        </div>
                        <div className='ml-3 mt-4'>
                            <h3 className='font-semibold text-sm'>₹{props.ride?.fare}</h3>
                            <p className='text-sm'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
            <Link to='/payment' className='bg-green-600 w-full text-white py-2 rounded mt-8 flex items-center justify-center'>Make a Payment</Link>
        </div>
    )
}

export default MakePayment