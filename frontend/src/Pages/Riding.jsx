import React from 'react'
import { Button } from '../components/index'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

function Riding() {
    return (
        <div className='h-screen'>
            <div className='fixed flex h-8 w-8 z-10 justify-center items-center rounded-full top-2 right-2 bg-white'>
                <Link to='/home'><i className="ri-home-line"></i></Link>
            </div>
            <div className='h-1/2 contain-content'>
                <img className='' src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG" alt="map" />
            </div>
            <div className='h-1/2 p-5'>
                <div>
                    <div className='flex justify-between'>
                        <img className='h-12 w-12 object-contain' src="https://www.jaipurcitycab.in/images/car2.png" alt="car" />
                        <div className='text-end'>
                            <h4 className='text-xs text-gray-500'>driver's name</h4>
                            <h2 className='font-semibold text-sm'>ABC-A12-1234</h2>
                            <h4 className='text-xs text-gray-500'>car's details</h4>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center mt-4 mb-3'>
                            <div>
                                <i className="ri-map-pin-fill"></i>
                            </div>
                            <div className='ml-3'>
                                <h3 className='font-semibold text-sm'>562/11-A</h3>
                                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur</p>
                            </div>
                        </div>

                        <div className='flex items-center mt-4 mb-3'>
                            <div>
                                <i className="ri-map-pin-3-fill"></i>
                            </div>
                            <div className='ml-3'>
                                <h3 className='font-semibold text-sm'>Third Wave Coffee</h3>
                                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur</p>
                            </div>
                        </div>

                        <div className='flex items-center mt-4 mb-3'>
                            <div>
                                <i className="ri-cash-line"></i>
                            </div>
                            <div className='ml-3'>
                                <h3 className='font-semibold text-sm'>₹193.20</h3>
                                <p className='text-sm'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Button className='bg-green-600'>Make a Payment</Button>
            </div>
        </div>
    )
}

export default Riding