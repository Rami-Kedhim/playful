
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

interface RatingFilterProps {
  ratingMin: number;
  setRatingMin: (rating: number) => void;
}

const RatingFilter = ({ ratingMin, setRatingMin }: RatingFilterProps) => {
  const stars = [1, 2, 3, 4, 5];
  
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Minimum Rating</Label>
      <div className="flex items-center space-x-2">
        <Slider 
          value={[ratingMin]} 
          min={0} 
          max={5} 
          step={0.5} 
          onValueChange={(values) => setRatingMin(values[0])}
        />
        <span className="text-sm font-medium ml-2 w-10">{ratingMin}</span>
      </div>
      <div className="flex mt-2">
        {stars.map((star) => (
          <Star 
            key={star}
            className={`h-4 w-4 ${star <= ratingMin ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
