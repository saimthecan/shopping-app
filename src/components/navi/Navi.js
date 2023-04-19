import React , { useState} from 'react';
import CartSummary from '../cart/CartSummary';
import "./navbar.css"
import { FaUserAlt } from "react-icons/fa";
import {
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
    MDBNavbar,
    MDBDropdown
} from 'mdb-react-ui-kit';
import logo from "../../assests/logo.png"
import { NavLink } from "react-router-dom";




export default function Navi() {
  const [showBasic, setShowBasic] = useState(false);
  return (
    
<MDBNavbar fixed sticky expand='lg' dark style={{backgroundColor: 'darkred', color: '#ffffff'}}>
<MDBContainer fluid className="containers">
    <MDBNavbarBrand style={{marginLeft:"1.5rem"}}>
    <NavLink to="/">
            <img src={logo} height="45" width="45" alt="cart logo" loading="lazy" />
          </NavLink>
    </MDBNavbarBrand>
    <MDBNavbarToggler
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
        onClick={() => setShowBasic(!showBasic)}
    >
        <MDBIcon icon='bars' fas />
    </MDBNavbarToggler>
    <MDBCollapse navbar show={showBasic}>
        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0' style={{paddingLeft:"2rem", alignItems:"center"}}>
            <MDBNavbarItem>
                <NavLink style={{color:'#ffffff', marginRight:"0.7rem",}} className="nav-link" activeClassName="active" exact to="/">
                Home
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <NavLink style={{color:'#ffffff'}} className="nav-link" activeClassName="active" to="/products">
                Products
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='buttons'>
              <CartSummary />
            </MDBNavbarItem>
        </MDBNavbarNav>
        <MDBDropdown>
            <MDBDropdownToggle tag='a' className='nav-link' role='button' style={{color:'#fcfcfc', paddingLeft: "23px", paddingTop: "0px"}} >
                <FaUserAlt style={{ width: "20px", height: "20px"}} />

            </MDBDropdownToggle>
            <MDBDropdownMenu>
                <MDBDropdownItem link href={'/'}>Profile</MDBDropdownItem>
                <MDBDropdownItem link> Log Out</MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    </MDBCollapse>
</MDBContainer>
</MDBNavbar>
  );
}

