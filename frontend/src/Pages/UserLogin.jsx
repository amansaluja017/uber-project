import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {useDispatch} from 'react-redux'
import { login } from '../store/UserAuthSlice'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from '../components/index'
import axios from 'axios'

function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState('');

  const submit = async (data) => {
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`, data, {withCredentials: true});
      console.log(response)
      if(response.status === 200) {
        dispatch(login(response.data.data.user))
        localStorage.setItem('token', response.data.data.accessToken);
        navigate('/home');
      }
    } catch (error) {
      setError(error.message || "something went wrong during login");
    }
    
  };

  return (
    <div className='p-4 h-screen flex flex-col justify-end'>
      <div>
        <img className='w-[6rem] h-[6rem]' src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png" alt="logo" />
      </div>
      <form className='py-6' onSubmit={handleSubmit(submit)}>
        <div className='flex flex-col'>
          <Input label='Enter your email' type="email" placeholder='example@example.com' {...register('email', { required: true })}/>
        </div>

        {error && <p>{error}</p>}

        <div className='py-4 flex flex-col'>
          <Input label='Enter your Password' type="password" placeholder='password' {...register('password', { required: true })}  />
        </div>

        <div>
          <Button className='w-full'>Login</Button>
        </div>
      </form>
      <div>
        <p className='text-sm'>New user? <Link className='text-blue-900 text-sm' to='/signup'>Create a new account</Link></p>
      </div>
      <div className=''>
        <Link className='bg-purple-800 text-white w-full py-2 rounded mt-4 flex items-center justify-center' to='/captian-login'>Login as captian</Link>
      </div>
    </div>
    
  )
}

export default UserLogin