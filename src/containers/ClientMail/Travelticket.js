import React, { useRef, useState } from 'react';
import Navbars from '../../components/Navbars';
import "./Travelticket.css";
import axios from 'axios';
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";

const apiBaseUrl = process.env.REACT_APP_PASS_V7

export default function Travelticket() {

  if (typeof window !== "undefined") {
    injectStyle();
  }

  const [route, setRoute] = useState(JSON.parse(sessionStorage.getItem('user')) || {});
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [persons, setPersons] = useState([]);
  const [isDataSaved, setIsDataSaved] = useState(false);

  const AddPersons = () => {
    const Obj = { name, age: parseInt(age), userId: route.id };
    if (Obj && persons.length < 6) {
      setPersons([...persons, Obj]);
      setAge('');
      setName('');
      setIsDataSaved(false);
    } else {
      toast("You Have Selected Maximum number of Passengers, You cannot select more.")
    }
  };

  const handleSave = () => {
    const data = {
      persons,
    };

    axios
      .post(apiBaseUrl, data)
      .then((response) => {
        toast(`${response.data.success}`)
        console.log('Data saved successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        toast(`${error.response.data.error}`)

      });
  };

  const removePersons = (id) => {
    const updatedPersons = [...persons];
    updatedPersons.splice(id, 1);
    setPersons(updatedPersons);
  };

  const isSaveButtonDisabled = persons.every((e) => e.name.length === 0 || isDataSaved);


  return (
    <div>
      <ToastContainer />
      <div className="container" style={{ marginTop: '7rem' }}>
        <div className="top-0 end-0 p-2">
          <h5 className="text-black fw-bold">Passenger Details</h5>
        </div>
        <div className='glass-card p-4'>
          <div className="mb-3 d-flex align-items-center">
            <input
              className="form-control me-2"
              name='name'
              value={name}
              placeholder='Enter name'
              style={{ borderColor: '#007bff' }}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="form-control"
              name='age'
              value={age}
              placeholder='Enter age'
              style={{ borderColor: '#007bff' }}
              onChange={(e) => setAge(e.target.value)}
            />
            <button onClick={AddPersons} className='btn btn-primary ms-2'>
              Add
            </button>
          </div>
          {persons.length > 0 && (
            <div className='mt-4'>
              <h6>Passengers</h6>
              {persons.map((e, id) => (
                <div key={id} className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <input className="form-control me-2" value={e.name} disabled />
                    <input className="form-control me-2" value={e.age} disabled />
                  </div>
                  <button onClick={() => removePersons(id)} className='btn btn-sm btn-danger'>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-3">
            <button className='btn btn-warning btn-sm' disabled={isSaveButtonDisabled} onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
