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
    MDBNavbarLink,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
    MDBNavbar,
    MDBDropdown
} from 'mdb-react-ui-kit';
import logo from "../../assests/logo.png"




export default function Navi() {
  const [showBasic, setShowBasic] = useState(false);
  return (
    
<MDBNavbar fixed sticky expand='lg' dark style={{backgroundColor: 'darkred', color: '#ffffff'}}>
<MDBContainer fluid className="containers">
    <MDBNavbarBrand style={{marginLeft:"1.5rem"}} href='/'>
        <img
            src={logo}  
            height='45'
            width='45'
            alt='cart logo'
            loading='lazy'
        />
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
                <MDBNavbarLink style={{color:'#ffffff', marginRight:"0.7rem",}} active aria-current='page' href='/' >
                   Home
                </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBNavbarLink  active aria-current='page' href='/products'>
                   Products
                </MDBNavbarLink>
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

