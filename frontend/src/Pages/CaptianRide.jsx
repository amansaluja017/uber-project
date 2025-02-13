import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function CaptianRide() {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef();

    useGSAP(() => {
        if (finishRidePanel) {
          gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(0)'
          })
        } else {
          gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
          })
        }
      },[finishRidePanel]);

    return (
        <div className='h-screen'>
            <div className='absolute z-10 flex justify-between items-center w-full'>
                <img className='w-[4rem] h-[4rem]' src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png" alt="logo" />
                <div className='flex h-8 w-8 z-10 justify-center items-center'>
                    <Link to='/captian-logout'><i className="bg-white p-1 rounded-full ri-logout-box-r-line"></i></Link>
                </div>
            </div>
            <div className='h-[85%]'>
                <img className='h-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG" alt="map" />
            </div>
            <div className='h-[15%] p-5 bg-yellow-500 flex flex-col justify-center'>
                <h5 onClick={() => {setFinishRidePanel(true)}} className='text-center font-bold text-xl'><i className="ri-arrow-up-wide-line"></i></h5>
                <div className='flex items-center justify-between'>
                    <h2 className='font-bold text-base'>4 KM away</h2>
                    <Button onClick={() => {setFinishRidePanel(true)}} className='w-[60%] bg-green-700'>Complete Ride</Button>
                </div>
            </div>
            <div ref={finishRidePanelRef} className='h-screen bg-white flex top-[20%] z-11 fixed translate-y-full flex-col w-full p-4'>
                <h5 onClick={() => {setFinishRidePanel(false)}} className='text-center font-bold text-xl'><i className="ri-arrow-down-wide-fill"></i></h5>
                <h3 className='absolute top-0 text-xl font-bold py-4 mt-10'>Finish this Ride </h3>
                <FinishRide />
            </div>
        </div>
    )
}

export default CaptianRide