import React, { useState } from 'react';
import UserSignup from './UserSignup';
import UserSignin from './UserSignin';

const Modal = ({ isOpen, onClose }) => {
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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between mb-4">
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
        {isSignup ? <UserSignup /> : <UserSignin />}
      </div>
    </div>
  );
};

export default Modal;
