import React, { useState } from 'react';
import axios from 'axios';

function ClientMail() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateOTP = () => {
    axios
      .post('http://localhost:4000/api/v6/generate-otp', { email })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error(error);
        setMessage('Failed to generate OTP.');
      });
  };

  const handleVerifyOTP = () => {
    axios
      .post('http://localhost:4000/api/v6/verify-otp', { email, otp })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error(error);
        setMessage('Failed to verify OTP.');
      });
  };

  return (
    <div>
      <h1>Login via OTP</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleGenerateOTP}>Generate OTP</button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={e => setOTP(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Verify OTP</button>

      <p>{message}</p>
    </div>
  );
}

export default ClientMail;
