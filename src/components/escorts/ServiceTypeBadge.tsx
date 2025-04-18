
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User, Video, Users } from 'lucide-react';

export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

interface ServiceTypeBadgeProps {
  type: ServiceTypeFilter;
  showLabel?: boolean;
}

const ServiceTypeBadge: React.FC<ServiceTypeBadgeProps> = ({ type, showLabel = true }) => {
  if (!type) return null;
  
  switch (type) {
    case 'in-person':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <User className="h-3 w-3 mr-1" />
          {showLabel && 'In-Person'}
        </Badge>
      );
    case 'virtual':
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          <Video className="h-3 w-3 mr-1" />
          {showLabel && 'Virtual'}
        </Badge>
      );
    case 'both':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Users className="h-3 w-3 mr-1" />
          {showLabel && 'In-Person & Virtual'}
        </Badge>
      );
    default:
      return null;
  }
};

export default ServiceTypeBadge;
export { ServiceTypeBadge };
