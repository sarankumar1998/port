import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import './Navbar.css'


function Navbars() {
  
  return (
    <div className="App">
      <Navbar style={{background:'whitesmoke'}} sticky="top" expand='lg'>
        <div className="container">
        <Navbar.Brand>Triton</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link className="nav"  style={{color:'rgb(222, 28, 93)', fontWeight:'900'}} href="/">Home</Nav.Link>
          <Nav.Link className="nav"  style={{color:'black'}} href="/news">News us</Nav.Link>
        </Nav>
        </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Navbars;
