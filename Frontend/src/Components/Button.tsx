import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

axios.defaults.withCredentials = true;
interface Props {
  setlbuysteps: React.Dispatch<React.SetStateAction<string[]>>;
  setloginsteps: React.Dispatch<React.SetStateAction<string[]>>;
}

const Button: React.FC<Props> = ({ setlbuysteps,setloginsteps }) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [user, setuser] = useState(null);
  const steps: string[] = [];

  function getCookieValue(cookieName: string) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }
    steps.push('☑️ Check cookie value');
    return false;
}

  const handleBuyNowClick = async () => {
    const refreshTokenValue = getCookieValue('refreshToken');
      if (refreshTokenValue == false) {
        try {
          const response = await axios.post('https://advance-authentication-2.onrender.com/aa/access', {}, {
            withCredentials: true
        });
          steps.push('🍪 Posted cookie to backend /access Router');
    
          if (response.status === 401) {
            steps.push('❌ Access Token not retrieved');
          } else if (response.status === 403) {
            steps.push('⚠️ Error in verifying token, please retry...');
          } 
          if (response.status === 200) {
            setuser(response.data);
            console.log(response.data.email);
            steps.push('🔑 Retrieved access token secret key');
            steps.push('🍪 Retrieved access cookie from client side');
            steps.push('✅ Verified JWT access token');
            steps.push('👤 User verified ✅');
          }
        } catch (accessError) {
          console.error('Access error:', accessError);
    
          try {
            // Access token is invalid, attempt to refresh it
            const refreshResponse = await axios.post('https://advance-authentication-2.onrender.com/aa/refresh');
            steps.push('❌ Access Token not retrieved');
            steps.push('♻️ access token expire, posted cookie to backend /refresh Router');
            if (refreshResponse.status === 200) {
              steps.push('🔑 Retrieved refresh token secret key');
              steps.push('🍪 Retrieved refresh cookie from client side');
              steps.push('✅ Verified JWT refresh token');
              steps.push('📂 Found refresh token in database');
              steps.push('🔄 Generated new JWT access token successfully');
              steps.push('🍪 Sent cookie to client side with httpOnly: true, secure: true');
              steps.push('👤 User is valid ✅');
              // Refresh was successful, retry the buy now action
              await axios.post('https://advance-authentication-2.onrender.com/aa/access');
            } else if (refreshResponse.status === 401) {
              steps.push('❌ Refresh token not retrieved, please retry...');
              console.error('Refresh token not retrieved');
            } else if (refreshResponse.status === 403) {
              steps.push('⚠️ Invalid refresh token');
              console.error('Invalid refresh token');
            } else if (refreshResponse.status === 400) {
              steps.push('❌ Invalid refresh token');
              console.error('Invalid refresh token');
            } else {
              // Refresh failed, redirect to login
              navigate('/login');
            }
          } catch (refreshError) {
            console.error('Refresh error:', refreshError);
            steps.push('❌ Access Token not retrieved !');
            steps.push('❌ refresh token not retrieved !');
            // Refresh token is invalid, redirect to login
            // navigate('/login');
            const aerr: string[] = [];
            setloginsteps(aerr)
          }
        }
      } else {
          console.log('cookie not found'); // Log a message indicating cookie not found
      }
      setlbuysteps(steps);
  };

  async function Logout(){
    try {
      const response = await axios.post('https://advance-authentication-2.onrender.com/aa/logout');
      console.log(response.data);
      // Redirect to home page after successful signup
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }

  if (location.pathname == '/') {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/login">
          <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-lg dark:shadow-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-lg dark:shadow-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            SignUp
          </button>
        </Link>
      </header>
    </div>
  );
}
else if (location.pathname == '/login/backend') {
  return (
    <div className="App">
      <header className="App-header">
        <button type="button" onClick={handleBuyNowClick} className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Buy Now
        </button>
        <button type="button"  onClick={Logout} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-lg dark:shadow-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Logout
          </button>
      </header>
    </div>
  );
} else if (location.pathname == '/signup/backend') {
  return (
    <div className="App">
      <header className="App-header">
      <Link to="/login">
          <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-lg dark:shadow-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Login
          </button>
        </Link>
      </header>
    </div>
  );
}
}

export default Button