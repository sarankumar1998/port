import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ rating, onRatingChange }) => {
  const handleStarClick = (newRating) => {
    onRatingChange(newRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <FontAwesomeIcon
          key={starNumber}
          icon={starNumber <= rating ? faStar : faStarRegular}
          onClick={() => handleStarClick(starNumber)}
        />
      ))}
    </div>
  );
};

export default StarRating;
