
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Monitor, Users, Globe } from 'lucide-react';

export type ServiceTypeFilter = '' | 'in-person' | 'virtual' | 'both' | 'massage' | 'dinner';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  showLabel?: boolean;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type, 
  showLabel = true 
}) => {
  const getIconAndText = () => {
    switch (type) {
      case 'in-person':
        return {
          icon: <Users className="h-3 w-3" />,
          text: 'In-Person',
          color: 'bg-indigo-500 hover:bg-indigo-600'
        };
      case 'virtual':
        return {
          icon: <Monitor className="h-3 w-3" />,
          text: 'Virtual',
          color: 'bg-purple-500 hover:bg-purple-600'
        };
      case 'both':
        return {
          icon: <Globe className="h-3 w-3" />,
          text: 'In-Person & Virtual',
          color: 'bg-blue-500 hover:bg-blue-600'
        };
      case 'massage':
        return {
          icon: <span>💆</span>,
          text: 'Massage',
          color: 'bg-green-500 hover:bg-green-600'
        };
      case 'dinner':
        return {
          icon: <span>🍽️</span>,
          text: 'Dinner Date',
          color: 'bg-amber-500 hover:bg-amber-600'
        };
      default:
        return null;
    }
  };

  const badgeData = getIconAndText();
  
  if (!badgeData) return null;

  return (
    <Badge 
      className={`flex items-center gap-1 ${badgeData.color} text-white border-0`}
    >
      {badgeData.icon}
      {showLabel && <span>{badgeData.text}</span>}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
