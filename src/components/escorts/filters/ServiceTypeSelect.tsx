
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import ServiceTypeIcon from './ServiceTypeIcon';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeSelectProps {
  value: ServiceTypeFilter | string;
  onChange: (value: ServiceTypeFilter) => void;
  className?: string;
  label?: string;
}

/**
 * A dropdown select component for choosing service types
 * with integrated icons and ethical service guidelines
 */
const ServiceTypeSelect: React.FC<ServiceTypeSelectProps> = ({
  value,
  onChange,
  className,
  label = "Service Type"
}) => {
  // Make extra sure that value is never an empty string
  const safeValue: ServiceTypeFilter = !value || value === "" ? "any" : value as ServiceTypeFilter;
  
  // Define handler to prevent empty strings being passed back
  const handleValueChange = (val: string) => {
    // Ensure we never pass an empty string back to parent
    if (!val || val === "") {
      onChange("any");
    } else {
      onChange(val as ServiceTypeFilter);
    }
  };
  
  return (
    <div className={className}>
      {label && (
        <Label className="mb-2 block">{label}</Label>
      )}
      <Select 
        value={safeValue} 
        onValueChange={handleValueChange}
        defaultValue="any"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select service type">
            <div className="flex items-center gap-2">
              <ServiceTypeIcon type={safeValue} size={16} className="text-primary" />
              {safeValue === 'in-person' ? 'In Person' : 
               safeValue === 'virtual' ? 'Virtual' : 
               safeValue === 'both' ? 'Both Types' : 'Any Type'}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">
            <div className="flex items-center gap-2">
              <ServiceTypeIcon type="any" size={16} className="text-gray-500" />
              Any Type
            </div>
          </SelectItem>
          <SelectItem value="in-person">
            <div className="flex items-center gap-2">
              <ServiceTypeIcon type="in-person" size={16} className="text-blue-500" />
              In Person
            </div>
          </SelectItem>
          <SelectItem value="virtual">
            <div className="flex items-center gap-2">
              <ServiceTypeIcon type="virtual" size={16} className="text-purple-500" />
              Virtual
            </div>
          </SelectItem>
          <SelectItem value="both">
            <div className="flex items-center gap-2">
              <ServiceTypeIcon type="both" size={16} className="text-green-500" />
              Both Types
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ServiceTypeSelect;
