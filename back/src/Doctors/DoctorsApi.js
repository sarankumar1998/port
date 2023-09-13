const express = require("express");
const Router = express.Router();
const con = require("../db");

Router.post('/slots', (req, res) => {
    const { date, start_time, end_time } = req.body;
    const query = 'INSERT INTO doctorslots (date, start_time, end_time) VALUES (?, ?, ?)';
  
    con.query(query, [date, start_time, end_time], (err, result) => {
      if (err) {
        console.error('Error creating slot:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Slot created successfully' });
      }
    });
  });
  

// Update freeze hours for a slot
Router.put('/update-slot/:id/freeze-hours', (req, res) => {
  const slotId = req.params.id;
  const { freezeHours } = req.body; // An array of hours to be frozen

  const query = 'UPDATE doctorslots SET freezed_hours = ? WHERE id = ?';

  con.query(query, [JSON.stringify(freezeHours), slotId], (err, result) => {
    if (err) {
      console.error('Error updating freeze hours:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Freeze hours updated successfully' });
    }
  });
});


  // Get available slots
  Router.get('/available-slots', (req, res) => {
    const query = 'SELECT * FROM doctorslots WHERE booked = false';
  
    con.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching available slots:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  Router.post('/book-appointment', (req, res) => {
    const { selectedDate } = req.body; // Assuming the selected date is sent in the request body

    const query = 'UPDATE doctorslots SET booked = true WHERE date = ?';
  
    con.query(query, [selectedDate], (err, result) => {
      if (err) {
        console.error('Error booking appointment:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Appointment booked successfully' });
      }
    });
});
 
  

  module.exports = Router;