import React, { useState } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import apiIcon from "../icons/api.png";
import rightIcon from "../icons/right.png";
import { Button } from "bootstrap";
import openIcon from "../icons/open.svg";
import logOutIcon from "../icons/logout.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ back, auth }) => {
  const navigate = useNavigate();
  const [toggleMenu, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggleMenu);
    console.log(toggleMenu);
  };
  const handleLogout = () => {
    auth(false);
    navigate("/");
  };
  return (
    <div className="slider">
      <NavLink to="/apis" actiivesytle="true" onClick={back}>
        <div className="slider-div">
          <img src={apiIcon} alt="API" />
          <h6 className="slider-text">APIs</h6>
        </div>
      </NavLink>

      
      <NavBtn onClick={handleLogout}>
        <div className="logOut-div">
          <img src={logOutIcon} alt="Log Out" />
          <h6 className="slider-signOut">Sign Out</h6>
        </div>
      </NavBtn>

      {/* <NavBtn onClick={handleToggle}>
        <div className='slider-right'>
            <img src={rightIcon} alt="Menu"/></div>
        </NavBtn> */}
      <Bars />

      {/* :<Nav className='sideBar' >
        <NavMenu style={{marginRight:'400px'}}>
        {/* <NavLink className='open-icon-div'>
                <img className='open-icon' src={openIcon} alt="Icon"></img>
            </NavLink> */}
      {/* <NavLink to='/apis' actiivesytle='true'onClick={back}>
                    <div className='slider-div' style={{marginLeft:'-18px'}}>
                    <img className='slider-icon'src={apiIcon} alt="API"/></div>
                    
                </NavLink>
                
            </NavMenu>
            <NavBtn onClick={handleLogout}>
        <div className='logOut-div'>
            <img src={logOutIcon} alt='Log Out'/></div>
        </NavBtn>
            <NavBtn onClick={handleToggle}>
            <div className='slider-right'>
                <img src={rightIcon} alt="Menu"/></div>
            </NavBtn>
            <Bars/>
            
           
        </Nav>} */}
    </div>
  );
};

export default Navbar;
