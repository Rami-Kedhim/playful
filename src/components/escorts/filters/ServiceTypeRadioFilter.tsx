
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ServiceTypeFilter } from '@/types/escort';
import ServiceTypeIcon from './ServiceTypeIcon';
import { ServiceType } from './ServiceTypeFilterRules';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useServiceType } from '../context/ServiceTypeContext';
import { getSafeServiceLabel, serviceTypeInfoMap, getServiceTypeInfo } from './ServiceTypeBadgeLabel';

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
  const { specializedServiceTypes, selectedSpecializedTypes, toggleSpecializedType } = useServiceType();
  
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
                <span>{info?.filterLabel || type || "Any"}</span>
                {info?.description && (
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
            {Object.values(ServiceType).map((serviceType) => {
              // Skip the entries we added just for compatibility
              if (["massage", "roleplay", "bdsm", "overnight", "Dinner Date", 
                   "Travel Companion", "Events", "Weekend Getaways", "BDSM", 
                   "Sensual Massage", "Role Play", "events", "travel"].includes(serviceType)) {
                return null;
              }
              
              return (
                <TooltipProvider key={serviceType}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <div 
                        className={`flex items-center space-x-2 p-2 rounded-md 
                          ${selectedSpecializedTypes.includes(serviceType) 
                            ? 'bg-primary/10 border-primary' 
                            : 'bg-secondary/40'} 
                          cursor-pointer hover:bg-secondary/60`}
                        onClick={() => toggleSpecializedType(serviceType)}
                      >
                        <span className="text-xs">{getSafeServiceLabel(serviceType as any)}</span>
                        {selectedSpecializedTypes.includes(serviceType) && (
                          <div className="ml-auto w-3 h-3 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        {serviceType}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTypeRadioFilter;
