
import React from 'react';
import { Users, Monitor, Globe } from 'lucide-react';

export type ServiceTypeIconType = 'in-person' | 'virtual' | 'both' | 'massage' | 'dinner';

export interface ServiceTypeIconProps {
  type: ServiceTypeIconType;
  size?: number;
  variant?: string;
  className?: string;
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({
  type,
  size = 18,
  variant = 'default',
  className = ''
}) => {
  switch (type) {
    case 'in-person':
      return <Users size={size} className={className} />;
    case 'virtual':
      return <Monitor size={size} className={className} />;
    case 'both':
      return <Globe size={size} className={className} />;
    case 'massage':
      return <Users size={size} className={className} />;
    case 'dinner':
      return <Users size={size} className={className} />;
    default:
      return <Users size={size} className={className} />;
  }
};

export default ServiceTypeIcon;
