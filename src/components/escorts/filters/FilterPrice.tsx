
import React from "react";
import { Slider } from "@/components/ui/slider";

interface FilterPriceProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const FilterPrice: React.FC<FilterPriceProps> = ({ priceRange, setPriceRange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Price Range</span>
        <span className="text-sm">
          ${priceRange[0]} - ${priceRange[1]}
        </span>
      </div>
      <Slider
        defaultValue={[priceRange[0], priceRange[1]]}
        max={1000}
        step={50}
        onValueChange={(value) => setPriceRange([value[0], value[1]])}
        className="py-4"
      />
    </div>
  );
};

export default FilterPrice;
