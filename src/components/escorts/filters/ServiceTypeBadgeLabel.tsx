
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Video, Globe } from 'lucide-react';

export type ServiceTypeFilter = "" | "in-person" | "virtual" | "both";

export interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  className?: string;
  showIcon?: boolean;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type, 
  className = '', 
  showIcon = true 
}) => {
  let icon = null;
  let label = '';
  
  switch (type) {
    case 'in-person':
      icon = <MapPin className="h-3.5 w-3.5 mr-1" />;
      label = 'In-person';
      break;
    case 'virtual':
      icon = <Video className="h-3.5 w-3.5 mr-1" />;
      label = 'Virtual';
      break;
    case 'both':
      icon = <Globe className="h-3.5 w-3.5 mr-1" />;
      label = 'Both';
      break;
    default:
      return null;
  }
  
  return (
    <span className={`flex items-center text-sm ${className}`}>
      {showIcon && icon}
      <span>{label}</span>
    </span>
  );
};

export default ServiceTypeBadgeLabel;
