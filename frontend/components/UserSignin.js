// UserSignin.js
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/router';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
  headers: {'Access-Control-Allow-Origin': '*'}
});

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const UserSignin = ({ onSignin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router =useRouter();
  const formOptions = { resolver: yupResolver(loginValidationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);

  const handleSignin = (data) => {
    instance
      .post('sign-in', {...data})
      .then((response) => {
        // console.log(response);
        router.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log(formState.errors);
  }, [formState]);

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Sign In</h2>
      <form onSubmit={handleSubmit(handleSignin)}>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700'>
            Email
          </label>
          <input
            type='text'
            id='email'
            className='w-full rounded border border-gray-300 py-2 px-3'
            {...register('email')}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700'>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='w-full rounded border border-gray-300 py-2 px-3'
            {...register('password')}
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default UserSignin;
