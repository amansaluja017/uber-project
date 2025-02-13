import React, { useEffect } from 'react'
import { WelcomeComponent } from '../components/index'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Weclcome() {
  const user = useSelector(state => state.user.status);
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate('/home');
    }
  })

  return (
    <WelcomeComponent />
  )
}

export default Weclcome