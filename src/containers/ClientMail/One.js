import React, { useState } from 'react';
import Navbars from '../../components/Navbars';
import axios from 'axios';

export default function One() {
  const [route, setRoute] = useState(JSON.parse(sessionStorage.getItem('user')) || {});
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [persons, setPersons] = useState([]);

  const AddPersons = () => {
    const Obj = { name, age: parseInt(age), userId: route.id };
    if (Obj && persons.length < 6) {
      setPersons([...persons, Obj]);
      setAge('');
      setName('');
    }
  };

  const handleSave = () => {
    const data = {
      persons,
    };

    axios
      .post('http://localhost:4000/api/v7/pass', data)
      .then((response) => {
        console.log('Data saved successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };

  const removePersons = (id) => {
    const updatedPersons = [...persons];
    updatedPersons.splice(id, 1);
    setPersons(updatedPersons);
  };

  return (
    <div>
      <Navbars />
      <div style={{ margin: '5rem' }}>
        <h4 className='text-info'>Welcome</h4>
        <div>
          <label>Name:</label>
          <input name='name' value={name} placeholder='name' onChange={(e) => setName(e.target.value)} /> <br />
          <label>Age:</label>
          <input name='age' value={age} className='mt-3' placeholder='age' onChange={(e) => setAge(e.target.value)} />
          &nbsp;
          <button onClick={AddPersons} className='btn btn-success'>
            Add
          </button>
          {persons.length > 0 && (
            <div className='mt-5'>
              <h4>Passengers</h4>
              {persons.map((e, id) => (
                <div key={id}>
                  {e.name} &nbsp; {e.age} &nbsp;
                  <button onClick={() => removePersons(id)} className='btn btn-sm btn-danger'>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <div>
            <button className='btn btn-warning btn-sm' onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
