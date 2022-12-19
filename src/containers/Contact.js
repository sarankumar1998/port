import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import blue from '../assets/pastele.jpg'
import FormsData from '../components/form/FormsData'
import { getAPI } from './API';


function Contact() {

  const [det, setDet] = useState([])

  const navigate  = useNavigate()

  useEffect(() => {
    if (!!!localStorage.getItem("user")) {
      navigate("/login");
    }
    
  }, [navigate]);


  useEffect(() => {
    getAPI.GetSpecialApi()
      .then((res) => {
        setDet(res.data)
      })
  },[])

  console.log(det);

  // const getAll = () => {
  //   getAPI.GetSpecialApi()
  // }


  return (
    <div>
      <img src={blue} alt="" style={{ height: '50vh' }} />
      <h3 className='centered'> Contact us
      </h3>
      <div className='container'><FormsData /></div>
{det.name}

      
    </div>
  )
}

export default Contact


