import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/aa/login', { email, password });
      console.log(response.data);
      // Redirect to home page after successful login
      navigate('/login/backend');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className=' flex justify-center h-2/3 items-center'>
    <div className='w-1/2'>
    <h1 className='text-3xl font-bold text-white'>Login to your account.</h1>
    <h2 className='flex text-base font-bold text-gray-200'>Create your account &nbsp;<a onClick={() => navigate("/signup")} className='text-blue-500 underline cursor-pointer'>Signup</a></h2><br /><br />
    <form onSubmit={handleSubmit}>
      <div className='border gap-4 rounded-lg h-10'>
        <label className='text-gray-300 font-mono ml-4'><i className="fa fa-user text-2xl"></i></label>&nbsp;&nbsp;&nbsp;
        <input className='bg-transparent text-white font-bold text-lg w-8/12 h-full' placeholder="Enter email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <br />
      <div className='border gap-4 rounded-lg h-10'>
        <label className='text-gray-300 font-mono ml-4'><i className="fa fa-lock text-2xl"></i></label>&nbsp;&nbsp;&nbsp;
        <input className='bg-transparent text-white font-bold text-lg w-8/12 h-full' placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <br /><br />
      <div className='w-full flex justify-center'>
      <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-lg dark:shadow-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit">Login</button>
      </div>
    </form>
    </div>  
    </div>
  );
};

export default LoginForm;
