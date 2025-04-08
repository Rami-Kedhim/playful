
import { Slider } from "@/components/ui/slider";

interface WeightRangeFilterProps {
  weightRange: [number, number];
  setWeightRange: (range: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

const WeightRangeFilter = ({ 
  weightRange, 
  setWeightRange,
  min = 40,
  max = 120,
  step = 1
}: WeightRangeFilterProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-sm font-medium">Weight (kg)</h3>
        <span className="text-sm text-muted-foreground">
          {weightRange[0]}-{weightRange[1]} kg
        </span>
      </div>
      
      <Slider
        defaultValue={weightRange}
        min={min}
        max={max}
        step={step}
        onValueChange={setWeightRange}
        className="py-2"
      />
    </div>
  );
};

export default WeightRangeFilter;
