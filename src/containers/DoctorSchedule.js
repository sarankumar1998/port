import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState } from 'react'
import Navbars from '../components/Navbars';
import { Chip } from '@mui/material';



const apiBaseUrl1 = 'http://localhost:4000/api/v8/slots'
const apiBaseUrl2 = 'http://localhost:4000/api/v8/available-slots'
const apiBaseUrl3 = 'http://localhost:4000//api/v8/update-slot/${slotId}/freeze-hours'
function DoctorSchedule() {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');



  useEffect(() => {
    fetchSlots();

  }, []);

  const fetchSlots = () => {
    axios.get(apiBaseUrl2)
      .then(response => {
        setSlots(response.data);
      })
      .catch(error => {
        console.error('Error fetching available slots:', error);
      });
  };

  const handleCreateSlot = () => {

    axios.post(apiBaseUrl1, {
      date: selectedDate,
      start_time: selectedStartTime,
      end_time: selectedEndTime
    })
      .then(response => {
        console.log(response.data.message);
        fetchSlots();
      })
      .catch(error => {
        console.error('Error creating slot:', error);
      });
  };



  const generateTimeSlots = (start, end) => {
    const startTime = moment(start, 'HH:mm');
    const endTime = moment(end, 'HH:mm');
    const timeSlots = [];

    while (startTime.isBefore(endTime)) {
      timeSlots.push(startTime.format('HH:mm A'));
      startTime.add(1, 'hour');
    }

    return timeSlots;
  };



  const updateFreezeHours = (slotId, hoursToFreeze) => {
    // Send a PUT request to update freeze hours for a specific slot
    axios.put(`http://localhost:4000/api/v8/update-slot/${slotId}/freeze-hours`, {
      freezeHours: hoursToFreeze
    })
      .then(response => {
        console.log(response.data.message);
        // Refresh the available slots or perform any other necessary actions
      })
      .catch(error => {
        console.error('Error updating freeze hours:', error);
      });
  };


  const currentDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);



  return (
    <div>
      <Navbars />
      <div className="App px-3" style={{ marginTop: '6rem' }}>
        <h3>Doctor Appointment Booking System</h3>
        <div className="create-slot mt-4">
          <div className="row">
            <div className="col-md col-xl-2 col-sm-4">
              <h5>Create Time Slot</h5>
            </div>
            <div className="col-md col-sm-4">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                min={currentDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="col-md col-sm-9">
              <label htmlFor="start-time">Start Time:</label>
              <input
                type="time"
                id="start-time"
                value={selectedStartTime}
                onChange={(e) => setSelectedStartTime(e.target.value)}
              />
            </div>
            <div className="col-md col-sm-4">
              <label htmlFor="end-time">End Time:</label>
              <input
                type="time"
                id="end-time"
                value={selectedEndTime}
                onChange={(e) => setSelectedEndTime(e.target.value)}
              />
            </div>
            <div className="col-md col-sm-4">
              <button style={{ fontWeight: 'bold' }} className='btn btn-info' onClick={handleCreateSlot}>Create Slot</button>
            </div>
          </div>
        </div>
      </div>

      <div className="slots mt-5 px-3">
        <h2>Available Slots</h2>
        <div className="row">
          {slots.map(slot => (
            <div key={slot.id} className="col-md-4 col-xl-9 col-sm-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{moment(slot.date).format('MMM D')}</h5>
                  <div className="row">
                    {generateTimeSlots(slot.start_time, slot.end_time).map(time => (
                      <div
                        key={time}
                        className="col-xl-4 col-md-4 col-sm-2"
                        style={{
                          color: slot.freezed_hours?.includes(time) ? 'red' : 'black',
                          marginBottom: '10px',
                          textAlign: 'center'
                        }}
                      >
                        {time}{' '}
                        <Chip
                          label={slot.freezed_hours?.includes(time) ? 'Freezed' : 'Freeze'}
                          onClick={() => updateFreezeHours(slot.id, [time])}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default DoctorSchedule;

