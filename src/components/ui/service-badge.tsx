
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ServiceTypeFilter } from '@/types/serviceType';
import { MapPin, Globe, Users, Home, Navigation, Utensils, Flower } from 'lucide-react'; // Changed Spa to Flower

interface ServiceTypeBadgeProps {
  type: ServiceTypeFilter;
  className?: string;
}

const iconMap = {
  'in-person': <MapPin className="h-3.5 w-3.5 mr-1" />,
  'virtual': <Globe className="h-3.5 w-3.5 mr-1" />,
  'both': <Users className="h-3.5 w-3.5 mr-1" />,
  'in-call': <Home className="h-3.5 w-3.5 mr-1" />,
  'out-call': <Navigation className="h-3.5 w-3.5 mr-1" />,
  'dinner': <Utensils className="h-3.5 w-3.5 mr-1" />,
  'massage': <Flower className="h-3.5 w-3.5 mr-1" />, // Changed Spa to Flower
  'any': null,
  'all': null
};

const labelMap = {
  'in-person': 'In Person',
  'virtual': 'Virtual',
  'both': 'In Person & Virtual',
  'in-call': 'Incall',
  'out-call': 'Outcall',
  'dinner': 'Dinner Date',
  'massage': 'Massage',
  'any': 'Any Service',
  'all': 'All Services'
};

export const ServiceTypeBadge: React.FC<ServiceTypeBadgeProps> = ({ type, className }) => {
  const icon = iconMap[type] || null;
  const label = labelMap[type] || 'Service';

  return (
    <Badge variant="outline" className={`flex items-center ${className || ''}`}>
      {icon}
      {label}
    </Badge>
  );
};

export { type ServiceTypeFilter };
