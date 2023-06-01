// UserSignin.js
import React, { useState } from 'react';

const UserSignin = ({ onSignin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = (e) => {
    e.preventDefault();
    onSignin(username, password);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSignin}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full rounded border border-gray-300 py-2 px-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full rounded border border-gray-300 py-2 px-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default UserSignin;
