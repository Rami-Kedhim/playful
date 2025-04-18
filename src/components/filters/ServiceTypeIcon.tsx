
import React from 'react';
import { Users, Video, Home, Utensils, Mail } from 'lucide-react';
import { ServiceTypeFilter } from '@/components/escorts/context/ServiceTypeContext';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter | string;
  variant?: 'default' | 'colored';
  size?: number;
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({
  type,
  variant = 'default',
  size = 16
}) => {
  const isColored = variant === 'colored';
  
  // Function to render the appropriate icon based on type
  const renderIcon = () => {
    const stringType = String(type);
    
    switch (stringType) {
      case 'in-person':
        return <Users size={size} className={isColored ? 'text-blue-500' : ''} />;
      case 'virtual':
        return <Video size={size} className={isColored ? 'text-purple-500' : ''} />;
      case 'both':
        return <Home size={size} className={isColored ? 'text-green-500' : ''} />;
      case 'massage':
        return <Users size={size} className={isColored ? 'text-indigo-500' : ''} />;
      case 'dinner':
        return <Utensils size={size} className={isColored ? 'text-amber-500' : ''} />;
      default:
        return <Mail size={size} className={isColored ? 'text-gray-500' : ''} />;
    }
  };

  return renderIcon();
};

export default ServiceTypeIcon;
