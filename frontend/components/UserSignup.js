// UserSignup.js
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

const signupValidationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name must be valid').required('Name is required'),
  username: Yup.string()
    .min(5, 'Username must be at least 6 characters')
    .required('User Name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const UserSignup = ({ onSignup }) => {
  const formOptions = { resolver: yupResolver(signupValidationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);

  const handleSignup = (data) => {
    instance
      .post('sign-up', { ...data })
      .then((response) => {
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
      <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
      <form onSubmit={handleSubmit(handleSignup)}>
      <div className='mb-4'>
          <label htmlFor='fullName' className='block text-gray-700'>
            Full Name
          </label>
          <input
            type='text'
            id='fullName'
            className='w-full rounded border border-gray-300 py-2 px-3'
            {...register('name')}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='username' className='block text-gray-700'>
            Username
          </label>
          <input
            type='text'
            id='username'
            className='w-full rounded border border-gray-300 py-2 px-3'
            {...register('username')}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700'>
            Email
          </label>
          <input
            type='email'
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default UserSignup;
