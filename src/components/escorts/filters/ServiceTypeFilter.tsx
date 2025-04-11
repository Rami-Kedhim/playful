
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { serviceTypeInfoMap, ServiceTypeFilter as ServiceTypeFilterType } from './ServiceTypeBadgeLabel';

interface ServiceTypeFilterProps {
  serviceTypeFilter: ServiceTypeFilterType;
  setServiceTypeFilter: (type: ServiceTypeFilterType) => void;
}

const ServiceTypeFilter: React.FC<ServiceTypeFilterProps> = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter 
}) => {
  return (
    <div className="space-y-2">
      <Label>Service Type</Label>
      <RadioGroup
        value={serviceTypeFilter}
        onValueChange={(value) => setServiceTypeFilter(value as ServiceTypeFilterType)}
        className="flex flex-col space-y-1"
      >
        {Object.entries(serviceTypeInfoMap).map(([type, info]) => (
          <div key={type} className="flex items-center space-x-2">
            <RadioGroupItem value={type} id={`service-type-${type}`} />
            <Label 
              htmlFor={`service-type-${type}`} 
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className={`p-1 rounded-sm ${info.bgColor}`}>
                {info.icon}
              </span>
              <span>{info.filterLabel}</span>
              <span className="text-xs text-muted-foreground">{info.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ServiceTypeFilter;
