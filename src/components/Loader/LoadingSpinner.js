import React from "react";
import "./LoadingSpinner.css";
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = (props) => {
  return (
    <>
      <div class="spinner">
    <CircularProgress/>
      </div>
      <p style={{fontWeight:'550'}} className="text-center">{props.message}</p>
    </>
  );
};

export default LoadingSpinner;
