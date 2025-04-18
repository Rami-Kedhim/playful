
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon, { ServiceTypeIconType } from './ServiceTypeIconProps';

export type ServiceTypeFilter = '' | 'in-person' | 'virtual' | 'both' | 'massage' | 'dinner';

export interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  showLabel?: boolean;
}

export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  switch (type) {
    case 'in-person':
      return 'In-Person';
    case 'virtual':
      return 'Virtual';
    case 'both':
      return 'In-Person & Virtual';
    case 'massage':
      return 'Massage';
    case 'dinner':
      return 'Dinner Date';
    default:
      return '';
  }
};

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
      case 'massage':
        return 'bg-green-500 text-white border-0';
      case 'dinner':
        return 'bg-amber-500 text-white border-0';
      default:
        return 'bg-gray-500 text-white border-0';
    }
  };
  
  if (!type) return null;
  
  return (
    <Badge className={`flex items-center gap-1 ${getBadgeStyle()}`}>
      <ServiceTypeIcon type={type as ServiceTypeIconType} size={12} className="" />
      {showLabel && <span>{getServiceTypeBadgeLabel(type)}</span>}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
