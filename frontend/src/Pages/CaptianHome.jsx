import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import CaptianDetails from '../components/CaptianDetails'
import RidePopup from '../components/RidePopup'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmPopupRide from '../components/ConfirmPopupRide.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { connectSocket, disconnectSocket, receiveMessage, sendMessage } from '../store/SocketSlice.js'
import socket from '../services/Socket.service.js'
import LiveTracking from '../components/liveTraking.jsx'

function CaptianHome() {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [otp, setOtp] = useState(null)
  const [ride, setRide] = useState(null);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const {state} = useLocation();
  const {rideData} = state || {};

  const captian = useSelector(state => state.captian.captianData);
  const dispatch = useDispatch();

  useEffect(() => {
    connectSocket(dispatch);

    socket.on('message', (message) => {
      setRide(message);
      dispatch(receiveMessage(message));

      if (message) {
        setRidePopupPanel(true);
      }
    });

    socket.on('ride-confirmed', (message) => {
      dispatch(receiveMessage(message));
      setOtp(message.otp);
    });

    sendMessage({ userType: 'captian', userId: captian._id });

    return () => {
      disconnectSocket(dispatch);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    if (captian.status === 'active') {
      const updatelocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit('update-location-captian', {
            userId: captian._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
      const locationInterval = setInterval(updatelocation, 10000);
      updatelocation();
      return () => clearInterval(locationInterval);
    }
  }, [captian]);

  async function confirmRide() {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/rides/confirm`, {
      rideId: ride._id,
      captainId: captian._id
    }, { withCredentials: true });
  };


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
  }, [ridePopupPanel, confirmRidePopupPanel]);

  return (
    <div className='h-screen'>
      <div className='absolute z-10 flex justify-between items-center w-full'>
        <img className='w-[4rem] h-[4rem]' src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png" alt="logo" />
        <div className='flex h-8 w-8 z-10 justify-center items-center'>
          <Link to='/captian-logout'><i className="bg-white p-1 rounded-full ri-logout-box-r-line"></i></Link>
        </div>
      </div>
      <div className='h-3/5'>
        <LiveTracking />
      </div>
      <div className='h-2/5 p-5'>
        <CaptianDetails />
      </div>

      <div ref={ridePopupPanelRef} className='h-screen bg-white flex top-[30%] fixed translate-y-full flex-col w-full p-4'>
        <h3 className='absolute top-0 text-xl font-bold py-4 mt-2'>New Ride Available! </h3>
        <h5 onClick={() => { setRidePopupPanel(false) }} className='relative bottom-[1rem] text-center font-bold text-xl'><i className="ri-arrow-down-wide-fill"></i></h5>
        <RidePopup confirmRide={confirmRide} ride={ride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>

      <div ref={confirmRidePopupPanelRef} className='h-screen bg-white flex top-0 z-11 fixed translate-y-full flex-col w-full p-4'>
        <h3 className='absolute top-0 text-xl font-bold py-4 mt-10'>Confirm your Ride </h3>
        <ConfirmPopupRide otp={otp} ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptianHome