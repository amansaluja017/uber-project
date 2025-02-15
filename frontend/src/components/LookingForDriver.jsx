import React from 'react'

function LookingForDriver(props) {

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

export default LookingForDriver