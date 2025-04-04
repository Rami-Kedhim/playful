
import { Slider } from "@/components/ui/slider";
import { StarIcon } from "lucide-react";

interface RatingFilterProps {
  ratingMin: number;
  setRatingMin: (value: number) => void;
}

const RatingFilter = ({ ratingMin, setRatingMin }: RatingFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Minimum Rating</label>
      <div className="flex items-center gap-2">
        <Slider
          value={[ratingMin]}
          min={0}
          max={5}
          step={0.5}
          onValueChange={(value) => setRatingMin(value[0])}
          className="flex-grow"
        />
        <div className="flex items-center gap-1 min-w-[40px]">
          <span className="text-amber-500"><StarIcon size={14} /></span>
          <span className="text-sm">{ratingMin}</span>
        </div>
      </div>
    </div>
  );
};

export default RatingFilter;
