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
import { useNavigate } from "react-router-dom";

const Navbar = ({ back }) => {
  const [toggleMenu, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggleMenu);
  };

  return (
    <div className="slider">
      <NavLink to="/apis" actiivesytle="true" onClick={back}>
        <div className="slider-div">
          <img className="slider-icon" src={apiIcon} alt="API" />
          <h6 className="slider-text">APIs</h6>
        </div>
      </NavLink>
    
      
    </div>
  );
};

export default Navbar;
