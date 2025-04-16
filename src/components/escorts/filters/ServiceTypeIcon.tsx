
import React from 'react';
import { Monitor, Users, Globe } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  variant?: 'default' | 'colored';
  className?: string;
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 16, 
  variant = 'default',
  className = '' 
}) => {
  const getColorClass = () => {
    if (variant !== 'colored') return '';
    
    switch (type) {
      case 'in-person': return 'text-indigo-500';
      case 'virtual': return 'text-purple-500';
      case 'both': return 'text-blue-500';
      default: return '';
    }
  };
  
  const colorClass = getColorClass();
  const combinedClass = `${colorClass} ${className}`.trim();
  
  switch (type) {
    case 'in-person':
      return <Users size={size} className={combinedClass} />;
    case 'virtual':
      return <Monitor size={size} className={combinedClass} />;
    case 'both':
      return <Globe size={size} className={combinedClass} />;
    default:
      return null;
  }
};

export default ServiceTypeIcon;
