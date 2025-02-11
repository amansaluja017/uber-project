import React, { useState } from 'react'
import {Input} from '../components/index'
import {useForm} from 'react-hook-form'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

function Home() {
  const {register, handleSubmit} = useForm();
  const [openPanel, setOpenPanel] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const find = useRef(null);

  const submit = () => {};

  useGSAP(() => {
    if(openPanel) {
      console.log(openPanel);
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
  },[openPanel]);

  return (
    <div className='h-screen'>
      <div className='absolute'>
      <img className='w-[4rem] h-[4rem]' src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png" alt="logo" />
      </div>
      <div className='h-full'>
        <img className='h-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG" alt="map" />
      </div>
      <div>
        <div className='flex flex-col justify-end absolute top-0 h-full'>
          <div className='h-[30%] p-5 bg-white'>
            <h5 className='text-2xl' onClick={() => {setOpenPanel(false)}}>
              <i ref={panelCloseRef} className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 ref={find} className='text-xl font-bold'>Find a trip</h3>
            <form onSubmit={handleSubmit(submit)} className='relative'>
              <div className='h-13 absolute w-[1.5px] bg-black top-[30%] left-[4%] rounded-full'></div>
              <Input onClick={() => {setOpenPanel(true)}} type='text' placeholder='Add a pick up location' classNmae='h-9 px-7 mt-3 w-full' {...register('pickup')}></Input>
              <Input onClick={() => {setOpenPanel(true)}} type='text' placeholder='Enter your destination' classNmae='h-9 mt-4 w-full px-7 ' {...register('destination')}></Input>
            </form>
          </div>
          <div ref={panelRef} className='h-[70%] bg-white'>
            <LocationSearchPanel />
          </div>
        </div>
      </div>
      {/* <div>
        <div className='absolute bottom-0 h-[10rem] w-[10rem]'>
          <img src="https://www.jaipurcitycab.in/images/car2.png" alt="car" />
        </div>
      </div> */}
    </div>
  )
}

export default Home