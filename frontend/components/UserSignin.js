// UserSignin.js
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
  headers: { 'Access-Control-Allow-Origin': '*', Accept: '*/*' },
});

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const UserSignin = ({ onSignin, setLoggedIn,setIsModalOpen }) => {
  const router = useRouter();
  const formOptions = { resolver: yupResolver(loginValidationSchema) };
  const { register, handleSubmit, formState, errors } = useForm(formOptions);

  const handleSignin = (data) => {
    instance
      .post('sign-in', { ...data })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Login Sucessful', {
            position: 'top-center',
            theme: 'light',
          });
          setLoggedIn(false);
          setIsModalOpen(false);
        }

        // onSignin();
        // router.reload();
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          toast.success(e.response.data.message, {
            position: 'top-center',
            theme: 'light',
          });
          setLoggedIn(true);
        }
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
