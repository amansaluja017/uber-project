import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function UserProtected({children}) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
      if (!token) {
        navigate('/login')

      }
    }, [token, navigate]);

  return (
    <>
     {children}
    </>
  )
}

export default UserProtected