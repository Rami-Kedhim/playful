
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface GenderFilterProps {
  selectedGenders: string[];
  onChange: (gender: string) => void;
}

const GenderFilter = ({ selectedGenders, onChange }: GenderFilterProps) => {
  const genderOptions = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "transgender", label: "Transgender" },
    { value: "non-binary", label: "Non-binary" }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Gender</h3>
      <div className="space-y-2">
        {genderOptions.map((gender) => (
          <div key={gender.value} className="flex items-center space-x-2">
            <Checkbox 
              id={`gender-${gender.value}`} 
              checked={selectedGenders.includes(gender.value)}
              onCheckedChange={() => onChange(gender.value)}
            />
            <Label 
              htmlFor={`gender-${gender.value}`}
              className="text-sm cursor-pointer"
            >
              {gender.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderFilter;
