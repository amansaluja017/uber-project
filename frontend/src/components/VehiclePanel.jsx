import React from 'react'

function VehiclePanel(props) {
  if (props.fare.car === 'undefined' && props.fare.motorbike === 'undefined' && props.fare.auto === 'undefined') {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black'></div>
      </div>
    )
  }

  return (
    <div>
      <div onClick={() => { props.setconfirmVehiclePanel(true), props.selectVehicle('car') }} className='active:outline-2 border-gray-50 w-full mt-10 rounded-2xl flex items-center'>
        <div>
          <img className='h-20 w-20 object-contain' src="https://www.jaipurcitycab.in/images/car2.png" alt="car" />
        </div>
        <div className='px-4 mt-2'>
          <h4 className='font-semibold'>UberGo <i className="ri-user-fill"></i> 4</h4>
          <h6 className='text-sm'>2 min away</h6>
          <h6 className='text-xs'>affordable and compact rides</h6>

        </div>
        <div className='absolute right-[5%]'>
          <h3 className='font-bold '>{`₹${props.fare.car}`}</h3>
        </div>
      </div>
      <div onClick={() => { props.setconfirmVehiclePanel(true), props.selectVehicle('motorbike') }} className='active:outline-2 border-gray-50  w-full mt-5 rounded-2xl flex items-center'>
        <div>
          <img className='h-20 w-20 object-contain' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="moterbike" />
        </div>
        <div className='px-4 mt-2'>
          <h4 className='font-semibold'>UberGo <i className="ri-user-fill"></i> 1</h4>
          <h6 className='text-sm'>2 min away</h6>
          <h6 className='text-xs'>affordable and compact rides</h6>
        </div>
        <div className='absolute right-[5%]'>
          <h3 className='font-bold'>{`₹${props.fare.motorbike}`}</h3>
        </div>
      </div>
      <div onClick={() => { props.setconfirmVehiclePanel(true), props.selectVehicle('auto') }} className='active:outline-2 border-gray-50  w-full mt-5 rounded-2xl flex items-center'>
        <div>
          <img className='h-20 w-20 object-contain' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s" alt="auto" />
        </div>
        <div className='px-4 mt-2'>
          <h4 className='font-semibold'>UberGo <i className="ri-user-fill"></i> 2</h4>
          <h6 className='text-sm'>2 min away</h6>
          <h6 className='text-xs'>affordable and compact rides</h6>

        </div>
        <div className='absolute right-[5%]'>
          <h3 className='font-bold'>{`₹${props.fare.auto}`}</h3>
        </div>
      </div>
    </div>
  )
}

export default VehiclePanel