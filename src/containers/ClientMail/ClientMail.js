import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import Navbars from "../../components/Navbars"
import { Link, useNavigate } from "react-router-dom";


function ClientMail() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState(true);
  const [messageStyle, setMessageStyle] = useState({});
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0); 

  const apiBaseUrl = process.env.REACT_APP_GENOTP_V6 
  const apiBaseUrl2 = process.env.REACT_APP_VEROTP_V6 

  const handleGenerateOTP = () => {
    axios
      .post(apiBaseUrl, { email })
      .then(response => {
        setMessage('Generating OTP...');
        setCount(5 * 60); // Set count to 5 minutes (300 seconds)
        setMessage(response.data.message);
        setMessageStyle({ color: 'green' });
      })
      .catch(error => {
        console.error(error);
        setMessage('Failed to generate OTP.');
        setMessageStyle({ color: 'red' });
        setCount(0); 
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
      .post(apiBaseUrl2, { email, otp })
      .then(response => {
        setMessage(response.data.message);
        if (error.response.status === 200) {
          setMessageStyle({ color: 'green' });
        }
        navigate("/One");
      })
      .catch(error => {
        setMessage(error.response.data.message);
        if (error.response.status === 400 || error.response.status === 500) {
          setMessageStyle({ color: 'red' });
        }
      });
  };

  return (
    <>
      <div style={{ margin: '5rem' }}>
        <h1>Login via OTP</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />{' '}
        &nbsp;
        <button className="btn btn-primary btn-sm" disabled={count > 0 ? true : ""} onClick={handleGenerateOTP}>
          Generate OTP
        </button>
        <br />

        <div className="mt-3">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOTP(e.target.value)}
          />{' '}
          &nbsp;
          <button className="btn btn-success btn-sm" disabled={message === "OTP verified successfully." && true} onClick={handleVerifyOTP}>
            Verify OTP
          </button>
        </div>
        {message === "OTP generated and sent successfully." ? <div>{count > 0 && (
          <p>
            {Math.floor(count / 60)}:{(count % 60).toString().padStart(2, '0')} (expires in 5 min.)
          </p>
        )}</div> : ""}

        {message && (
          <p style={messageStyle}>{message}</p>
        )}

        <div></div>
      </div>
    </>
  );
}

export default ClientMail;

