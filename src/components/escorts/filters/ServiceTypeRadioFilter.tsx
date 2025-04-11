
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ServiceTypeFilter, 
  serviceTypeInfoMap,
  getServiceTypeInfo 
} from './ServiceTypeBadgeLabel';
import ServiceTypeIcon from './ServiceTypeIcon';

interface ServiceTypeRadioFilterProps {
  selectedType: ServiceTypeFilter;
  onChange: (type: ServiceTypeFilter) => void;
  className?: string;
}

/**
 * A radio group for selecting service types
 */
const ServiceTypeRadioFilter: React.FC<ServiceTypeRadioFilterProps> = ({
  selectedType,
  onChange,
  className
}) => {
  const serviceTypes: ServiceTypeFilter[] = ["in-person", "virtual", "both", ""];
  
  return (
    <div className={className}>
      <Label className="text-sm font-medium mb-2 block">Service Type</Label>
      <RadioGroup 
        value={selectedType} 
        onValueChange={(value) => onChange(value as ServiceTypeFilter)}
        className="space-y-2"
      >
        {serviceTypes.map((type) => {
          const info = getServiceTypeInfo(type);
          return (
            <div key={type || "any"} className="flex items-center space-x-2">
              <RadioGroupItem value={type} id={`service-type-${type || "any"}`} />
              <Label 
                htmlFor={`service-type-${type || "any"}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                {type && <ServiceTypeIcon type={type} size={16} variant="colored" />}
                <span>{info.filterLabel}</span>
                {info.description && (
                  <span className="text-xs text-muted-foreground">
                    ({info.description})
                  </span>
                )}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default ServiceTypeRadioFilter;
