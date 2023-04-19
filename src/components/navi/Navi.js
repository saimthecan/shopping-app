import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import CartSummary from '../cart/CartSummary';
import logo from '../../assests/logo.png';
import { Link } from 'react-router-dom';
import "./navbar.css"
import { FaUserAlt } from "react-icons/fa";

export default function Navi() {
  return (
    <div>   
      <Navbar>
        <NavbarBrand tag={Link} to="/">
          <img src={logo} alt="Logo" height="50" style={{marginLeft:"1.2rem"}} />
          
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
        <div className="d-flex">
          <NavItem className="mr-auto">
            <CartSummary />
          </NavItem>
          <NavItem>
          <FaUserAlt style={{ width: "20px", height: "20px", color:"white", marginLeft:"1.5rem"}} />
          </NavItem>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}

