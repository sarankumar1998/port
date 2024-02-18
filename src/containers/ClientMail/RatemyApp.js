import React, { useState } from 'react';
import StarRating from '../ClientMail/StarRating';
import Navbars from '../../components/Navbars';

export default function RatemyApp() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (newRating) => {
    if (!submitted) {
      setRating(newRating);
    }
  };

  const handleSubmitRating = () => {
    setSubmitted(true);

  };

  return (
    <div>
      <Navbars />
      <div className='container' style={{ marginTop: '8rem' }}>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='text-center'>
              <h3 className='mb-4' style={{ fontWeight: 'bold' }}>
                Rate Our App
              </h3>
              <p className='mb-3'>Your Rating: {rating} stars</p>
              <StarRating rating={rating} onRatingChange={handleRatingChange} />
              {!submitted && (
                <button
                  className='btn btn-primary mt-3'
                  onClick={handleSubmitRating}
                >
                  Submit Rating
                </button>
              )}
              {submitted && (
                <p className='text-success mt-3'>Rating submitted. Thank you!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
