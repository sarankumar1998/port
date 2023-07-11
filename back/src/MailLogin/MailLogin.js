const express = require('express');
const router = express();
const nodemailer = require('nodemailer');
const con = require("../db");



// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "saran07rose@gmail.com",
    pass: "ziypaabakqjjkwvb",
  }
});

// Generate and store OTP for a user
router.post('/generate-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP

  // Store the OTP in the database
  const query = `INSERT INTO maillogin (email, otp) VALUES (?, ?)`;
  con.query(query, [email, otp], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to generate OTP.' });
    }

    // Send the OTP to the user's email
    const mailOptions = {
      from: 'saran07rose@gmail.com',
      to: email,
      subject: 'OTP for Login',
      text: `Your OTP for login is: ${otp} ` 
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send OTP.' });
      }

      res.json({ message: 'OTP generated and sent successfully.' });
    });
  });
});


// Verify OTP for user login
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    // Check if the provided OTP matches the stored OTP for the user
    const query = `SELECT * FROM maillogin WHERE email = ? AND otp = ?`;
    con.query(query, [email, otp], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to verify OTP.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        // Delete the OTP from the database after successful verification
        const deleteQuery = `DELETE FROM maillogin WHERE email = ?`;
        con.query(deleteQuery, [email], (error, deleteResult) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Failed to verify OTP.' });
            }

            res.json({ message: 'OTP verified successfully.' });
        });
    });
});


module.exports = router;