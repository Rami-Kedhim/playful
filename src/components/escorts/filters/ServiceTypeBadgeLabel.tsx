
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';

export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | 'all';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  variant?: 'default' | 'outline' | 'pill';
}

export const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type,
  variant = 'default'
}) => {
  const getLabel = () => {
    switch (type) {
      case 'in-person': return 'In-Person';
      case 'virtual': return 'Virtual';
      case 'both': return 'In-Person & Virtual';
      case 'all': return 'All Services';
      default: return '';
    }
  };

  const getBadgeStyle = () => {
    if (variant === 'outline') {
      return 'bg-transparent border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300';
    }
    if (variant === 'pill') {
      return 'rounded-full px-3';
    }
    // Default style
    return '';
  };

  const label = getLabel();
  if (!label) return null;

  return (
    <Badge className={`flex items-center gap-1.5 ${getBadgeStyle()}`}>
      {type !== 'all' && <ServiceTypeIcon type={type} size={14} />}
      <span>{label}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
