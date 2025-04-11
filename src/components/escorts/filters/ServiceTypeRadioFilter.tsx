
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ServiceTypeFilter, 
  serviceTypeInfoMap,
  getServiceTypeInfo 
} from './ServiceTypeBadgeLabel';
import ServiceTypeIcon from './ServiceTypeIcon';
import { ServiceType } from './ServiceTypeFilterRules';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ServiceTypeRadioFilterProps {
  selectedType: ServiceTypeFilter;
  onChange: (type: ServiceTypeFilter) => void;
  className?: string;
  includeSpecializedTypes?: boolean;
}

/**
 * A radio group for selecting service types
 */
const ServiceTypeRadioFilter: React.FC<ServiceTypeRadioFilterProps> = ({
  selectedType,
  onChange,
  className,
  includeSpecializedTypes = false
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

      {includeSpecializedTypes && (
        <div className="mt-6">
          <Label className="text-sm font-medium mb-2 block">Specialized Services</Label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(ServiceType).map((serviceType) => (
              <TooltipProvider key={serviceType}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2 p-2 rounded-md bg-secondary/40 cursor-pointer hover:bg-secondary/60">
                      <span className="text-xs">{serviceType}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      {serviceType}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTypeRadioFilter;
