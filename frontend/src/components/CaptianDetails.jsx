import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

function CaptianDetails() {
    const captian = useSelector(state => state.captian.captianData);
    const {messages} = useSelector(state => state.socket);
    const [earnings, setEarnings] = useState(0);
    const [progress, setProgress] = useState(0);
    const rideId = messages[0]?._id;
    const progressRef = useRef();

    const rideHistory = async() => {
        if (!rideId) return;
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/captian/rideHistory`, {
                params: {
                    rideId: rideId,
                }
            });
            const rides = response.data.data;
            const earnings = rides.reduce((acc, ride) => acc + ride.fare, 0);
            
            setEarnings(earnings);
            return earnings;
        } catch (error) {
            console.error('Error fetching ride history:', error);
        }
    };

    useEffect(() => {
        if (messages[0]?._id) {
            rideHistory();
        }
    }, [messages]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/captian/captian-points`, {withCredentials: true});
                if(response.status === 200) {
                    setProgress(response.data.data.points)
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    if (progressRef.current) {
        if(progress >= 80) {
            progressRef.current.className = 'text-green-500 font-semibold';
        } else if(progress >= 50 && progress < 80) {
            progressRef.current.className = 'text-orange-500 font-semibold';
        } else if (progress >= 30 && progress < 50) {
            progressRef.current.className = 'text-yellow-500 font-semibold';
        } else if (progress >= 0 && progress < 30) {
            progressRef.current.className = 'text-red-500 font-semibold';
        }
    }

    return (
        <div>
            <div>
                <div className='flex justify-between'>
                    <div className='flex justify-center items-center gap-2'>
                        <img className='h-10 w-10 object-contain rounded-full' src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" alt="avatar" />
                        <h3 className='font-semibold'>{`${captian.firstName} ${captian.lastName}`}</h3>
                    </div>

                    <div className='text-start'>
                        <h2 className='font-semibold text-sm'>₹{Math.floor(earnings)}</h2>
                        <h4 className='text-xs text-gray-500'>Earned</h4>
                    </div>
                </div>
                <div className='bg-gray-100 flex justify-around mt-8 py-3 rounded'>
                    <h2 className='font-semibold'>Progress points</h2>
                    <h5 ref={progressRef} className='font-medium'>{progress}</h5>
                </div>
                <div className='bg-gray-100 flex justify-evenly mt-8 py-3 rounded'>
                    <div>
                        <div className='flex flex-col justify-center items-center'>
                            <i className="font-medium text-xl ri-time-line"></i>
                            <h5 className='text-sm font-semibold'>10.2</h5>
                            <h5 className='text-xs text-gray-600'>Hour's online</h5>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col justify-center items-center'>
                            <i className="font-medium text-xl ri-timer-2-line"></i>
                            <h5 className='text-sm font-semibold'>10.2</h5>
                            <h5 className='text-xs text-gray-600'>Hour's online</h5>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <i className="font-medium text-xl ri-booklet-line"></i>
                        <h5 className='text-sm font-semibold'>10.2</h5>
                        <h5 className='text-xs text-gray-600'>Hour's online</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaptianDetails