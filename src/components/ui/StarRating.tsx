
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

const StarRating = ({ rating, size = 16, className = "" }: StarRatingProps) => {
  // Function to render stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`star-${i}`} 
          className="text-yellow-500 fill-yellow-500" 
          size={size} 
        />
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <StarHalf 
          key="half-star" 
          className="text-yellow-500 fill-yellow-500" 
          size={size} 
        />
      );
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-star-${i}`} 
          className="text-gray-300" 
          size={size} 
        />
      );
    }
    
    return stars;
  };

  return (
    <div className={`flex items-center ${className}`}>
      {renderStars()}
    </div>
  );
};

export default StarRating;
