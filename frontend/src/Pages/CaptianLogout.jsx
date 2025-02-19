import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function CaptianLogout() {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/captian/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response);
        if(response.status === 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('captianStatus');
            localStorage.removeItem('captianData');
            localStorage.removeItem('captianSignupData');
            navigate('/captian-login');
        }
    })
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black'></div>
    </div>
  )
}

export default CaptianLogout