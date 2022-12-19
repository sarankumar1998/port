import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import './Navbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


function Navbars() {

  const stringifiedPerson = localStorage.getItem("user");
  const personAsObjectAgain = JSON.parse(stringifiedPerson);
  console.log(personAsObjectAgain);
  const [users, setUsers] = useState(personAsObjectAgain);

//   useEffect(() => {
// setUsers()
//   }, [])
  

  const handleClick = () => {
    let confirm = window.confirm("Are you sure you want to logout");
    if(confirm){
    localStorage.clear()
    window.location.reload()
}
}
  
  return (
    <div className="App">
      <Navbar style={{background:'whitesmoke'}} sticky="top" expand='lg'>
        <div className="container">
        <Navbar.Brand>DenK</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link className="nav"  style={{color:'rgb(222, 28, 93)', fontWeight:'900'}} href="/">Home</Nav.Link>
          <Nav.Link className="nav"  style={{color:'black'}} href="/skills">Skills</Nav.Link>
          <Nav.Link className="nav"  style={{color:'black'}} href="/about">About</Nav.Link>
          <Nav.Link className="nav"  style={{color:'black'}} href="/contact">Contact us</Nav.Link>
        </Nav>

        </Navbar.Collapse>
        <button type="" onClick={handleClick}>Logout</button>
        </div>

        {/* <Tooltip title={users.username}>
      <IconButton>
        <AccountCircleIcon />
      </IconButton>
    </Tooltip> */}

      </Navbar>
    </div>
  );
}

export default Navbars;
