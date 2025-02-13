import React, { useState } from 'react'
import { Input } from '../components/index'
import { useForm } from 'react-hook-form'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmVehcile from '../components/ConfirmVehcile'

function Home() {
  const { register, handleSubmit } = useForm();
  const [openPanel, setOpenPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmVehiclePanel, setconfirmVehiclePanel] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const find = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmVehiclePanelRef = useRef(null);

  const submit = () => { };

  useGSAP(() => {
    if (openPanel) {
      gsap.to(panelRef.current, {
        height: '70%',
        paddingLeft: '6%',
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        display: 'block'
      })
      gsap.to(find.current, {
        opacity: 0,
        display: 'none',
      })
    } else if (!openPanel) {
      gsap.to(panelRef.current, {
        height: '0%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        display: 'none'
      })
      gsap.to(find.current, {
        opacity: 1,
        display: 'block'
      })
    }
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
    if (confirmVehiclePanel) {
      gsap.to(confirmVehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else {
      gsap.to(confirmVehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [openPanel, vehiclePanel, confirmVehiclePanel]);

  return (
    <div className='h-screen'>
      <div className='absolute'>
        <img className='w-[4rem] h-[4rem]' src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png" alt="logo" />
      </div>
      <div className='h-full'>
        <img className='h-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG" alt="map" />
      </div>
      <div>
        <div className='flex flex-col justify-end absolute top-0 h-screen'>
          <div className='h-[30%] p-5 bg-white'>
            <h5 className='text-2xl' onClick={() => { setOpenPanel(false) }}>
              <i ref={panelCloseRef} className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 ref={find} className='text-xl font-bold'>Find a trip</h3>
            <form onSubmit={handleSubmit(submit)} className='relative'>
              <div className='h-13 absolute w-[1.5px] bg-black top-[30%] left-[4%] rounded-full'></div>
              <Input onClick={() => { setOpenPanel(true) }} type='text' placeholder='Add a pick up location' classNmae='h-9 px-7 mt-3 w-full' {...register('pickup')}></Input>
              <Input onClick={() => { setOpenPanel(true) }} type='text' placeholder='Enter your destination' classNmae='h-9 mt-4 w-full px-7 ' {...register('destination')}></Input>
            </form>
          </div>
          <div ref={panelRef} className='h-[70%] bg-white'>
            <LocationSearchPanel setOpenPanel={setOpenPanel} setVehiclePanel={setVehiclePanel} />
          </div>
        </div>
      </div>
      <div ref={vehiclePanelRef} className='h-screen bg-white flex top-[30%] translate-y-full fixed flex-col w-full p-4'>
        <h3 className='absolute top-0 text-xl font-bold py-4'>Choose a Vehicle </h3>
        <h5 onClick={() => { setVehiclePanel(false) }} className='relative bottom-[1rem] text-center font-bold text-xl'><i className="ri-arrow-down-wide-fill"></i></h5>
        <VehiclePanel setconfirmVehiclePanel={setconfirmVehiclePanel} />
      </div>

      <div ref={confirmVehiclePanelRef} className='h-screen bg-white flex top-[30%] translate-y-full fixed flex-col w-full p-4'>
        <h3 className='absolute top-0 text-xl font-bold py-4'>Confirm your Ride </h3>
        <h5 onClick={() => { setconfirmVehiclePanel(false) }} className='relative bottom-[1rem] text-center font-bold text-xl'><i className="ri-arrow-down-wide-fill"></i></h5>
        <ConfirmVehcile setconfirmVehiclePanel={setconfirmVehiclePanel} />
      </div>
    </div>
  )
}

export default Home