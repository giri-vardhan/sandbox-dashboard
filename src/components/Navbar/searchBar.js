import { useState } from "react";
import { Button, NavLink } from "react-bootstrap";
import searchIcon from "../icons/search.png";
import openIcon from "../icons/open.svg";
import "./searchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import UserProfile from '../Endpoints/UserPopup'
import Profile from "../Endpoints/UserPopup";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom";




const Searchbar = ({ header, onSearch,userData,auth}) => {
    const navigate = useNavigate();
  const [logo1, setLogo] = useState(header);
  const [isFlip,setIsFlip]=useState(false)
  const [searchInput, setSearchInput] = useState("");
  const [profileToggle,setProfileToggle]=useState(false)
  const handleChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };
  const handleLogout = () => {
    auth(false);
    navigate("/");
  };
  const searchValue = () => {
    if (searchInput.length > 0) {
      onSearch(searchInput);
    }
  };
  const handleKey = (e) => {
    if (e.key === "Enter") {
      searchValue();
    }
  };
  const handleProfile=()=>{
    setIsFlip(true);
    setTimeout(() => {
      setIsFlip(false);
    }, 500);
    setProfileToggle(!profileToggle)
  }

  return (
    <>
      <div className="search-bar-div">
        <NavLink className="open-icon-div">
          <img className="open-icon-SB" src={openIcon} alt="Icon"></img>
        </NavLink>
        <h3 className="logo">{logo1}</h3>
        <input
          className="searchBox"
          type="search"
          id="searchB"
          placeholder="Search here"
          onKeyDown={handleKey}
          onChange={handleChange}
          value={searchInput}
        />
        <Button className="searchIcon" id="searchIconID" onClick={searchValue}>
          <img className="searchImg" src={searchIcon} alt="search" />
        </Button>
        <div className="menu-div">
        <FontAwesomeIcon icon={faUser} flip={isFlip} className='profile-search-icon' onClick={handleProfile} />
        <DropdownButton id="dropdown-item-button" className="dropdown"  title={ <i className="fas fa-cog"/>}>
      <Dropdown.Item as="button"  onClick={handleLogout}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} className="sign-out-icon" />
      Sign Out
      </Dropdown.Item>
      
    </DropdownButton>
    </div>
      </div>
      {profileToggle&&<UserProfile onClose={handleProfile} userData={userData}/>}
    </>
  );
};
export default Searchbar;