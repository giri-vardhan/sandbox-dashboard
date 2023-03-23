import React from 'react'
import { Nav, NavLink,Bars,NavMenu,NavBtn, NavBtnLink } from './NavbarElements';
import apiIcon from '../icons/api.png'


const Navbar = () => { 
  return (
    <>
        <Nav >
        <NavMenu style={{marginRight:'400px'}}>
                <NavLink to='/about' actiivesytle='true'>
                    About
                </NavLink>
                <NavLink to='/apis' actiivesytle='true'>
                    <img src={apiIcon} alt="API"/>
                </NavLink>
                
            </NavMenu>
            <NavLink to='/'>
                <h1>Logo</h1>
            </NavLink>
            <Bars/>
            
           
        </Nav>
    </>
  )
  };

export default Navbar; 
  