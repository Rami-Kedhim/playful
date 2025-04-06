
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxRating = 5,
  size = 16
}) => {
  // Create array of stars
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5

  // Create each star
  for (let i = 1; i <= maxRating; i++) {
    if (i <= roundedRating) {
      // Full star
      stars.push(
        <Star 
          key={i} 
          size={size} 
          className="fill-yellow-400 text-yellow-400" 
        />
      );
    } else if (i - 0.5 === roundedRating) {
      // Half star - in a simple implementation we'll just use a lighter color
      stars.push(
        <Star 
          key={i} 
          size={size} 
          className="fill-yellow-300/50 text-yellow-400" 
        />
      );
    } else {
      // Empty star
      stars.push(
        <Star 
          key={i} 
          size={size} 
          className="text-gray-300" 
        />
      );
    }
  }

  return (
    <div className="flex">
      {stars}
    </div>
  );
};

export default StarRating;
