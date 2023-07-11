import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';

function ClientMail() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    const response = await axios.get('https://api.example.com/data');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

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
      <button className='btn btn-primary btn-sm' onClick={handleGenerateOTP}>Generate OTP</button>
      <br/>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={e => setOTP(e.target.value)}
      />
      <button className='btn btn-success btn-sm' onClick={handleVerifyOTP}>Verify OTP</button>

      <p>{message}</p>

      <div>
      {loading ? (
        <Skeleton variant="rect" width={300} height={200} />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>{/* Render your fetched data here */}</div>
      )}
    </div>
    </div>
  );
}

export default ClientMail;
