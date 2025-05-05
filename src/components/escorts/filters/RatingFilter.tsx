
import React from "react";
import { Label } from "@/components/ui/label";
import { Rating } from "@/components/ui/rating";

interface RatingFilterProps {
  ratingMin: number;
  setRatingMin: (rating: number) => void;
}

const RatingFilter = ({ ratingMin, setRatingMin }: RatingFilterProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Minimum Rating</Label>
      <Rating 
        value={ratingMin} 
        onChange={setRatingMin} 
        max={5} 
        size="sm"
        className="flex" 
      />
    </div>
  );
};

export default RatingFilter;
