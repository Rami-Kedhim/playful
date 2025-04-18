
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Video, Users } from 'lucide-react';
import { ServiceTypeFilter as ServiceTypeFilterType } from '@/types/filters';

// Export the type for other components to use
export type ServiceTypeFilter = ServiceTypeFilterType;

// Helper function to get label text for a service type
export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  switch(type) {
    case 'in-person':
      return 'In Person';
    case 'virtual':
      return 'Virtual';
    case 'both':
      return 'Both';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  showIcon?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm';
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type, 
  showIcon = true, 
  variant = 'default',
  size = 'default'
}) => {
  if (!type) return null;
  
  const getLabel = () => {
    return getServiceTypeBadgeLabel(type);
  };
  
  const getIcon = () => {
    switch(type) {
      case 'in-person':
        return <MapPin className="h-3 w-3 mr-1" />;
      case 'virtual':
        return <Video className="h-3 w-3 mr-1" />;
      case 'both':
        return <Users className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };
  
  const sizeClasses = size === 'sm' ? 'text-xs py-0 px-2' : '';
  
  return (
    <Badge variant={variant} className={sizeClasses}>
      {showIcon && getIcon()}
      {getLabel()}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
