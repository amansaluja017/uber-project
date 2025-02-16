import React, {useState} from 'react';
import {Input, Button} from '../components/index';
import {useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Captiansignup } from '../store/CaptianAuthSlice.js';
import axios from 'axios';
import { useId } from 'react';

function CaptianSignup() {
  const {register, handleSubmit} = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const statusId = useId();
  const vehicleId = useId();

  const submit = async (data) => {
    setError('')
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/captian/register`, data, {withCredentials: true});
      if(response.status === 201) {
        dispatch(Captiansignup(data));
        localStorage.setItem('token', response.data.data.accessToken);
        navigate('/captian-login');
      }
    } catch (error) {
      setError(error.message || "Something went wrong during signup");
    }
  }


  return (
    <div>
      <div>
      <div className='inline-block pl-5 pb-12'>
        <img className='w-[6rem] h-[6rem]' src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png" alt="logo" />
      </div>
        <form onSubmit={handleSubmit(submit)} className='p-7 flex flex-col justify-around -mt-[5rem] gap-2'>
          <div className='flex flex-col'>
            <Input className='h-9 -mt-3' label='Enter your first name' type='text' placeholder='First name' {...register('firstName', {required: true})} ></Input>
          </div>
          <div className='mt-3 flex flex-col'>
            <Input className='h-9 -mt-3' label='Enter you last name' type='text' placeholder='Last name' {...register('lastName')}></Input>
          </div>
          <div className='mt-3 flex flex-col'>
            <Input className='h-9 -mt-3' label='Enter your email' type='email' placeholder='example@example.com' {...register('email', {required: true})}></Input>
          </div>
          <div className='mt-3 flex flex-col'>
            <Input className='h-9 -mt-3' label='Enter your Password' type='password' placeholder='Password' {...register('password', {required: true})}></Input>
          </div>
          
          <div className='py-2'>
            <label htmlFor="" className='font-medium text-base relative top-2'>Vehicle information</label>
            <div className='mt-3 grid grid-cols-2 gap-2' {...register('vehicle', {required: true})}>
              <Input className='h-9' type='text' placeholder='color' {...register('vehicle.color', {required: true})}></Input>
              <Input className='h-9' type='text' placeholder='plate' {...register('vehicle.plate', {required: true})}></Input>
              <Input className='h-9' type='text' placeholder='capicity' {...register('vehicle.capicity', {required: true})}></Input>
              <select defaultValue='Select one' className='bg-gray-100 border-2 rounded h-9' name="vehicleType" id={vehicleId} {...register('vehicle.vehicleType', {required: true})}>
                <option value="car">car</option>
                <option value="auto">auto</option>
                <option value="moterbike">moterbike</option>
              </select>
            </div>

            <div className='mt-3 flex flex-col'>
              <label htmlFor="" className='font-medium text-base relative'>Status</label>
              <select defaultValue='Select one' className='bg-gray-100 h-9 border-2 rounded' name="status" id={statusId} {...register('status', {required: true})}>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
            
          </div>
          <div>
            <Button className='w-full'>Sign up</Button>
          </div>
        </form>
        <div className='relative bottom-6'>
          <p className='text-xs px-7'>Already have a account? <Link className='text-blue-900 text-xs' to='/captian-login'>click here to login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default CaptianSignup