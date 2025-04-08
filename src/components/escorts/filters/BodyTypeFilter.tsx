
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ESCORT_BODY_TYPE_OPTIONS } from "@/types/escortTypes";

interface BodyTypeFilterProps {
  selectedBodyTypes: string[];
  toggleBodyType: (bodyType: string) => void;
}

const BodyTypeFilter = ({ selectedBodyTypes, toggleBodyType }: BodyTypeFilterProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium mb-2">Body Type</h3>
      
      <div className="space-y-2">
        {ESCORT_BODY_TYPE_OPTIONS.map(bodyType => (
          <div key={bodyType} className="flex items-center space-x-2">
            <Checkbox 
              id={`body-type-${bodyType}`}
              checked={selectedBodyTypes.includes(bodyType)}
              onCheckedChange={() => toggleBodyType(bodyType)}
            />
            <Label 
              htmlFor={`body-type-${bodyType}`}
              className="text-sm capitalize cursor-pointer"
            >
              {bodyType}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyTypeFilter;
