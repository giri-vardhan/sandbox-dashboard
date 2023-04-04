import React, { useState } from 'react'
import { Nav, NavLink,Bars,NavMenu,NavBtn, NavBtnLink } from './NavbarElements';
import apiIcon from '../icons/api.png'
import rightIcon from '../icons/right.png'
import { Button } from 'bootstrap';
import openIcon from '../icons/open.svg'

const Navbar = () => { 
    const [toggleMenu,setToggle]=useState(false)
    const handleToggle =()=>{
        setToggle(!toggleMenu)
        console.log(toggleMenu)
    }
  return (
    <>{toggleMenu?<div className='slider' >
    <NavMenu style={{marginRight:'400px'}}>
    <NavLink className='open-icon-div'>
                <img className='open-icon' src={openIcon} alt="Icon"></img>
            </NavLink>
            <NavLink to='/' actiivesytle='true'>
                <div className='slider-div'>
                <img className='slider-icon' src={apiIcon} alt="API"/>
                <h7 className='slider-text'>APIs</h7></div>
            </NavLink>
            
        </NavMenu>
        <NavBtn onClick={handleToggle}>
        <div className='slider-right'>
            <img src={rightIcon} alt="Menu"/></div>
        </NavBtn>
        <Bars/>
        
       
    </div>:<Nav >
        <NavMenu style={{marginRight:'400px',transition:'150ms'}}>
        <NavLink className='open-icon-div'>
                <img className='open-icon' src={openIcon} alt="Icon"></img>
            </NavLink>
                <NavLink to='/' actiivesytle='true'>
                    <div className='slider-div' style={{marginLeft:'-18px'}}>
                    <img className='slider-icon'src={apiIcon} alt="API"/></div>
                    
                </NavLink>
                
            </NavMenu>
            <NavBtn onClick={handleToggle}>
            <div className='slider-right'>
                <img src={rightIcon} alt="Menu"/></div>
            </NavBtn>
            <Bars/>
            
           
        </Nav>}
        
    </>
  )
  };

export default Navbar; 
  