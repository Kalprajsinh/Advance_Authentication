import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

interface Props {
  setSteps: React.Dispatch<React.SetStateAction<string[]>>;
}

const SignUpForm: React.FC<Props> = ({ setSteps }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const steps: string[] = [];

    try {
      const response = await axios.post('http://localhost:3000/aa/signup', { name, email, password });

      if (response.status === 201) {
        seterr("User already exists");
        setTimeout(() => {
          seterr("");
        } , 3000)
      } else if (response.status === 401 || response.status === 500) {
        steps.push('❌ Error creating user');
        navigate('/signup/backend');
      } else if (response.status === 200) {
        steps.push('🔑 Password matched with confirm password');
        steps.push('📤 Posted user information to backend /signup Router');
        steps.push('☑️ Done Zod Schema Validation');
        steps.push('🔐 Converted password to hash password using Blowfish');
        steps.push('🔌 Connected to database');
        steps.push('🔍 Checked if user exists');
        steps.push('📂 User data added successfully');
        console.log(response.data);
        steps.push('✅ User created successfully');

        // Redirect to home page after successful signup
        navigate('/signup/backend');
      }
    } catch (error) {
      steps.push(`❌ Error signing up ${error}`);
      navigate('/signup/backend');
      console.error('Error signing up:', error);
    }

    // Update parent component state with steps
    setSteps(steps);
  };

  const [err,seterr] = useState("");

  return (
    <div className=' flex justify-center h-2/3 items-center'>
      <div className='w-1/2'>
      <div style={{ display: err === "" ? 'none' : '' }}>
      <Alert severity="error">{err}</Alert>
      <br /><br /> 
      </div>
        <h1 className='text-3xl font-bold text-white'>Create new account.</h1>
        <h2 className='flex text-base font-bold text-gray-200'>Already have account?&nbsp;<a onClick={() => navigate("/login")} className='text-blue-500 underline cursor-pointer'>Login</a></h2><br /><br />
        <form onSubmit={
          (e) => {
            e.preventDefault();
            if (password.length < 6) {
              seterr("Password length must be at least 6 characters");
              setTimeout(() => {
                seterr("");
              } , 3000)
            } else if (password !== confirmPassword) {
              seterr("Passwords do not match");
              setTimeout(() => {
                seterr("");
              } , 3000)
            } else {
              handleSubmit(e);
            }
          } 
          }>
          <div className='border gap-4 rounded-lg h-10'>
            <label className='text-gray-500 font-mono ml-4'><i className="fa fa-user text-2xl"></i></label>&nbsp;&nbsp;&nbsp;
            <input className='bg-transparent text-white font-bold text-lg w-8/12 h-full' placeholder="Enter Name" type="text" value={name} onChange={(e) => setname(e.target.value)} required />
          </div>
          <br />
          <div className='border gap-4 rounded-lg h-10'>
            <label className='text-gray-300 font-mono ml-4'><i className="fa fa-user text-2xl"></i></label>&nbsp;&nbsp;&nbsp;
            <input className='bg-transparent text-white font-bold text-lg w-8/12 h-full' placeholder="Enter email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div><br />
          <div className='border gap-4 rounded-lg h-10'>
            <label className='text-gray-300 font-mono ml-4'><i className="fa fa-lock text-2xl"></i></label>&nbsp;&nbsp;&nbsp;
            <input className='bg-transparent text-white font-bold text-lg w-8/12 h-full' placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div><br />
          <div className='border gap-4 rounded-lg h-10'>
            <label className='text-gray-300 font-mono ml-4'><i className="fa fa-check text-xl"></i></label>&nbsp;&nbsp;&nbsp;
            <input className='bg-transparent text-white font-bold text-lg w-8/12 h-full' placeholder="Confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div><br />
          <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-lg dark:shadow-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
