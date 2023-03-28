import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
background-color: #37306B;
width: 55px;
height: 100vh;
display: flex;
justify-content: center;
flex-direction: column;
position: fixed;
top: 0;
transition: 1 150ms;
z-index:10px;

`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  // text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  margin-left:-43px;
  margin-top:10px;
  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  flex-direction:column;
  margin-right: -24px;
  margin-top:80px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 20px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #37306B;
  
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #37306B;
    color: #010606;
  }
`;