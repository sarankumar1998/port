import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const apiBaseUrl = process.env.REACT_APP_USERS_SERVER + '/reset'; // Replace with your IP address


const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [resetSuccessful, setResetSuccessful] = useState(false);


  const handleResetPassword = async () => {
    try {
      // Use the verified token to reset the password
      const response = await axios.post(apiBaseUrl, { resetToken, newPassword });
      setMessage(response.data.message);
      setResetSuccessful(true);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(<p style={{ color: 'red' }}>{error.response.data.error}</p>);
      } else {
        setMessage(`${error.response.data.error}`);
      }
      setResetSuccessful(false); 

    }
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4" style={{fontWeight:"bold"}}>Reset account password</h4>
          <div className="mb-3">
            <label className="form-label">New Password:</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-warning text-dark"  disabled={resetSuccessful}  onClick={handleResetPassword}>
              Reset Password
            </button>
          </div>
          {message && <p className="mt-3 text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
