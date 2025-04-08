
import { Slider } from "@/components/ui/slider";

interface HeightRangeFilterProps {
  heightRange: [number, number];
  setHeightRange: (range: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

const HeightRangeFilter = ({ 
  heightRange, 
  setHeightRange,
  min = 140,
  max = 200,
  step = 1
}: HeightRangeFilterProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-sm font-medium">Height (cm)</h3>
        <span className="text-sm text-muted-foreground">
          {heightRange[0]}-{heightRange[1]} cm
        </span>
      </div>
      
      <Slider
        defaultValue={heightRange}
        min={min}
        max={max}
        step={step}
        onValueChange={setHeightRange}
        className="py-2"
      />
    </div>
  );
};

export default HeightRangeFilter;
