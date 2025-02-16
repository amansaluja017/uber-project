import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function UserLogout() {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('status');
            localStorage.removeItem('userData');
            localStorage.removeItem('usersignupData');
            navigate('/login');
        }
    })
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout