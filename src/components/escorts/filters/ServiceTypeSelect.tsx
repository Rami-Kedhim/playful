
import React from 'react';
import { ServiceTypeFilter } from '@/types/serviceType';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ServiceTypeIcon from './ServiceTypeIcon';

export interface ServiceTypeSelectProps {
  value: ServiceTypeFilter;
  onChange: (type: ServiceTypeFilter) => void;
  className?: string;
  label?: string;
}

const ServiceTypeSelect: React.FC<ServiceTypeSelectProps> = ({
  value,
  onChange,
  className = '',
  label
}) => {
  // Map service types to readable labels
  const serviceOptions: { value: ServiceTypeFilter; label: string }[] = [
    { value: "any", label: 'Any Service' },
    { value: "in-call", label: 'In-call' },
    { value: "out-call", label: 'Out-call' },
    { value: "virtual", label: 'Virtual' },
    { value: "massage", label: 'Massage' },
    { value: "dinner", label: 'Dinner' }
  ];
  
  return (
    <div className={className}>
      {label && <div className="text-sm font-medium mb-2">{label}</div>}
      <Select value={value} onValueChange={(val) => onChange(val as ServiceTypeFilter)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select service type">
            <div className="flex items-center gap-2">
              <ServiceTypeIcon type={value} className="h-4 w-4" />
              <span>{serviceOptions.find(opt => opt.value === value)?.label || 'Any Service'}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {serviceOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                <ServiceTypeIcon type={option.value} className="h-4 w-4" />
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ServiceTypeSelect;
