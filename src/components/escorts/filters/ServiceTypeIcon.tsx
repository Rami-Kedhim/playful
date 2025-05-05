
import React from 'react';
import { Users, Video, Home, Utensils, Mail } from 'lucide-react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter | string;
  variant?: 'default' | 'colored';
  size?: number;
  className?: string;
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({
  type,
  variant = 'default',
  size = 16,
  className = ''
}) => {
  const isColored = variant === 'colored';
  
  // Function to render the appropriate icon based on type
  // and ensure type is never an empty string
  const renderIcon = () => {
    // Ensure we never pass an empty string - default to "any"
    const safeType = !type || type === "" ? "any" : type;
    
    switch (safeType) {
      case 'in-person':
        return <Users size={size} className={`${isColored ? 'text-blue-500' : ''} ${className}`} />;
      case 'virtual':
        return <Video size={size} className={`${isColored ? 'text-purple-500' : ''} ${className}`} />;
      case 'both':
        return <Home size={size} className={`${isColored ? 'text-green-500' : ''} ${className}`} />;
      case 'massage':
        return <Users size={size} className={`${isColored ? 'text-indigo-500' : ''} ${className}`} />;
      case 'dinner':
        return <Utensils size={size} className={`${isColored ? 'text-amber-500' : ''} ${className}`} />;
      case 'any':
      default:
        return <Mail size={size} className={`${isColored ? 'text-gray-500' : ''} ${className}`} />;
    }
  };

  return renderIcon();
};

export default ServiceTypeIcon;
