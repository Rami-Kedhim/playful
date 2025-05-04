
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import ServiceTypeIcon from './ServiceTypeIcon';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeSelectProps {
  value: ServiceTypeFilter;
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
  return (
    <div className={className}>
      {label && (
        <Label className="mb-2 block">{label}</Label>
      )}
      <Select value={value} onValueChange={(value) => onChange(value as ServiceTypeFilter)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select service type">
            {value && (
              <div className="flex items-center gap-2">
                <ServiceTypeIcon type={value} size={16} className="text-primary" />
                {value === 'in-person' ? 'In Person' : 
                 value === 'virtual' ? 'Virtual' : 
                 value === 'both' ? 'Both Types' : 
                 value === 'any' ? 'Any Type' : 'Any Type'}
              </div>
            )}
            {!value && (
              <div className="flex items-center gap-2">
                Any Type
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">
            <div className="flex items-center gap-2">
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
