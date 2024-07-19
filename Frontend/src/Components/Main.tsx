import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'

function Main() {
  const [ip, setIp] = useState('');

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get('https://advance-authentication-2.onrender.com/aa/ip');
        setIp(response.data.ip);
      } catch (error) {
        console.error("Error fetching the IP address: ", error);
      }
    };
    fetchIP();
  }, []);

  return (
    <>
    <div>
    <div className="h-1/2 flex justify-center gap-5">
    <div className="pl-8 bg-black bg-opacity-40 w-3/4 text-base font-bold text-white rounded-lg p-5 font-mono">
    
    <div className='font-sans underline sticky top-0'>Backend Process</div>
    <br />
    <div className='overflow-y-scroll h-5/6 overflow-x-hidden'>

          <div className='flex text-xs sm:text-base'>
          &gt; User Loggedin - <p className='text-red-500'>&nbsp;False</p>
          </div>
          <div className='text-xs sm:text-base'>
          {ip && (
            <>&gt; device IP address - {ip}</>
          )}  
          </div>
          <br /><br />
          <div className="text-xs sm:text-base text-blue-300 flex items-center gap-2 select-none">To see more backend process, please Login or Signup<p className='text-2xl'>→</p></div>
          <br />
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Main


{/* 
  
  */}