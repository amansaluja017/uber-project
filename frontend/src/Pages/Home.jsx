import React, { useEffect, useState } from 'react'
import {
  Input,
  LocationSearchPanel,
  VehiclePanel,
  ConfirmVehcile,
  LookingForDriver,
  WaitingForDriver,
  Button
} from '../components/index'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { connectSocket, disconnectSocket, receiveMessage, sendMessage } from '../store/SocketSlice.js'
import socket from '../services/Socket.service.js'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [openPanel, setOpenPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmVehiclePanel, setconfirmVehiclePanel] = useState(false);
  const [lookingDriverPanel, setlookingDriverPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [startLocation, setStartLocation] = useState([]);
  const [endLocation, setEndLocation] = useState([]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState('');
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const find = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmVehiclePanelRef = useRef(null);
  const lookingDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);

  const user = useSelector(state => state.user.userData);
  const navigate = useNavigate();

  const {isConnected, messages} = useSelector(state => state.socket);
  const dispatch = useDispatch();

  const pickup = typeof start === "object" ? start.name : start;
  const destination = typeof end === "object" ? end.name : end;

  useEffect(() => {
    connectSocket(dispatch);

    sendMessage({userType: 'user', userId: user._id});

    socket.on('ride-confirmed', (message) => {
      setWaitingForDriverPanel(true);
      dispatch(receiveMessage(message));
      setRide(message);
    });

    socket.on('ride-started', (message) => {
      setWaitingForDriverPanel(false);
      dispatch(receiveMessage(message));
      navigate('/riding', {state: {ride: message}});
    });

    return () => {
      disconnectSocket(dispatch);
    }
  }, [dispatch]);

  const handlePickup = async (e) => {
    const value = e.target.value;
    setStart(value);

    if (value.trim().length < 3) {
      setStartLocation([]);
      return;
    }

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/maps/get-suggestions`, {
        params: { input: value }
      });
  
      setStartLocation(data.data);
    } catch (error) {
      setStartLocation([]);
    }
  };

  const handleDestination = async (e) => {
    const value = e.target.value;
    setEnd(value);

    if (value.trim().length < 3) {
      setEndLocation([]);
      return;
    }

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/maps/get-suggestions`, {
        params: { input: value }
      });
      
      setEndLocation((data.data && Array.isArray(data.data)) ? data.data : data);
    } catch (error) {
      setEndLocation([]);
    }
  };

  const findTrip = async () => {
    setVehiclePanel(true);
    setOpenPanel(false);

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/rides/get-price` , {
      params: {
        start: `${start.lat},${start.lng}`,
        end: `${end.lat},${end.lng}`,
      }
    })
    setFare(response.data.data);
  }
  
  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/rides/create`, {
      start,
      end,
      vehicleType
    }, {withCredentials: true});
  }

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
    } else {
      gsap.to(confirmVehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
    if (lookingDriverPanel) {
      gsap.to(lookingDriverPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(lookingDriverPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [openPanel, vehiclePanel, confirmVehiclePanel, lookingDriverPanel, waitingForDriverPanel]);

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
          <div className='h-[30%] p-3 bg-white'>
            <h5 className='text-2xl' onClick={() => { setOpenPanel(false) }}>
              <i ref={panelCloseRef} className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 ref={find} className='text-xl font-bold'>Find a trip</h3>
            <form className='relative'>
              <div className='h-13 absolute w-[.78%] bg-black top-[30%] left-[4%] rounded-full'></div>
              <Input 
                onChange={handlePickup} 
                onClick={() => { setOpenPanel(true), setActiveField('start') }} 
                type='text' 
                placeholder='Add a pick up location' 
                className='h-9 px-7 mt-3 w-full' 
                value={pickup}>
              </Input>
              <Input 
                onChange={handleDestination} 
                onClick={() => { setOpenPanel(true), setActiveField('end') }} 
                type='text' 
                placeholder='Enter your destination' 
                className='h-9 mt-4 w-full px-7 ' 
                value={destination}>
              </Input>
            </form>

            <Button onClick={() => {findTrip()}} className='w-full'>Find Trip</Button>

          </div>
          <div ref={panelRef} className='bg-white h-[70%] p-6'>
            <LocationSearchPanel
              suggestions={activeField === 'start' ? startLocation : endLocation} setOpenPanel={setOpenPanel} setVehiclePanel={setVehiclePanel} setStart={setStart} setEnd={setEnd} activeField={activeField} />
          </div>
        </div>
      </div>

      <div ref={vehiclePanelRef} className='h-screen bg-white flex top-[30%] translate-y-full fixed flex-col w-full p-4'>
        <h3 className='absolute top-0 text-xl font-bold py-4'>Choose a Vehicle </h3>
        <h5 onClick={() => { setVehiclePanel(false) }} className='relative bottom-[1rem] text-center font-bold text-xl'><i className="ri-arrow-down-wide-fill"></i></h5>
        <VehiclePanel setconfirmVehiclePanel={setconfirmVehiclePanel} fare={fare} selectVehicle={setVehicleType} />
      </div>

      <div ref={confirmVehiclePanelRef} className='h-screen bg-white flex top-[30%] translate-y-full fixed flex-col w-full p-4'>
        <h3 className='absolute top-0 text-xl font-bold py-4'>Confirm your Ride </h3>
        <h5 onClick={() => { setconfirmVehiclePanel(false) }} className='relative bottom-[1rem] text-center font-bold text-xl'><i className="ri-arrow-down-wide-fill"></i></h5>
        <ConfirmVehcile vehicleType={vehicleType} start={start} end={end} fare={fare} createRide={createRide} setconfirmVehiclePanel={setconfirmVehiclePanel} setlookingDriverPanel={setlookingDriverPanel} />
      </div>

      <div ref={lookingDriverPanelRef} className='h-screen bg-white flex top-[30%] translate-y-full fixed flex-col w-full p-4'>
        <h3 className='absolute top-0 text-xl font-bold py-4'>Looking for a driver </h3>
        <h5 onClick={() => { setlookingDriverPanel(false) }} className='relative bottom-[1rem] text-center font-bold text-xl'><i className="ri-arrow-down-wide-fill"></i></h5>
        <LookingForDriver vehicleType={vehicleType} start={start} end={end} fare={fare} />
      </div>

      <div ref={waitingForDriverPanelRef} className='h-screen bg-white flex top-[30%] fixed flex-col translate-y-full w-full p-4'>
        <h3 className='absolute top-0 text-xl font-bold py-4'>Driver's details </h3>
        <h5 onClick={() => { setWaitingForDriverPanel(false) }} className='relative bottom-[1rem] text-center font-bold text-xl'><i className="ri-arrow-down-wide-fill"></i></h5>
        <WaitingForDriver ride={ride} vehicleType={vehicleType} start={start} end={end} fare={fare} setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>

    </div>
  )
}

export default Home