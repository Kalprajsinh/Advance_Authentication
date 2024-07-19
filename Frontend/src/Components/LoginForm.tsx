import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

interface Props {
  setloginsteps: React.Dispatch<React.SetStateAction<string[]>>;
  setlbuysteps: React.Dispatch<React.SetStateAction<string[]>>;
}

const LoginForm: React.FC<Props> = ({ setloginsteps,setlbuysteps }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const steps = []; 
  try {
    const response = await axios.post('https://advance-authentication-2.onrender.com/aa/login', { email, password });
    steps.push('📤 Posted user information to backend /login Router');

    if (response.status === 201) {
      seterr("User not found");
      setTimeout(() => {
        seterr("");
      } , 3000)
      console.error('User not found');
    } else if (response.status === 202) {
      seterr("Invalid password");
      setTimeout(() => {
        seterr("");
      } , 3000)
      console.error('Invalid password');
    } else if (response.status === 203) {
      setwor("Error in sent token, try again");
      setTimeout(() => {
        seterr("");
      } , 3000)
      console.error('Error in sent token, try again');
    } else if (response.status === 200) {
      steps.push('✅ Zod Schema Validation');
      steps.push('🔌 Connected to database');
      steps.push('🔍 User found in database');
      steps.push('🔐 Password matched using Blowfish algo');
      steps.push('🔑 Generated JWT access token successfully');
      steps.push('🔑 Generated JWT refresh token successfully');
      steps.push('📂 Stored refresh token in database');
      steps.push('🍪 Sent cookie to client side with httpOnly: true, secure: true');
      steps.push('🔍 Checked user token');
      steps.push('☑️ User verified');
      steps.push('✅ Login successful');
      // Redirect to home page after successful login
      navigate('/login/backend');
    } else if (response.status === 500) {
      steps.push('❌ Error signing in');
      navigate('/login/backend');
      console.error('Error signing in');
    }
  } catch (error) {
    steps.push('❌ Error logging in');
    if(password.length < 6)
    {
      seterr("Password length must be at least 6 characters");
      setTimeout(() => {
        seterr("");
      } , 3000);
    }
    console.error('Error logging in:', error);
  }

  // Optionally, you can display the steps to the user here
  // For example, by setting them in a state and showing them in the UI
  setloginsteps(steps);

  const arr: string[] = [];
  setlbuysteps(arr)
  };

  const [err,seterr] = useState("");
  const [wor,setwor] = useState("");

  return (
    <div className=' flex justify-center h-2/3 items-center'>
    <div className='w-1/2'>
    <div style={{ display: err === "" ? 'none' : '' }}>
      <Alert severity="error">{err}</Alert>
      <br /><br /> 
      </div>
    <div style={{ display: wor === "" ? 'none' : '' }}>
      <Alert severity="warning">{wor}</Alert>
      <br /><br /> 
      </div>  
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
