import React from 'react'

function LocationSearchPanel(props) {
    const locations = ['Lorem ipsum dolor sit, amet consectetur adipisicing elit' , 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' , 'Lorem ipsum dolor sit, amet consectetur adipisicing elit', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit'];

  return (

    <>
    {locations.map((location, index) => {
        return (
            <div key={index} onClick={() => {props.setVehiclePanel(true), props.setOpenPanel(false)}} className='flex flex-col gap-2'>
                <div className='flex gap-2 justify-center items-center mt-3 border mr-5 border-gray-50 rounded-md active:outline-2'>
                    <h2><i className="ri-map-pin-fill"></i></h2>
                    <h4 className='font-medium'>{location}</h4>
                </div>
            </div>
        )
    })}
    </>
  )
}

export default LocationSearchPanel