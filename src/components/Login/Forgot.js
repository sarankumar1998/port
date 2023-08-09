import React, { useState } from 'react';
import axios from 'axios';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Link, useNavigate } from "react-router-dom";

const apiBaseUrl = 'http://192.168.10.117:4000/api/v2/forgot'; // Replace with your IP address


const Forgot = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [mailSuccessful, setmailSuccessful] = useState(false);

    const history = useNavigate();

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post(apiBaseUrl, { email });
            setMessage(<span style={{ color: 'green' }}>{response.data.message}</span>);
            setmailSuccessful(true); 
        } catch (error) {
            if (error.response) {
                setMessage(<span style={{ color: 'red' }}>{error.response.data.error}</span>);
            }
            setmailSuccessful(false)
        }
    };

    const handleBackToLogin = () => {
        history('/login');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '500px', height: '400px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.1)' }}>
                <div className="container">
                    <h4 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Forgot Password</h4>
                    <p className='text-center'>Enter your registered email address and we'll send you a link to reset your password</p>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="text-center">
                            <button
                            disabled={mailSuccessful} 
                                type="button"
                                className="btn btn-primary btn-block w-100"
                                onClick={handleForgotPassword}
                            >
                                Send
                            </button>
                            {message && <p className='text-center mt-3'>{message}</p>}

                            <div className='mt-5' onClick={handleBackToLogin} style={{ cursor: 'pointer' }}>
                                <p style={{ textDecoration: 'underline', display: 'inline-block' }}>
                                    <KeyboardArrowLeftIcon /> Back to Login
                                </p>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Forgot;
