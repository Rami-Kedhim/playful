
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PersonStanding, Laptop, Flower2 } from 'lucide-react';

export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

interface ServiceTypeBadgeLabelProps {
  type: 'in-person' | 'virtual' | 'both';
  size?: 'sm' | 'md' | 'lg';
}

export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  switch (type) {
    case 'in-person':
      return 'In-Person';
    case 'virtual':
      return 'Virtual Only';
    case 'both':
      return 'In-Person & Virtual';
    default:
      return '';
  }
};

export const getSafeServiceLabel = (type: ServiceTypeFilter) => {
  return getServiceTypeBadgeLabel(type);
};

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type, 
  size = 'md' 
}) => {
  const getLabel = () => {
    return getServiceTypeBadgeLabel(type);
  };
  
  const getIcon = () => {
    switch (type) {
      case 'in-person':
        return <PersonStanding className="h-3 w-3 mr-1" />;
      case 'virtual':
        return <Laptop className="h-3 w-3 mr-1" />;
      case 'both':
        return <Flower2 className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };
  
  const getVariant = () => {
    switch (type) {
      case 'in-person':
        return 'default';
      case 'virtual':
        return 'secondary';
      case 'both':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Badge variant={getVariant()} className="flex items-center gap-1">
      {getIcon()}
      {getLabel()}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
