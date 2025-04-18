
import React from 'react';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ESCORT_BODY_TYPE_OPTIONS } from '@/types/escortTypes';

interface BodyTypeFilterProps {
  selectedBodyTypes: string[];
  toggleBodyType: (bodyType: string) => void;
  className?: string;
}

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
