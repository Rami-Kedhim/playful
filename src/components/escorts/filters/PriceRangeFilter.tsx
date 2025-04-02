
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}

const PriceRangeFilter = ({ priceRange, setPriceRange }: PriceRangeFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Price Range (LC)</label>
      <div className="pt-2">
        <Slider
          value={priceRange}
          min={0}
          max={500}
          step={10}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>{priceRange[0]} LC</span>
          <span>{priceRange[1]} LC</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
