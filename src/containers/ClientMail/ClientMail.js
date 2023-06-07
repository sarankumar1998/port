import React, { useState } from 'react';
import axios from 'axios';

const ClientMail = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/verify-otp', { email, otp });
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setMessage('Failed to verify OTP');
    }
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/send-otp', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setMessage('Failed to send OTP');
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={handleEmailChange} required />

      <label>OTP:</label>
      <input type="text" value={otp} onChange={handleOtpChange} required />

      <button type="submit">Verify OTP</button>
    </form>

    <button onClick={handleSendOtp}>Send OTP</button>

    <p>{message}</p>
  </div>
  )}
   export default ClientMail