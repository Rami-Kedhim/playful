
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

interface RatingFilterProps {
  ratingMin: number;
  setRatingMin: (value: number) => void;
}

const RatingFilter = ({ ratingMin, setRatingMin }: RatingFilterProps) => {
  const handleRatingChange = (values: number[]) => {
    setRatingMin(values[0]);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`h-4 w-4 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Minimum Rating</Label>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm">{ratingMin === 0 ? 'Any' : renderStars(ratingMin)}</span>
      </div>
      
      <Slider
        defaultValue={[ratingMin]}
        min={0}
        max={5}
        step={1}
        value={[ratingMin]}
        onValueChange={handleRatingChange}
      />
      
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>Any</span>
        <span>5 Stars</span>
      </div>
    </div>
  );
};

export default RatingFilter;
