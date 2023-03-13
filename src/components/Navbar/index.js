import React from 'react'
import { Nav, NavLink,Bars,NavMenu,NavBtn, NavBtnLink } from './NavbarElements';


const Navbar = () => { 
  return (
    <>
        <Nav>
            <NavLink to='/'>
                <h1>Logo</h1>
            </NavLink>
            <Bars/>
            <NavMenu>
                <NavLink to='/about' actiivesytle='true'>
                    About
                </NavLink>
                <NavLink to='/apis' actiivesytle='true'>
                    API's
                </NavLink>
                <NavLink to='/contact-us' actiivactiivesytle='true'>
                    Contact Us
                </NavLink>
                <NavLink to='/sign-up' actiivesytle='true'>
                    Sing Up
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to='/signin'>Sign In</NavBtnLink>
            </NavBtn>
        </Nav>
    </>
  )
  };

export default Navbar; 
  