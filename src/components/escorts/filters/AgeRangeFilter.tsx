
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface AgeRangeFilterProps {
  ageRange: [number, number];
  setAgeRange: (values: number[]) => void;
}

const AgeRangeFilter = ({ ageRange, setAgeRange }: AgeRangeFilterProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Age Range</label>
        <Badge variant="outline" className="font-normal">
          {ageRange[0]}-{ageRange[1]} years
        </Badge>
      </div>
      <Slider
        defaultValue={ageRange}
        min={21}
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
