
import React from 'react';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface BodyTypeFilterProps {
  selectedBodyTypes: string[];
  toggleBodyType: (bodyType: string) => void;
  className?: string;
}

const ESCORT_BODY_TYPE_OPTIONS = [
  { value: 'slim', label: 'Slim' },
  { value: 'athletic', label: 'Athletic' },
  { value: 'average', label: 'Average' },
  { value: 'curvy', label: 'Curvy' },
  { value: 'full', label: 'Full-Figured' },
  { value: 'muscular', label: 'Muscular' },
];

const BodyTypeFilter: React.FC<BodyTypeFilterProps> = ({
  selectedBodyTypes,
  toggleBodyType,
  className
}) => {
  return (
    <div className={className}>
      <Label className="mb-2 block">Body Type</Label>
      <div className="flex flex-wrap gap-2">
        {ESCORT_BODY_TYPE_OPTIONS.map((option) => (
          <Badge
            key={option.value}
            variant={selectedBodyTypes.includes(option.value) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleBodyType(option.value)}
          >
            {option.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default BodyTypeFilter;
