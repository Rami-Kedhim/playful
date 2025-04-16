
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Monitor, Users, Globe } from 'lucide-react';
import { ServiceType } from '@/types/escort';

export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({
  type,
  showIcon = true,
  size = 'sm'
}) => {
  if (!type) return null;

  const getIconSize = () => {
    switch (size) {
      case 'lg': return 18;
      case 'md': return 14;
      case 'sm': 
      default:   return 12;
    }
  };

  const iconSize = getIconSize();

  switch (type) {
    case 'in-person':
      return (
        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-300">
          {showIcon && <Users size={iconSize} className="mr-1" />}
          In-Person
        </Badge>
      );
    case 'virtual':
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
          {showIcon && <Monitor size={iconSize} className="mr-1" />}
          Virtual
        </Badge>
      );
    case 'both':
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
          {showIcon && <Globe size={iconSize} className="mr-1" />}
          Both
        </Badge>
      );
    default:
      return null;
  }
};

export default ServiceTypeBadgeLabel;
