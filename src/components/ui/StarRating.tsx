
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  showEmpty?: boolean;
  color?: string;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = 16,
  className = "",
  showEmpty = true,
  color = "text-yellow-400",
}: StarRatingProps) => {
  // Ensure the rating is within the valid range
  const normalizedRating = Math.max(0, Math.min(rating, maxRating));
  
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxRating; i++) {
      if (i <= Math.floor(normalizedRating)) {
        // Full star
        stars.push(
          <Star 
            key={i} 
            size={size} 
            className={cn(color)} 
            fill="currentColor"
          />
        );
      } else if (i - 0.5 <= normalizedRating) {
        // Half star
        stars.push(
          <StarHalf
            key={i}
            size={size}
            className={cn(color)}
            fill="currentColor"
          />
        );
      } else if (showEmpty) {
        // Empty star
        stars.push(
          <Star 
            key={i} 
            size={size} 
            className="text-gray-300 dark:text-gray-600" 
          />
        );
      }
    }
    
    return stars;
  };

  return (
    <div className={cn("flex items-center", className)}>
      {renderStars()}
    </div>
  );
};

export default StarRating;
