
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Users, Video, Workflow } from 'lucide-react';

// Define and export ServiceTypeFilter for reuse in other components
export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  size?: 'sm' | 'md' | 'lg';
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type, size = 'md' }) => {
  if (!type) return null;
  
  let icon;
  let label;
  let colorClass;
  
  switch (type) {
    case 'in-person':
      icon = <Users className={size === 'sm' ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1.5'} />;
      label = 'In-Person';
      colorClass = 'bg-blue-600 hover:bg-blue-700';
      break;
    case 'virtual':
      icon = <Video className={size === 'sm' ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1.5'} />;
      label = 'Virtual';
      colorClass = 'bg-purple-600 hover:bg-purple-700';
      break;
    case 'both':
      icon = <Workflow className={size === 'sm' ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1.5'} />;
      label = 'In-Person & Virtual';
      colorClass = 'bg-green-600 hover:bg-green-700';
      break;
    default:
      return null;
  }
  
  return (
    <Badge 
      variant="secondary"
      className={`${colorClass} text-white border-0 flex items-center ${size === 'sm' ? 'text-xs py-0.5 px-1.5' : 'text-sm'}`}
    >
      {icon}
      {label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
