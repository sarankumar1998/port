import React from 'react'
import Navbars from '../../components/Navbars'

export default function One() {


  var ogi = [1, 2, 3, 4, 5, 6, 7, 8]
  // var ogis = ogi.splice(1,5)

  var ogiss = ogi.slice()


  return (
    <div>

      <Navbars />   <div style={{ margin: '5rem' }}>
        <h4 className='text-info'>Welcome</h4>
        {/* <p>{ogis}</p> */}
        <p>{ogiss}</p>
      </div>
    </div>

  )
}


