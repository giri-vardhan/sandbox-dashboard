import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Status from './pages/status';
import APIs from './pages/APIs'
import Login from './pages/login'

function App() {
  const [isLog,setIsLog]=useState(false)
  const [userDetails,setUserDetails]=useState([])
  const handleLogIn=(state)=>{
    setIsLog(state)
  }
  const handleUserData=(data)=>{
    setUserDetails(data)
  }
  return (
  <>
      <Routes>   
         <Route path='/' exact element={<Login auth={handleLogIn} userDetails={handleUserData}/>} />
         <Route path='/apis' element={<APIs auth={handleLogIn} isLog={isLog} userData={userDetails}/>}/>
        <Route path='/status'  element={<APIs  auth={handleLogIn} isLog={isLog} userData={userDetails}/>} />          
      </Routes>
  </>
  );
}
export default App; 