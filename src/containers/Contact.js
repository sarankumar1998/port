import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import blue from '../assets/pastele.jpg'
import FormsData from '../components/form/FormsData'
import { getAPI } from './API';
import Navbars from "../components/Navbars";


function Contact({usersId}) {

  const navigate  = useNavigate()
  useEffect(() => {
    if (!!!localStorage.getItem("user") ) {
      navigate("/login");
    }    
  }, [navigate]);



  return (
    <div>
      <Navbars />
      <img src={blue} alt="" style={{ height: '50vh' }} />
      <h3 className='centered'> Contact us
      </h3>
      <div className='container'><FormsData />

</div>
    </div>
  )
}

export default Contact


