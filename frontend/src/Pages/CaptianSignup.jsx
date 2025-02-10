import React, {useState} from 'react';
import {Input, Button} from '../components/index';
import {useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Captianlogin} from '../store/CaptianAuthSlice'

function CaptianSignup() {
  const {register, handleSubmit} = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const submit = (data) => {
    setError('')
    try {
      dispatch(Captianlogin(data))
      navigate('/captian-login')
    } catch (error) {
      setError(error.message || "Something went wrong during signup");
    }
  }


  return (
    <div>
      <div>
      <div className='p-7'>
        <img className='w-[6rem] h-[6rem]' src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png" alt="logo" />
      </div>
        <form onSubmit={handleSubmit(submit)} className='p-7 flex flex-col justify-around'>
          <div className='flex flex-col'>
            <Input label='Enter your first name' type='text' placeholder='First name' {...register('firstName', {required: true})} ></Input>
          </div>
          <div className='mt-3 flex flex-col'>
            <Input label='Enter you last name' type='text' placeholder='Last name' {...register('lastName')}></Input>
          </div>
          <div className='mt-3 flex flex-col'>
            <Input label='Enter your email' type='email' placeholder='example@example.com' {...register('email', {required: true})}></Input>
          </div>
          <div className='mt-3 flex flex-col'>
            <Input label='Enter your Password' type='password' placeholder='Password' {...register('password', {required: true})}></Input>
          </div>
          <div>
            <Button>Sign up</Button>
          </div>
        </form>
        <p className='text-sm px-7'>Already have a account? <Link className='text-blue-900 text-sm' to='/captian-login'>click here to login</Link></p>
      </div>
    </div>
  )
}

export default CaptianSignup