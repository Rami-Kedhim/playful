
import { Slider } from "@/components/ui/slider";
import StarRating from "@/components/ui/StarRating";

interface RatingFilterProps {
  ratingMin: number;
  setRatingMin: (value: number) => void;
}

const RatingFilter = ({ ratingMin, setRatingMin }: RatingFilterProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">Min rating:</span>
        <StarRating rating={ratingMin} size={16} />
        <span className="text-sm ml-1">({ratingMin}+)</span>
      </div>
      <Slider
        defaultValue={[ratingMin]}
        min={0}
        max={5}
        step={0.5}
        value={[ratingMin]}
        onValueChange={(value) => setRatingMin(value[0])}
        className="mt-4"
      />
    </div>
  );
};

export default RatingFilter;
