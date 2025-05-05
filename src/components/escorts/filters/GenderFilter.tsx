
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface GenderFilterProps {
  selectedGenders: string[];
  onChange: (gender: string) => void;
}

const GenderFilter: React.FC<GenderFilterProps> = ({ selectedGenders, onChange }) => {
  const genders = ["Male", "Female", "Non-Binary", "Transgender"];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Gender</h3>
      <div className="grid grid-cols-2 gap-2">
        {genders.map((gender) => (
          <div key={gender} className="flex items-center space-x-2">
            <Checkbox
              id={`gender-${gender}`}
              checked={selectedGenders.includes(gender)}
              onCheckedChange={() => onChange(gender)}
            />
            <Label
              htmlFor={`gender-${gender}`}
              className="text-sm cursor-pointer"
            >
              {gender}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderFilter;
