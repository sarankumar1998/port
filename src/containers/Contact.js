import React from 'react'
import blue from '../assets/pastele.jpg'
import FormsData from '../components/form/FormsData'



function Contact() {

  const token = sessionStorage.getItem("token");

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const userId = decodedToken.id;
  return (
    <div>
      <img src={blue} alt="" style={{ height: '50vh' }} />
      <h3 className='centered'> Contact us
      </h3>
      <div className='container'><FormsData userId={userId} />



      </div>
    </div>
  )
}

export default Contact


