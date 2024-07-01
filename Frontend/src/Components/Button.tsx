import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function Button() {
  const navigate = useNavigate();

  const handleBuyNowClick = async () => {
    try {
      // Check user validity with access token
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
          await axios.post('http://localhost:3000/aa/refresh');
          alert('You can proceed with the purchase');
        } else {
          // Refresh failed, redirect to login
          navigate('/login');
        }
      } catch (refreshError) {
        console.error('Refresh error:', refreshError);
        // Refresh token is invalid, redirect to login
        navigate('/login');
      }
    }
  };

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
        <button type="button" onClick={handleBuyNowClick} className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 dark:shadow-lg dark:shadow-green-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Buy Now
        </button>
      </header>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </div>
  );
};


