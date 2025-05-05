
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface OrientationFilterProps {
  selectedOrientations: string[];
  onChange: (orientation: string) => void;
}

const OrientationFilter: React.FC<OrientationFilterProps> = ({
  selectedOrientations,
  onChange,
}) => {
  const orientations = ["Straight", "Gay", "Lesbian", "Bisexual", "Pansexual"];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Orientation</h3>
      <div className="grid grid-cols-2 gap-2">
        {orientations.map((orientation) => (
          <div key={orientation} className="flex items-center space-x-2">
            <Checkbox
              id={`orientation-${orientation}`}
              checked={selectedOrientations.includes(orientation)}
              onCheckedChange={() => onChange(orientation)}
            />
            <Label
              htmlFor={`orientation-${orientation}`}
              className="text-sm cursor-pointer"
            >
              {orientation}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrientationFilter;
