
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Video, RadioTower } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ServiceTypeFilter = '' | 'in-person' | 'virtual' | 'both';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  showEmpty?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Use this function to get the service type badge label
export function getServiceTypeBadgeLabel(type: ServiceTypeFilter): string {
  switch (type) {
    case 'in-person':
      return 'In Person';
    case 'virtual':
      return 'Virtual';
    case 'both':
      return 'In Person & Virtual';
    default:
      return 'All Service Types';
  }
}

// Use this to get the icon component for a service type
export function ServiceTypeIcon({ 
  type, 
  size = 16,
  variant = 'default'
}: { 
  type: ServiceTypeFilter; 
  size?: number;
  variant?: 'default' | 'colored';
}) {
  switch (type) {
    case 'in-person':
      return <MapPin size={size} className={variant === 'colored' ? 'text-blue-500' : ''} />;
    case 'virtual':
      return <Video size={size} className={variant === 'colored' ? 'text-green-500' : ''} />;
    case 'both':
      return <RadioTower size={size} className={variant === 'colored' ? 'text-purple-500' : ''} />;
    default:
      return null;
  }
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({
  type,
  showEmpty = false,
  variant = 'default',
  size = 'md',
  className
}) => {
  if (!type && !showEmpty) return null;
  
  const label = getServiceTypeBadgeLabel(type);
  const sizeClass = size === 'sm' ? 'text-xs py-0.5 px-2' : 
                   size === 'lg' ? 'text-sm py-1.5 px-3' : 
                   'text-xs py-1 px-2.5';
  
  return (
    <Badge 
      variant={variant}
      className={cn(
        "flex items-center gap-1.5 font-medium",
        sizeClass,
        className
      )}
    >
      <ServiceTypeIcon type={type} size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />
      <span>{label}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
