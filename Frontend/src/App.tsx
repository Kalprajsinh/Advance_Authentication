import { useEffect } from "react";
import Main from "./Components/Main"
import { BrowserRouter as Router } from 'react-router-dom';




function App() {
  
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

  return (
    <Router>
      <Main />
    </Router>
  )
}

export default App
