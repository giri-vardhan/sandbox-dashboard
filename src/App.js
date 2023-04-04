import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Status from './pages/about';
import APIs from './pages/APIs'



function App() {
  return (
  <>
    <Router>
      <Navbar />
      <Routes>
         <Route path='/' exact element={<APIs />} >
        {/* <Route path='/about' element={<About />} />  */}
        <Route path='/status' element={<Status/>} >
        </Route>
        </Route>
      </Routes>
    </Router>
   
  </>
  );
}

export default App; 