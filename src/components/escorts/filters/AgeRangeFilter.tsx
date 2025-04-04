
import { Slider } from "@/components/ui/slider";

interface AgeRangeFilterProps {
  ageRange: [number, number];
  setAgeRange: (values: number[]) => void;
}

const AgeRangeFilter = ({ ageRange, setAgeRange }: AgeRangeFilterProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Min: {ageRange[0]}</span>
        <span>Max: {ageRange[1]}</span>
      </div>
      <Slider
        defaultValue={ageRange}
        min={18}
        max={60}
        step={1}
        value={ageRange}
        onValueChange={setAgeRange}
        className="mt-6"
      />
    </div>
  );
};

export default AgeRangeFilter;
