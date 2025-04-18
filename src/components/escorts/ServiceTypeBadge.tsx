
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Monitor, Users, Globe } from 'lucide-react';
import { Escort } from '@/types/escort';

interface ServiceTypeBadgeProps {
  escort: Escort;
  size?: 'sm' | 'md' | 'lg';
}

const ServiceTypeBadge: React.FC<ServiceTypeBadgeProps> = ({ escort, size = 'md' }) => {
  // Use nullish coalescing to provide default values
  const providesInPersonServices = escort.providesInPersonServices ?? 
    escort.serviceTypes?.includes('in-person') ?? 
    false;
  
  const providesVirtualContent = escort.providesVirtualContent ?? 
    escort.serviceTypes?.includes('virtual') ?? 
    false;
  
  // Icon sizes based on the badge size
  const iconSizes = {
    sm: 10,
    md: 12,
    lg: 16
  };
  
  const iconSize = iconSizes[size];
  
  if (providesInPersonServices && providesVirtualContent) {
    return (
      <Badge className="flex items-center gap-1 bg-blue-500 text-white border-0">
        <Globe size={iconSize} />
        <span>In-Person & Virtual</span>
      </Badge>
    );
  } else if (providesInPersonServices) {
    return (
      <Badge className="flex items-center gap-1 bg-indigo-500 text-white border-0">
        <Users size={iconSize} />
        <span>In-Person</span>
      </Badge>
    );
  } else if (providesVirtualContent) {
    return (
      <Badge className="flex items-center gap-1 bg-purple-500 text-white border-0">
        <Monitor size={iconSize} />
        <span>Virtual</span>
      </Badge>
    );
  }
  
  return null;
};

export default ServiceTypeBadge;
