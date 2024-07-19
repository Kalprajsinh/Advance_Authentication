import { useState } from 'react';
import Button from './Components/Button';
import LoginForm from './Components/LoginForm';
import Main from './Components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './Components/SignUpForm';
import Loginbackend from './Components/Loginbackend';
import Signupbackend from './Components/Sigmupbackend';

function App() {
  const [steps, setSteps] = useState<string[]>([]); 
  const [loginsteps, setloginsteps] = useState<string[]>([]); 
  const [buysteps, setlbuysteps] = useState<string[]>([]); 

  return (
    <>
      <div className="bg-[url('../public/bga.png')] w-full h-screen bg-no-repeat bg-cover overflow-hidden">
        <div className="flex items-center h-28 gap-4 pl-4">
          <div className="w-7 h-7 bg-violet-950 rounded-full content-center">
            <div className="w-5 h-5 bg-blue-900 rounded-full flex items-center justify-end">
              <div className="w-3 h-3 bg-indigo-950 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">Authentication</h1>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginForm setloginsteps={setloginsteps} setlbuysteps={setlbuysteps}/>} />
            <Route path="/login/backend" element={<Loginbackend loginsteps={loginsteps} buysteps={buysteps} />} />
            <Route path="/signup" element={<SignUpForm setSteps={setSteps}/>} />
            <Route path="/signup/backend" element={<Signupbackend steps={steps} />} />
          </Routes>
          <br /><br />
          <div className="flex justify-center gap-5 mt-7">
            <Button setlbuysteps={setlbuysteps} setloginsteps={setloginsteps}/>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;


// const ctrlShiftKey = (e: KeyboardEvent, keyCode: string) => {
  //   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  // };
  // useEffect(() => {
  //   // Disable right-click context menu
  //   document.addEventListener('contextmenu', (e: Event) => {e.preventDefault() });
  //   // Disable specified key combinations
  //   document.addEventListener('keydown', (e: KeyboardEvent) => {
  //     // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  //     if (
  //       e.keyCode === 123 ||
  //       ctrlShiftKey(e, 'I') ||
  //       ctrlShiftKey(e, 'J') ||
  //       ctrlShiftKey(e, 'C') ||
  //       (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  //     ) {
  //       e.preventDefault();
  //     }
  //   });

  //   return () => {
  //     // Clean up event listeners when component unmounts
  //     document.removeEventListener('contextmenu', (e: Event) => {e.preventDefault() });
  //     document.removeEventListener('keydown', (e: KeyboardEvent) => {
  //       // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  //       if (
  //         e.keyCode === 123 ||
  //         ctrlShiftKey(e, 'I') ||
  //         ctrlShiftKey(e, 'J') ||
  //         ctrlShiftKey(e, 'C') ||
  //         (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  //       ) {
  //         e.preventDefault();
  //       }
  //     });
  //   };
  // }, []); // Empty dependency array ensures effect runs only once