import React from 'react'
import { Button, Input } from '../components/index'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'

function ConfirmPopupRide(props) {
    const {register, handleSubmit} = useForm();

    const submit = () => {}

    return (
        <div>
            <div>
                <div className='flex justify-between mt-20 bg-yellow-300 py-4 w-full rounded-xl'>
                    <div className='flex justify-center items-center gap-2 px-2'>
                        <img className='h-10 w-10 object-contain rounded-full' src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" alt="avatar" />
                        <h3 className='font-semibold'>Driver's name</h3>
                    </div>

                    <div className='text-start px-2 flex justify-center items-center'>
                        <h2 className='font-semibold text-sm'>2.2 KM</h2>
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-map-pin-fill"></i>
                        </div>
                        <div className='ml-3'>
                            <h3 className='font-semibold text-xl'>562/11-A</h3>
                            <p className='text-xs text-gray-600'>Lorem ipsum dolor sit amet, consectetur</p>
                        </div>
                    </div>

                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-map-pin-3-fill"></i>
                        </div>
                        <div className='ml-3'>
                            <h3 className='font-semibold text-xl'>Third Wave Coffee</h3>
                            <p className='text-xs text-gray-600'>Lorem ipsum dolor sit amet, consectetur</p>
                        </div>
                    </div>

                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-cash-line"></i>
                        </div>
                        <div className='ml-3'>
                            <h3 className='font-semibold text-xl'>₹193.20</h3>
                            <p className='text-xs text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <Input type='number' classNmae='w-full py-2 px-5' placeholder='Enter OTP' {...register('otp', {required: true})} />
                    <Link to='/captian-riding' className='bg-green-700 mt-8 text-white w-full py-2 rounded flex items-center justify-center'>Confirm</Link>
                    <Button onClick={() => { props.setConfirmRidePopupPanel(false) }} className='bg-red-700 mt-[2%] w-full'>Cancel</Button>
                </div>
            </form>
            
        </div>
    )
}

export default ConfirmPopupRide