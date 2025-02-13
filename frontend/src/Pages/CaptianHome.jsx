import React, {useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import CaptianDetails from '../components/CaptianDetails'
import RidePopup from '../components/RidePopup'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmPopupRide from '../components/confirmPopupRide'

function CaptianHome() {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[ridePopupPanel, confirmRidePopupPanel]);

  return (
    <div className='h-screen'>
      <div className='absolute z-10 flex justify-between items-center w-full'>
        <img className='w-[4rem] h-[4rem]' src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png" alt="logo" />
        <div className='flex h-8 w-8 z-10 justify-center items-center'>
          <Link to='/captian-logout'><i className="bg-white p-1 rounded-full ri-logout-box-r-line"></i></Link>
        </div>
      </div>
      <div className='h-3/5'>
        <img className='h-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG" alt="map" />
      </div>
      <div className='h-2/5 p-5'>
       <CaptianDetails />
      </div>

      <div ref={ridePopupPanelRef} className='h-screen bg-white flex top-[30%] fixed translate-y-full flex-col w-full p-4'>
        <h3 className='absolute top-0 text-xl font-bold py-4 mt-2'>New Ride Available! </h3>
        <h5 onClick={() => {setRidePopupPanel(false)}} className='relative bottom-[1rem] text-center font-bold text-xl'><i className="ri-arrow-down-wide-fill"></i></h5>
        <RidePopup setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>

      <div ref={confirmRidePopupPanelRef} className='h-screen bg-white flex top-0 z-11 fixed translate-y-full flex-col w-full p-4'>
        <h3 className='absolute top-0 text-xl font-bold py-4 mt-10'>Confirm your Ride </h3>
        <ConfirmPopupRide setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptianHome