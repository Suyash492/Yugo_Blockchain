import React, { useState } from 'react';
// import { FaStar } from '@fortawesome/fontawesome-free';
import { FaStar } from 'react-icons/fa';




const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="cursor-pointer"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      {rating && (
        <p className="ml-2 font-bold text-gray-800">{`You rated this ride ${rating} star${rating > 1 ? "s" : ""}`}</p>
      )}
    </div>
  );
};

export default StarRating;
