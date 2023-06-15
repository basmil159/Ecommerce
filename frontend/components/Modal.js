import React, { useState } from 'react';
import UserSignup from './UserSignup';
import UserSignin from './UserSignin';
import Link from 'next/link';

const Modal = ({
  isOpen,
  user,
  onClose,
  onSignin,
  setLoggedIn,
  setIsModalOpen,
}) => {
  if (!isOpen) {
    return null;
  }

  const [isSignup, setIsSignup] = useState(true);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  console.log(user.user.name);

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50'
      onClick={handleOutsideClick}
    >
      <div className='bg-white p-4 rounded shadow'>
        
        {user ? (
          <div className='flex flex-col gap-8 text-black'>
            <Link href='/cart'>CART</Link>
            <button>SIGNOUT</button>
          </div>
        ) : (
          <>
            <div className='flex justify-between mb-4'>
              <button
                className={`px-2 py-1 rounded ${
                  isSignup ? 'bg-gray-200' : 'bg-white'
                }`}
                onClick={toggleForm}
              >
                Sign Up
              </button>
              <button
                className={`px-2 py-1 rounded ${
                  isSignup ? 'bg-white' : 'bg-gray-200'
                }`}
                onClick={toggleForm}
              >
                Login
              </button>
            </div>
            {isSignup ? (
              <UserSignup />
            ) : (
              <UserSignin
                onSignin={onSignin}
                setLoggedIn={setLoggedIn}
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
