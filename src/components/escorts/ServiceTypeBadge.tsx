
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Video, Globe } from 'lucide-react';

export interface ServiceTypeBadgeProps {
  serviceType: 'in-person' | 'virtual' | 'both';
  className?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ServiceTypeBadge: React.FC<ServiceTypeBadgeProps> = ({ 
  serviceType, 
  className = '', 
  showIcon = true, 
  showLabel = true,
  size = 'md'
}) => {
  let icon = null;
  let label = '';
  let variant: 'default' | 'secondary' | 'outline' = 'default';
  
  switch (serviceType) {
    case 'in-person':
      icon = <MapPin className={size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-1'} />;
      label = 'In-person';
      variant = 'default';
      break;
    case 'virtual':
      icon = <Video className={size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-1'} />;
      label = 'Virtual';
      variant = 'secondary';
      break;
    case 'both':
      icon = <Globe className={size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-1'} />;
      label = 'In-person & Virtual';
      variant = 'outline';
      break;
    default:
      return null;
  }
  
  const sizeClasses = size === 'sm' 
    ? 'text-xs px-1.5 py-0' 
    : size === 'lg' 
      ? 'text-base px-3 py-1' 
      : '';
  
  return (
    <Badge 
      variant={variant} 
      className={`flex items-center ${sizeClasses} ${className}`}
    >
      {showIcon && icon}
      {showLabel && label}
    </Badge>
  );
};

export default ServiceTypeBadge;
export { ServiceTypeBadge };
