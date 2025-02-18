import React, { useEffect, useState } from 'react'
import { Button } from '../components/index'
import { Link, useLocation } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import socket from '../services/Socket.service';
import { useSelector, useDispatch } from 'react-redux';
import { connectSocket, disconnectSocket, receiveMessage } from '../store/SocketSlice';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/liveTraking';

function Riding() {
    const dispatch = useDispatch();
    const {state} = useLocation();
    const {ride} = state || {};
    const navigate = useNavigate();
    
    const { isConnected, messages } = useSelector(state => state.socket);

    useEffect(() => {
        connectSocket(dispatch);

        socket.off('rideEnded');
        
        socket.on('rideEnded', (message) => {
            console.log('ride ended received', message);
            dispatch(receiveMessage(message));
            navigate('/home');
        });

        return () => {
            socket.off('rideEnded');
            disconnectSocket(dispatch);
        }
    }, [dispatch, navigate]);

    return (
        <div className='h-screen'>
            <div className='fixed flex h-8 w-8 z-10 justify-center items-center rounded-full top-2 right-2 bg-white'>
                <Link to='/home'><i className="ri-home-line"></i></Link>
            </div>
            <div className='h-1/2 contain-content'>
                <LiveTracking />
            </div>
            <div className='h-1/2 p-5'>
                <div>
                    <div className='flex justify-between'>
                        <img className='h-12 w-12 object-contain' src="https://www.jaipurcitycab.in/images/car2.png" alt="car" />
                        <div className='text-end'>
                            <h4 className='text-xs text-gray-500'>{ride.captian.firstName + " " + ride.captian.lastName}</h4>
                            <h2 className='font-semibold text-sm'>{ride.captian.vehicle.plate}</h2>
                            <h4 className='text-xs text-gray-500'>{`${ride.captian.vehicle.color}, ${ride.captian.vehicle.vehicleType}, capicity:- ${ride.captian.vehicle.capicity}`}</h4>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center mt-4 mb-3'>
                            <div>
                                <i className="ri-map-pin-fill"></i>
                            </div>
                            <div className='ml-3'>
                                <h3 className='font-semibold text-sm'>Pickup</h3>
                                <p className='text-sm'>{ride.start}</p>
                            </div>
                        </div>

                        <div className='flex items-center mt-4 mb-3'>
                            <div>
                                <i className="ri-map-pin-3-fill"></i>
                            </div>
                            <div className='ml-3'>
                                <h3 className='font-semibold text-sm'>Destination</h3>
                                <p className='text-sm'>{ride.end}</p>
                            </div>
                        </div>

                        <div className='flex items-center mt-4 mb-3'>
                            <div>
                                <i className="ri-cash-line"></i>
                            </div>
                            <div className='ml-3'>
                                <h3 className='font-semibold text-sm'>₹{ride.fare}</h3>
                                <p className='text-sm'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Button className='bg-green-600 w-full'>Make a Payment</Button>
            </div>
        </div>
    )
}

export default Riding