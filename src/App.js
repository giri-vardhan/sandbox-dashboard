import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import APIs from './pages/APIs'



function App() {
  return (
  <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/apis' element={<APIs />} >
        </Route>
      </Routes>
    </Router>
   
  </>
  );
}

export default App; 