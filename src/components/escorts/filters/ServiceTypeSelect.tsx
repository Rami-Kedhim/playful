
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ServiceTypeFilter } from '@/contexts/ServiceTypeContext';
import ServiceTypeIcon from './ServiceTypeIcon';

export interface ServiceTypeSelectProps {
  value: ServiceTypeFilter;
  onChange: (type: ServiceTypeFilter) => void;
  label?: string;
  className?: string;
}

const ServiceTypeSelect: React.FC<ServiceTypeSelectProps> = ({
  value,
  onChange,
  label,
  className,
}) => {
  return (
    <div className={className}>
      {label && <div className="text-sm font-medium mb-2">{label}</div>}
      <Select value={value} onValueChange={(val: ServiceTypeFilter) => onChange(val)}>
        <SelectTrigger className="w-full">
          <SelectValue>
            <div className="flex items-center">
              <ServiceTypeIcon type={value} className="mr-2 h-4 w-4" />
              <span>
                {value === 'any' ? 'Any Service Type' :
                value === 'in-call' ? 'In-Call' :
                value === 'out-call' ? 'Out-Call' :
                value === 'virtual' ? 'Virtual' : 
                value === 'massage' ? 'Massage' : 
                value === 'dinner' ? 'Dinner Date' : 'Unknown'}
              </span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">
            <div className="flex items-center">
              <ServiceTypeIcon type="any" className="mr-2 h-4 w-4" />
              <span>Any Service Type</span>
            </div>
          </SelectItem>
          <SelectItem value="in-call">
            <div className="flex items-center">
              <ServiceTypeIcon type="in-call" className="mr-2 h-4 w-4" />
              <span>In-Call</span>
            </div>
          </SelectItem>
          <SelectItem value="out-call">
            <div className="flex items-center">
              <ServiceTypeIcon type="out-call" className="mr-2 h-4 w-4" />
              <span>Out-Call</span>
            </div>
          </SelectItem>
          <SelectItem value="virtual">
            <div className="flex items-center">
              <ServiceTypeIcon type="virtual" className="mr-2 h-4 w-4" />
              <span>Virtual</span>
            </div>
          </SelectItem>
          <SelectItem value="massage">
            <div className="flex items-center">
              <ServiceTypeIcon type="massage" className="mr-2 h-4 w-4" />
              <span>Massage</span>
            </div>
          </SelectItem>
          <SelectItem value="dinner">
            <div className="flex items-center">
              <ServiceTypeIcon type="dinner" className="mr-2 h-4 w-4" />
              <span>Dinner Date</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ServiceTypeSelect;
