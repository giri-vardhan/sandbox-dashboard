import React, { useState } from 'react'
import { Nav, NavLink,Bars,NavMenu,NavBtn, NavBtnLink } from './NavbarElements';
import apiIcon from '../icons/api.png'
import rightIcon from '../icons/right.png'
import { Button } from 'bootstrap';


const Navbar = () => { 
    const [toggleMenu,setToggle]=useState(false)
    const handleToggle =()=>{
        setToggle(!toggleMenu)
        console.log(toggleMenu)
    }
  return (
    <>{toggleMenu?<div className='slider' >
    <NavMenu style={{marginRight:'400px'}}>
            
            <NavLink to='/apis' actiivesytle='true'>
                <div className='slider-div'>
                <img className='slider-icon' src={apiIcon} alt="API"/>
                <text className='slider-text'>APIs</text></div>
            </NavLink>
            
        </NavMenu>
        <NavBtnLink onClick={handleToggle}>
        <div className='slider-right'>
            <img src={rightIcon} alt="Menu"/></div>
        </NavBtnLink>
        <Bars/>
        
       
    </div>:<Nav >
        <NavMenu style={{marginRight:'400px'}}>
            
                <NavLink to='/apis' actiivesytle='true'>
                    <div className='slider-div' style={{marginLeft:'-18px'}}>
                    <img className='slider-icon'src={apiIcon} alt="API"/></div>
                    
                </NavLink>
                
            </NavMenu>
            <NavBtnLink onClick={handleToggle}>
            <div className='slider-right'>
                <img src={rightIcon} alt="Menu"/></div>
            </NavBtnLink>
            <Bars/>
            
           
        </Nav>}
        
    </>
  )
  };

export default Navbar; 
  