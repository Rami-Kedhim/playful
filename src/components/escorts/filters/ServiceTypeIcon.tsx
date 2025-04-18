
import React from 'react';
import { Bed, Video, BedDouble, Utensils, type LucideProps } from 'lucide-react';
import { type ServiceTypeFilter } from './ServiceTypeBadgeLabel';

export interface ServiceTypeIconProps {
  type: string;
  size?: number;
  className?: string;
  variant?: 'default' | 'colored';
}

export const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 18,
  className = '',
  variant = 'default'
}) => {
  const iconProps: LucideProps = { 
    size, 
    className: variant === 'colored' 
      ? `${className} ${getColorForServiceType(type)}` 
      : className
  };
  
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

// Helper function to get color class based on service type
function getColorForServiceType(type: string): string {
  switch (type.toLowerCase()) {
    case 'in-person':
      return 'text-blue-500';
    case 'virtual':
      return 'text-purple-500';
    case 'both':
      return 'text-green-500';
    case 'massage':
      return 'text-indigo-500';
    case 'dinner':
      return 'text-amber-500';
    default:
      return 'text-gray-500';
  }
}

export default ServiceTypeIcon;
