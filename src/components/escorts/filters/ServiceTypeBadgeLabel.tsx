
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ServiceType } from '@/types/serviceType';
import ServiceTypeIcon from './ServiceTypeIcon';

export type ServiceTypeFilter = "in-call" | "out-call" | "virtual" | "massage" | "dinner" | "both" | "any" | "in-person";

export interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter | ServiceType;
  className?: string;
  showIcon?: boolean;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type, 
  className = "",
  showIcon = true
}) => {
  const getLabel = (type: ServiceTypeFilter | ServiceType): string => {
    switch (type) {
      case 'in-call':
      case 'incall':
        return 'In-Call';
      case 'out-call':
      case 'outcall':
        return 'Out-Call';
      case 'virtual':
        return 'Virtual';
      case 'massage':
        return 'Massage';
      case 'dinner':
        return 'Dinner Date';
      case 'in-person':
        return 'In Person';
      case 'both':
        return 'In-Call & Out-Call';
      case 'any':
      default:
        return 'Any Type';
    }
  };
  
  const getVariant = (type: ServiceTypeFilter | ServiceType): "default" | "outline" | "secondary" | "destructive" => {
    switch (type) {
      case 'in-call':
      case 'incall':
        return 'default';
      case 'out-call': 
      case 'outcall':
        return 'secondary';
      case 'virtual':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Badge variant={getVariant(type as ServiceTypeFilter)} className={`flex items-center gap-1 ${className}`}>
      {showIcon && <ServiceTypeIcon type={type as ServiceTypeFilter} className="h-3 w-3" />}
      {getLabel(type as ServiceTypeFilter)}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
