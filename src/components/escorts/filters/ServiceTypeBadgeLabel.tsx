
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon, { ServiceTypeIconType } from './ServiceTypeIconProps';

export type ServiceTypeFilter = '' | 'in-person' | 'virtual' | 'both';

export interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  showLabel?: boolean;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type, showLabel = true }) => {
  // Get badge styling based on type
  const getBadgeStyle = () => {
    switch (type) {
      case 'in-person':
        return 'bg-indigo-500 text-white border-0';
      case 'virtual':
        return 'bg-purple-500 text-white border-0';
      case 'both':
        return 'bg-blue-500 text-white border-0';
      default:
        return 'bg-gray-500 text-white border-0';
    }
  };
  
  // Get label text based on type
  const getLabel = () => {
    switch (type) {
      case 'in-person':
        return 'In-Person';
      case 'virtual':
        return 'Virtual';
      case 'both':
        return 'In-Person & Virtual';
      default:
        return '';
    }
  };
  
  if (!type) return null;
  
  return (
    <Badge className={`flex items-center gap-1 ${getBadgeStyle()}`}>
      <ServiceTypeIcon type={type as ServiceTypeIconType} size={12} className="" />
      {showLabel && <span>{getLabel()}</span>}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
