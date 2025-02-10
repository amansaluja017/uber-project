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
            navigate('/captian-login');
        }
    })
  return (
    <div>CaptianLogout</div>
  )
}

export default CaptianLogout