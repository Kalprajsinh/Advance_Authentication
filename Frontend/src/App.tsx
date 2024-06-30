import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [ip, setIp] = useState('');

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIp(response.data.ip);
      } catch (error) {
        console.error("Error fetching the IP address: ", error);
      }
    };

    fetchIP();
  }, []);

  return (
    <>
    <div className="bg-[url('../public/bga.png')] w-full h-screen bg-no-repeat bg-cover overflow-hidden">
    <div className="flex items-center h-28 gap-4 pl-4">
      <div className="w-7 h-7 bg-violet-950 rounded-full content-center"><div className="w-5 h-5 bg-blue-900 rounded-full flex items-center justify-end"><div className="w-3 h-3 bg-indigo-950 rounded-full"></div></div></div>
      <h1 className="text-3xl font-bold text-white">Authentication</h1>
    </div>
    <div className="h-1/2 flex justify-center gap-5">
    <div className="pl-8 bg-black bg-opacity-40 w-3/4 text-base font-bold text-white rounded-lg p-5 font-mono">
    
    <div className='font-sans underline sticky top-0'>Backend Process</div>
    <br />
    <div className='overflow-y-scroll h-5/6 overflow-x-hidden'>

          <div>
          &gt; User Loggedin - false
          </div>
          <div>
          &gt; device IP address - {ip}
          </div>
          <br /><br />
          <div className="text-base text-blue-300 flex items-center gap-2 select-none">To see more backend process, please Login or Signup<p className='text-3xl'>→</p></div>
          <br />
    </div>
    </div>
    
    </div>
    <div className="flex justify-center gap-5 mt-7">
    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-lg dark:shadow-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Login</button>
    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-lg dark:shadow-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">SignUp</button>
    </div>

    </div>
    </>
  )
}

export default App
