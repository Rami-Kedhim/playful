
import React from 'react';
import { Bed, Video, BedDouble, Utensils, type IconProps } from 'lucide-react';
import { type ServiceTypeFilter } from './ServiceTypeBadgeLabel';

export interface ServiceTypeIconProps {
  type: string;
  size?: number;
  className?: string; // Added className prop
}

export const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 18,
  className = '' 
}) => {
  const iconProps = { size, className };
  
  switch (type.toLowerCase()) {
    case 'in-person':
      return <Bed {...iconProps} />;
    case 'virtual':
      return <Video {...iconProps} />;
    case 'both':
      return <BedDouble {...iconProps} />;
    case 'massage':
      return <BedDouble {...iconProps} />; // Could use a more appropriate icon if available
    case 'dinner':
      return <Utensils {...iconProps} />;
    default:
      return <Bed {...iconProps} />;
  }
};

export default ServiceTypeIcon;
