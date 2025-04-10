
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ServiceTypeFilter } from "./ServiceTypeBadgeLabel";
import ServiceTypeIcon from './ServiceTypeIcon';

interface ServiceTypeFilterProps {
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
}

const ServiceTypeRadioFilter: React.FC<ServiceTypeFilterProps> = ({
  serviceTypeFilter,
  setServiceTypeFilter
}) => {
  return (
    <RadioGroup 
      value={serviceTypeFilter} 
      onValueChange={(value) => setServiceTypeFilter(value as ServiceTypeFilter)}
      className="space-y-2"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="" id="service-type-all" />
        <Label htmlFor="service-type-all" className="flex items-center gap-1 cursor-pointer">
          All Services
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="in-person" id="service-type-in-person" />
        <Label htmlFor="service-type-in-person" className="flex items-center gap-1 cursor-pointer">
          <ServiceTypeIcon type="in-person" size={14} />
          <span>In-Person Only</span>
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="virtual" id="service-type-virtual" />
        <Label htmlFor="service-type-virtual" className="flex items-center gap-1 cursor-pointer">
          <ServiceTypeIcon type="virtual" size={14} />
          <span>Virtual Only</span>
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="both" id="service-type-both" />
        <Label htmlFor="service-type-both" className="flex items-center gap-1 cursor-pointer">
          <ServiceTypeIcon type="both" size={14} />
          <span>Both In-Person & Virtual</span>
        </Label>
      </div>
    </RadioGroup>
  );
};

export default ServiceTypeRadioFilter;
