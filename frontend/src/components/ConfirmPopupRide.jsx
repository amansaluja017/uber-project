import React, { useState, useRef, useEffect } from 'react'
import { Button, Input } from '../components/index'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ConfirmPopupRide(props) {
    const {messages} = useSelector(state => state.socket);
    const distance = messages[0]?.distance;
    const submitButton = useRef();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const userFirstName = props.ride?.user.firstName;
    const userLastName = props.ride?.user.lastName;
    const payment = props.ride?.fare;
    const totalFare = (payment * (1 - 0.30)).toFixed(2);

    const checkOtp = async (e) => {
        e.preventDefault();
        if (otp !== props.otp) {
            setError('Enter a valid OTP');
            setOtp('');
        } else {
            setOtp('');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/rides/start-ride`, {
                    params: {
                        rideId: props.ride._id,
                        otp
                    },
                    withCredentials: true
                });

                if (response.status === 200) {
                    props.setConfirmRidePopupPanel(false);
                    props.setRidePopupPanel(false);
                    navigate('/captian-riding', { state: { ride: response.data.data } });
                }
            } catch (error) {
                console.error('Error starting ride:', error);
            }
        }
    };

    useEffect(() => {
        if(otp.length === 6) {
            submitButton.current.disabled = false;
        } else {
            submitButton.current.disabled = true;
        }
    },[otp]);
   



    return (
        <div>
            <div>
                <div className='flex justify-between mt-20 bg-yellow-300 py-4 w-full rounded-xl'>
                    <div className='flex justify-center items-center gap-2 px-2'>
                        <img className='h-10 w-10 object-contain rounded-full' src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" alt="avatar" />
                        <h3 className='font-semibold'>{`${userFirstName} ${userLastName}`}</h3>
                    </div>

                    <div className='text-start px-2 flex justify-center items-center'>
                        <h2 className='font-semibold text-sm'>{distance} KM</h2>
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-map-pin-fill"></i>
                        </div>
                        <div className='ml-3'>
                            <h3 className='font-semibold text-xl'>Pickup</h3>
                            <p className='text-xs text-gray-600'>{props.ride?.start}</p>
                        </div>
                    </div>

                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-map-pin-3-fill"></i>
                        </div>
                        <div className='ml-3'>
                            <h3 className='font-semibold text-xl'>Destination</h3>
                            <p className='text-xs text-gray-600'>{props.ride?.end}</p>
                        </div>
                    </div>

                    <div className='flex items-center mt-4 mb-3'>
                        <div>
                            <i className="ri-cash-line"></i>
                        </div>
                        <div className='ml-3'>
                            <h3 className='font-semibold text-xl'>₹{totalFare}</h3>
                            <p className='text-xs text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={checkOtp}>
                <div>
                    <Input onChange={(e) => setOtp(e.target.value)} value={otp} type='number' className='w-full py-2 px-5' placeholder='Enter OTP' />
                    {error && <p className='text-red-700 text-sm font-mono'>{error}</p>  }
                    <Button ref={submitButton} className='bg-green-700 mt-8 w-full disabled:bg-green-300' disabled>Confirm</Button>
                    <Button onClick={() => { props.setConfirmRidePopupPanel(false) }} className='bg-red-700 mt-[2%] w-full'>Cancel</Button>
                </div>
            </form>

        </div>
    )
}

export default ConfirmPopupRide