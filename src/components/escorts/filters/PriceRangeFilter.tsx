
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}

const PriceRangeFilter = ({ priceRange, setPriceRange }: PriceRangeFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Price Range (LC)</label>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{priceRange[0]}</span>
        <span>{priceRange[1]}</span>
      </div>
      <Slider
        defaultValue={priceRange}
        min={0}
        max={1000}
        step={10}
        value={priceRange}
        onValueChange={setPriceRange}
        className="mt-6"
      />
    </div>
  );
};

export default PriceRangeFilter;
