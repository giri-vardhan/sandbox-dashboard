import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Status from './pages/status';
import APIs from './pages/APIs'
import Login from './pages/login'
import ProtectRoute from './ProtecteRoutes'


function App() {
  const [isLog,setIsLog]=useState(false)
  const handleLogIn=(state)=>{
    setIsLog(state)
  }
  return (
  <>

    
      <Routes>
        
         <Route path='/' exact element={<Login auth={handleLogIn}/>} />
         <Route path='/apis' element={<APIs auth={handleLogIn} isLog={isLog}/>}/>
        <Route path='/status'  element={<APIs  auth={handleLogIn} isLog={isLog}/>} />
        {/* <ProtectRoute path='/apis' Component={APIs} auth={true}/> */}
        
        
      </Routes>

   
  </>
  );
}

export default App; 