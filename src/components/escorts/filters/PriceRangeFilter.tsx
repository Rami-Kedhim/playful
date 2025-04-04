
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface PriceRangeFilterProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}

const PriceRangeFilter = ({ priceRange, setPriceRange }: PriceRangeFilterProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Price Range</label>
        <Badge variant="outline" className="font-normal">
          {priceRange[0]}-{priceRange[1]} LC
        </Badge>
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
