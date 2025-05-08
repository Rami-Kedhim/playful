
import React from 'react';
import { Users, Video, Home, Utensils, Mail } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  className?: string;
  size?: number;
  variant?: 'default' | 'colored';
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({
  type,
  className = '',
  size = 16,
  variant = 'default'
}) => {
  const isColored = variant === 'colored';
  
  // Function to render the appropriate icon based on type
  // and ensure type is never an empty string
  const renderIcon = () => {
    const safeType = type || "any"; // Ensure type is never empty
    
    switch (safeType) {
      case 'in-person':
        return <Users size={size} className={`${className} ${isColored ? 'text-blue-500' : ''}`} />;
      case 'virtual':
        return <Video size={size} className={`${className} ${isColored ? 'text-purple-500' : ''}`} />;
      case 'both':
        return <Home size={size} className={`${className} ${isColored ? 'text-green-500' : ''}`} />;
      case 'massage':
        return <Utensils size={size} className={`${className} ${isColored ? 'text-indigo-500' : ''}`} />;
      case 'dinner':
        return <Utensils size={size} className={`${className} ${isColored ? 'text-amber-500' : ''}`} />;
      case 'any':
      default:
        return <Mail size={size} className={`${className} ${isColored ? 'text-gray-500' : ''}`} />;
    }
  };

  return renderIcon();
};

export default ServiceTypeIcon;
