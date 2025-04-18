
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from '@/components/filters/ServiceTypeIcon';

export type ServiceTypeFilter = '' | 'in-person' | 'virtual' | 'both' | 'massage' | 'dinner';

// Helper function to get badge label for service type
export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  switch (type) {
    case 'in-person': return 'In Person';
    case 'virtual': return 'Virtual';
    case 'both': return 'In Person & Virtual';
    case 'massage': return 'Massage';
    case 'dinner': return 'Dinner Date';
    default: return 'Any Service Type';
  }
};

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  className?: string;
  showIcon?: boolean;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type, 
  className = "",
  showIcon = true
}) => {
  if (!type) return null;
  
  return (
    <Badge variant="outline" className={className}>
      {showIcon && <ServiceTypeIcon type={type} size={14} className="mr-1" />}
      <span>{getServiceTypeBadgeLabel(type)}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
