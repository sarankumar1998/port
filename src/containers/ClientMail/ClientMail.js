import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';

function ClientMail() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState({});

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [count, setCount] = useState(0); // Start count from 0

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.example.com/data');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      // setError(error.message);
      setLoading(false);
    }
  };

  const handleGenerateOTP = () => {
    setMessage('Generating OTP...');
    setCount(5 * 60); // Set count to 5 minutes (300 seconds)
    axios
      .post('http://localhost:4000/api/v6/generate-otp', { email })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error(error);
        setMessage('Failed to generate OTP.');
        setCount(0); // Reset count to 0
      });
  };

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [count]);

  const handleVerifyOTP = () => {
    axios
      .post('http://localhost:4000/api/v6/verify-otp', { email, otp })
      .then(response => {
        console.log(response.status);
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error(error.response.data.message);
        setMessage(error.response.data.message);
        if (error.response.status === 400 || error.response.status === 500) {
          setMessageStyle({ color: 'red' });
        }
      });
  };

  return (
    <div style={{ margin: '3rem' }}>
      <h1>Login via OTP</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />{' '}
      &nbsp;
      <button className="btn btn-primary btn-sm" onClick={handleGenerateOTP}>
        Generate OTP
      </button>
      <br />
      <p>
        {Math.floor(count / 60)}:{(count % 60).toString().padStart(2, '0')}
      </p>

      <div className="mt-3">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={e => setOTP(e.target.value)}
        />{' '}
        &nbsp;
        <button className="btn btn-success btn-sm" onClick={handleVerifyOTP}>
          Verify OTP
        </button>
      </div>

      <p style={messageStyle}>{message}</p>
    </div>
  );
}

export default ClientMail;
