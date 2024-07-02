import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function Button() {
  const navigate = useNavigate();

  function getCookieValue(cookieName: string) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }
    return false;
}

  const handleBuyNowClick = async () => {
    const refreshTokenValue = getCookieValue('refreshToken');
      if (refreshTokenValue == false) {
        try {
          await axios.post('http://localhost:3000/aa/access');
            // User is valid, proceed with the buy now action
            alert('You can proceed with the purchase');
        } catch (accessError) {
          console.error('Access error:', accessError);
    
          try {
            // Access token is invalid, attempt to refresh it
            const refreshResponse = await axios.post('http://localhost:3000/aa/refresh');
            if (refreshResponse.status === 200) {
              // Refresh was successful, retry the buy now action
              await axios.post('http://localhost:3000/aa/access');
              alert('You can proceed with the purchase');
            } else {
              // Refresh failed, redirect to login
              navigate('/login');
            }
          } catch (refreshError) {
            console.error('Refresh error:', refreshError);
            // Refresh token is invalid, redirect to login
            // navigate('/login');
          }
        }
      } else {
          console.log('cookie not found'); // Log a message indicating cookie not found
      }
  };

  async function Logout(){
    try {
      const response = await axios.post('http://localhost:3000/aa/logout');
      console.log(response.data);
      // Redirect to home page after successful signup
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }

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
          <button type="button"  onClick={Logout} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-lg dark:shadow-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Logout
          </button>
        <button type="button" onClick={handleBuyNowClick} className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Buy Now
        </button>
      </header>
    </div>
  );
};