
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';
import ServiceTypeIcon from './ServiceTypeIcon';

interface ServiceTypeSelectProps {
  value: ServiceTypeFilter;
  onChange: (value: ServiceTypeFilter) => void;
  className?: string;
  label?: string; // Added label prop
}

const ServiceTypeSelect: React.FC<ServiceTypeSelectProps> = ({
  value,
  onChange,
  className = '',
  label
}) => {
  // Ensure we have a safe value
  const safeValue: ServiceTypeFilter = !value ? 'any' : value;
  
  // Handle change with type safety
  const handleChange = (newValue: string) => {
    // Cast to ServiceTypeFilter since we control the options
    onChange(newValue as ServiceTypeFilter);
  };
  
  return (
    <div className={`space-y-2 ${className}`}>
      {label !== undefined && <h3 className="text-sm font-medium">{label || "Service Type"}</h3>}
      <RadioGroup
        value={safeValue}
        onValueChange={handleChange}
        className="flex flex-col space-y-1.5"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="any" id="any-service" />
          <Label htmlFor="any-service" className="text-sm flex items-center cursor-pointer">
            <ServiceTypeIcon type="any" className="mr-1.5" />
            Any Service Type
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="in-person" id="in-person" />
          <Label htmlFor="in-person" className="text-sm flex items-center cursor-pointer">
            <ServiceTypeIcon type="in-person" className="mr-1.5" />
            In Person
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="virtual" id="virtual" />
          <Label htmlFor="virtual" className="text-sm flex items-center cursor-pointer">
            <ServiceTypeIcon type="virtual" className="mr-1.5" />
            Virtual
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="both" id="both-types" />
          <Label htmlFor="both-types" className="text-sm flex items-center cursor-pointer">
            <ServiceTypeIcon type="both" className="mr-1.5" />
            Both Types
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="massage" id="massage" />
          <Label htmlFor="massage" className="text-sm flex items-center cursor-pointer">
            <ServiceTypeIcon type="massage" className="mr-1.5" />
            Massage
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="dinner" id="dinner" />
          <Label htmlFor="dinner" className="text-sm flex items-center cursor-pointer">
            <ServiceTypeIcon type="dinner" className="mr-1.5" />
            Dinner Date
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ServiceTypeSelect;
