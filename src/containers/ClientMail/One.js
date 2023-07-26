import React, { useEffect, useState } from 'react'
import Navbars from '../../components/Navbars'
import axios from 'axios'

export default function One() {



  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [persons, setPersons] = useState([])
  const [pass, setPass] = useState([])
  console.log(persons);

  // const AddPersons = () => {
  //   const Obj = { name, age: parseInt(age) }
  //   if (Obj && persons.length < 6) {
  //     setPersons([Obj, ...persons])
  //     setAge('')
  //     setName('')
  //   }
  // }


  useEffect(() => {
    PassengerDetails()
  }, [])


  const PassengerDetails = () => {
    axios.get("http://localhost:4000/api/v7/persons")
      .then((res) => {
        setPass(res.data)
      })
  }

  const AddPersons = () => {
    let passer = {
      name: name,
      age: age
    }
    axios.post(`http://localhost:4000/api/v7/pass`, passer)
      .then(res => {
        if (res.status === 200) {
          sessionStorage.setItem(
            "Passengers",
            JSON.stringify({
              state: { passID: res.data }
            })
          );
        }


      })
  }



  // const removePersons = (ind) => {
  //   const Updatepersons = [...persons]
  //   Updatepersons.splice(ind, 1)
  //   setPersons(Updatepersons)
  // }

  const RemovePass = (id) => {
    axios.delete('http://localhost:4000/api/v7/persons/' + id)
      .then((res) => {
        console.log("done");
        setPass(prev => prev.filter(pass => pass.id !== id))
      })
  }






  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleButtonClick = (action) => {
    switch (action) {
      case 'increment':
        handleIncrement();
        break;
      case 'decrement':
        handleDecrement();
        break;
      case 'reset':
        handleReset();
        break;
      default:
        break;
    }
  };

  return (
    <div>

      <Navbars />   <div style={{ margin: '5rem' }}>
        <h4 className='text-info'>Welcome</h4>
        {/* <p>{ogis}</p> */}

        <div>
          <p>Count: {count}</p>
          <button onClick={() => handleButtonClick('increment')}>Increment</button>
          <button onClick={() => handleButtonClick('decrement')}>Decrement</button>
          <button onClick={() => handleButtonClick('reset')}>Reset</button>
        </div>


        <div>  <label>Name:</label> <input name='name' value={name} placeholder='name' onChange={(e) => setName(e.target.value)} /> <br />
          <label>Age:</label>   <input name='age' value={age} className='mt-3' placeholder='age' onChange={(e) => setAge(e.target.value)} /> &nbsp;
          <button onClick={AddPersons} className='btn btn-success'>Add</button>


          {pass.length > 0 &&
            <div className='mt-5'>
              <h4>Passengers</h4>
              {pass.map((e) => {
                return (
                  <><ul>{e.name} &nbsp; {e.age}               &nbsp;

                    <button onClick={() => RemovePass(e.id)} className='btn btn-sm btn-danger'>Remove</button></ul>
                  </>

                )


              })}
            </div>}


        </div>
      </div>





    </div>

  )
}
