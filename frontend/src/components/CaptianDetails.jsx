import React from 'react'
import {useSelector} from 'react-redux'

function CaptianDetails() {
    const captian = useSelector(state => state.captian.captianData);

    return (
        <div>
            <div>
                <div className='flex justify-between'>
                    <div className='flex justify-center items-center gap-2'>
                        <img className='h-10 w-10 object-contain rounded-full' src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" alt="avatar" />
                        <h3 className='font-semibold'>{`${captian.firstName} ${captian.lastName}`}</h3>
                    </div>

                    <div className='text-start'>
                        <h2 className='font-semibold text-sm'>{}</h2>
                        <h4 className='text-xs text-gray-500'>Earned</h4>
                    </div>
                </div>
                <div className='bg-gray-100 flex justify-evenly mt-8 py-3 rounded'>
                    <div>
                        <div className='flex flex-col justify-center items-center'>
                            <i className="font-medium text-xl ri-time-line"></i>
                            <h5 className='text-sm font-semibold'>10.2</h5>
                            <h5 className='text-xs text-gray-600'>Hour's online</h5>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col justify-center items-center'>
                            <i className="font-medium text-xl ri-timer-2-line"></i>
                            <h5 className='text-sm font-semibold'>10.2</h5>
                            <h5 className='text-xs text-gray-600'>Hour's online</h5>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <i className="font-medium text-xl ri-booklet-line"></i>
                        <h5 className='text-sm font-semibold'>10.2</h5>
                        <h5 className='text-xs text-gray-600'>Hour's online</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaptianDetails