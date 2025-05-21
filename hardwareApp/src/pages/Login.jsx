import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg.jpg';
import logo from '../assets/logo1.png';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('Cashier');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'Admin') {
      navigate('/dashboard');
    } else {
      navigate('/pos');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="backdrop-blur-md bg-gray-800/80 rounded-xl p-8 w-full max-w-sm"
        style={{ boxShadow: '0 10px 15px -3px rgba(255, 255, 255, 0.4)' }}
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-50 mb-2" />
          <h2 className="text-white text-2xl font-bold">Log In</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded bg-white placeholder-gray-700 focus:outline-none"
              required
            />
            <span className="absolute bottom-9 left-2 bg-black text-white text-sm px-2 py-0.5 font-bold">
              Email
            </span>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded bg-white placeholder-gray-700 focus:outline-none"
              required
            />
            <span className="absolute bottom-9 left-2 bg-black text-white text-sm px-2 py-0.5 font-bold">
              Password
            </span>
          </div>

          {/* Role Selector */}
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white text-gray-800 focus:outline-none"
            >
              <option>Cashier</option>
              <option>Admin</option>
            </select>
            <span className="absolute bottom-9 left-2 bg-black text-white text-sm px-2 py-0.5 font-bold">
              Role
            </span>
          </div>

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
