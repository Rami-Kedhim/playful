
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ESCORT_EYE_COLOR_OPTIONS } from "@/types/escortTypes";

interface EyeColorFilterProps {
  selectedEyeColors: string[];
  toggleEyeColor: (eyeColor: string) => void;
}

const EyeColorFilter = ({ selectedEyeColors, toggleEyeColor }: EyeColorFilterProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium mb-2">Eye Color</h3>
      
      <div className="space-y-2">
        {ESCORT_EYE_COLOR_OPTIONS.map(eyeColor => (
          <div key={eyeColor} className="flex items-center space-x-2">
            <Checkbox 
              id={`eye-color-${eyeColor}`}
              checked={selectedEyeColors.includes(eyeColor)}
              onCheckedChange={() => toggleEyeColor(eyeColor)}
            />
            <Label 
              htmlFor={`eye-color-${eyeColor}`}
              className="text-sm capitalize cursor-pointer"
            >
              {eyeColor}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EyeColorFilter;
