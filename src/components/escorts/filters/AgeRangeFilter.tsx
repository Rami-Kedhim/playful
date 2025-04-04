
import { Slider } from "@/components/ui/slider";

interface AgeRangeFilterProps {
  ageRange: [number, number];
  setAgeRange: (value: number[]) => void;
}

const AgeRangeFilter = ({ ageRange, setAgeRange }: AgeRangeFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Age Range</label>
      <div className="pt-2">
        <Slider
          value={ageRange}
          min={18}
          max={60}
          step={1}
          onValueChange={setAgeRange}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>{ageRange[0]} years</span>
          <span>{ageRange[1]} years</span>
        </div>
      </div>
    </div>
  );
};

export default AgeRangeFilter;
