
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

export interface ServiceTypeRadioFilterProps {
  selectedType: ServiceTypeFilter;
  onChange: (value: ServiceTypeFilter) => void;
  includeSpecializedTypes?: boolean;
}

const ServiceTypeRadioFilter: React.FC<ServiceTypeRadioFilterProps> = ({
  selectedType,
  onChange,
  includeSpecializedTypes = false
}) => {
  return (
    <RadioGroup
      value={selectedType}
      onValueChange={(value) => onChange(value as ServiceTypeFilter)}
      className="space-y-3"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="" id="service-all" />
        <Label htmlFor="service-all" className="cursor-pointer">All services</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="in-person" id="service-in-person" />
        <Label htmlFor="service-in-person" className="cursor-pointer">In-person only</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="virtual" id="service-virtual" />
        <Label htmlFor="service-virtual" className="cursor-pointer">Virtual only</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="both" id="service-both" />
        <Label htmlFor="service-both" className="cursor-pointer">Both service types</Label>
      </div>
      
      {includeSpecializedTypes && (
        <>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="massage" id="service-massage" />
            <Label htmlFor="service-massage" className="cursor-pointer">Massage</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dinner" id="service-dinner" />
            <Label htmlFor="service-dinner" className="cursor-pointer">Dinner Date</Label>
          </div>
        </>
      )}
    </RadioGroup>
  );
};

export default ServiceTypeRadioFilter;
