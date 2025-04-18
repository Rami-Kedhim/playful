
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';

export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | 'all' | '';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  variant?: 'default' | 'outline' | 'pill';
  size?: 'sm' | 'md' | 'lg';
}

export const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type,
  variant = 'default',
  size = 'md'
}) => {
  const getLabel = () => {
    switch (type) {
      case 'in-person': return 'In-Person';
      case 'virtual': return 'Virtual';
      case 'both': return 'In-Person & Virtual';
      case 'all': return 'All Services';
      default: return 'Any Services';
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

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-xs py-0 px-1.5';
      case 'lg': return 'text-md py-1 px-3';
      default: return '';
    }
  };

  const label = getLabel();

  return (
    <Badge className={`flex items-center gap-1.5 ${getBadgeStyle()} ${getSizeClasses()}`}>
      {type !== 'all' && type !== '' && <ServiceTypeIcon type={type} size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
      <span>{label}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
