
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface OrientationFilterProps {
  selectedOrientations: string[];
  onChange: (orientation: string) => void;
}

const OrientationFilter = ({ selectedOrientations, onChange }: OrientationFilterProps) => {
  const orientationOptions = [
    { value: "straight", label: "Straight" },
    { value: "bisexual", label: "Bisexual" },
    { value: "gay", label: "Gay" },
    { value: "lesbian", label: "Lesbian" }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Sexual Orientation</h3>
      <div className="space-y-2">
        {orientationOptions.map((orientation) => (
          <div key={orientation.value} className="flex items-center space-x-2">
            <Checkbox 
              id={`orientation-${orientation.value}`} 
              checked={selectedOrientations.includes(orientation.value)}
              onCheckedChange={() => onChange(orientation.value)}
            />
            <Label 
              htmlFor={`orientation-${orientation.value}`}
              className="text-sm cursor-pointer"
            >
              {orientation.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrientationFilter;
