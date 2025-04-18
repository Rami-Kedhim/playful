
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface HairColorFilterProps {
  selectedHairColors: string[];
  toggleHairColor: (hairColor: string) => void;
}

const HAIR_COLOR_OPTIONS = [
  'Blonde',
  'Brown',
  'Black',
  'Red',
  'Gray',
  'Other'
];

const HairColorFilter = ({ selectedHairColors, toggleHairColor }: HairColorFilterProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium mb-2">Hair Color</h3>
      
      <div className="space-y-2">
        {HAIR_COLOR_OPTIONS.map(hairColor => (
          <div key={hairColor} className="flex items-center space-x-2">
            <Checkbox 
              id={`hair-color-${hairColor}`}
              checked={selectedHairColors.includes(hairColor)}
              onCheckedChange={() => toggleHairColor(hairColor)}
            />
            <Label 
              htmlFor={`hair-color-${hairColor}`}
              className="text-sm capitalize cursor-pointer"
            >
              {hairColor}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HairColorFilter;
