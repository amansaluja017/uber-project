import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function MakePayment(props) {
    const {messages} = useSelector(state => state.socket);

    return (
        <div>
            <div>
                <div className='flex justify-between'>
                    <div className='flex flex-col'>
                        <div className='text-medium font-black flex gap-2'>Status:- <h1 className='text-green-400'>{messages[4]?.status}</h1></div>
                    </div>
                    <div className='text-end'>
                        <h4 className='text-xl font-medium'>{props.ride?.captian?.firstName + " " + props.ride?.captian?.lastName}</h4>
                        <h2 className='font-semibold text-sm'>{props.ride?.captian?.vehicle.plate}</h2>
                    </div>
                </div>
                <div>
                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-map-pin-fill"></i>
                        </div>
                        <div className='ml-3 mt-2'>
                            <h3 className='font-bold text-xl'>Pickup</h3>
                            <p className='text-sm'>{props.ride?.start}</p>
                        </div>
                    </div>

                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-map-pin-3-fill"></i>
                        </div>
                        <div className='ml-3 mt-2'>
                            <h3 className='font-bold text-xl'>Destination</h3>
                            <p className='text-sm'>{props.ride?.end}</p>
                        </div>
                    </div>

                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-cash-line"></i>
                        </div>
                        <div className='ml-3 mt-2'>
                            <h3 className='font-bold text-xl'>₹{props.ride?.fare}</h3>
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