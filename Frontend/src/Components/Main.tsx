import { useState, useEffect } from 'react';
import axios from 'axios';
import { Offline, Online } from "react-detect-offline";
import '../App.css';

interface User {
  name: string;
  email: string;
}

function Main() {
  const [ip, setIp] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [user, setUser] = useState<User | null>(null); 
  const [loggedIn, setLoggedIn] = useState(false); 

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    if (/mobile|android|iphone|ipad|ipod/.test(userAgent)) {
      if (/iphone/.test(userAgent)) {
        setDeviceType("iPhone");
      } else if (/android/.test(userAgent)) {
        setDeviceType("Android");
      } else if (/ipad/.test(userAgent)) {
        setDeviceType("iPad");
      } else if (/ipod/.test(userAgent)) {
        setDeviceType("iPod Touch");
      } else {
        setDeviceType("Phone");
      }
    } else if (/tablet|ipad/.test(userAgent) || (screenWidth < 1024 && screenHeight < 768)) {
      setDeviceType("Tablet");
    } else {
      setDeviceType("Desktop/PC");
    }
  }, []);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get('https://api.ipify.org/?format=json', {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: false
        });
        setIp(response.data.ip);

        try {
          const res1 = await axios.post('https://advance-authentication.onrender.com/aa/access', {}, {
            withCredentials: true
          });
          if (res1.status === 200) {
            setUser(res1.data); // Save user data (name and email)
            setLoggedIn(true);  // Set loggedIn to true
          }
        } catch (error) {
          try {
            const refreshResponse = await axios.post('https://advance-authentication.onrender.com/aa/refresh', {}, {
              withCredentials: true
            });
            if (refreshResponse.status === 200) {
              setUser(refreshResponse.data); // Save user data (name and email)
              setLoggedIn(true);  // Set loggedIn to true
            }
          } catch (error) {
            console.error("Error refreshing token: ", error);
          }
        }
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
            {/* Display user info if logged in */}
            {loggedIn && user ? (
                <div className='flex text-xs sm:text-base'>&gt; User Loggedin - <p className='text-green-500'>&nbsp;True &nbsp;{user.email}</p></div>
            ) : (
              <div className='flex text-xs sm:text-base'>&gt; User Loggedin - <p className='text-red-500'>&nbsp;False</p></div>
            )}

            <div className='overflow-y-scroll h-5/6 overflow-x-hidden'>
              {ip && (
                <div className='flex text-xs sm:text-base'>&gt; Device IP address - {ip}</div>
              )}
              {deviceType && (
                <div className='flex text-xs sm:text-base'>&gt; User Device Type - {deviceType}</div>
              )}
              <Online><div className='flex text-xs sm:text-base'>&gt; User is <p className='text-green-500'>&nbsp;online</p></div></Online>
              <Offline><div className='flex text-xs sm:text-base'>&gt; User is <p className='text-red-500'>&nbsp;offline</p></div></Offline>
              <br /><br />
            {!loggedIn && (
              <div className="text-xs sm:text-base text-blue-300 flex items-center gap-2 select-none">
                To see more backend process, please Login or Signup
                <p className='text-2xl'>→</p>
              </div>
            )}
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  )
}

export default Main;
