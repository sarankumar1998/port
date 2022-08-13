import React from 'react'
import blue from '../assets/pastele.jpg'
import FormsData from '../components/form/FormsData'


function Contact() {
  return (
    <div>
      <img src={blue} alt="" style={{ height: '50vh' }} />
      <h3 className='centered'> Contact us
      </h3>
      <div className='container'><FormsData /></div>
    </div>
  )
}

export default Contact


