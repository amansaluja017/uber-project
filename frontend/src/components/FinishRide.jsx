import React from 'react'
import { Button } from '../components/index'
import { useSelector } from 'react-redux'

function FinishRide(props) {
    const { messages } = useSelector(state => state.socket);
    const distance = messages[0]?.distance;

    return (
        <div>
            <div className='p-4'>
                <div className='flex justify-between mt-10 bg-yellow-300 py-4 w-full rounded-xl'>
                    <div className='flex justify-center items-center gap-2 px-2'>
                        <img className='h-10 w-10 object-contain rounded-full' src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" alt="avatar" />
                        <h3 className='font-semibold'>{props.rideData?.user?.firstName + " " + props.rideData?.user?.lastName}</h3>
                    </div>

                    <div className='text-start px-2 flex justify-center items-center'>
                        <h2 className='font-semibold text-sm'>{distance} KM</h2>
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-map-pin-fill"></i>
                        </div>
                        <div className='ml-3'>
                            <h3 className='font-semibold text-xl'>Pickup</h3>
                            <p className='text-xs text-gray-600'>{props.rideData?.start}</p>
                        </div>
                    </div>

                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-map-pin-3-fill"></i>
                        </div>
                        <div className='ml-3'>
                            <h3 className='font-semibold text-xl'>Destination</h3>
                            <p className='text-xs text-gray-600'>{props.rideData?.end}</p>
                        </div>
                    </div>

                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-cash-line"></i>
                        </div>
                        <div className='ml-3'>
                            <h3 className='font-semibold text-xl'>₹{props.rideData?.fare}</h3>
                            <p className='text-xs text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-4'>
                <Button onClick={() => {
                    props.setRideEndedPanel(true)
                    props.setFinishRidePanel(false)
                    props.endRide()
                }} className='bg-green-700 w-full'>Finish</Button>
            </div>

        </div>
    )
}

export default FinishRide;