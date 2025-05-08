
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Building, Video, Check } from 'lucide-react';

export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | 'any';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  selected?: boolean;
  onClick?: () => void;
}

export const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({
  type,
  selected = false,
  onClick
}) => {
  // Define badge styles based on type
  const getBadgeContent = () => {
    switch (type) {
      case 'in-person':
        return {
          icon: <Building className="h-3.5 w-3.5 mr-1" />,
          label: 'In-Person Only'
        };
      case 'virtual':
        return {
          icon: <Video className="h-3.5 w-3.5 mr-1" />,
          label: 'Virtual Only'
        };
      case 'both':
        return {
          icon: <Check className="h-3.5 w-3.5 mr-1" />,
          label: 'In-Person & Virtual'
        };
      case 'any':
      default:
        return {
          icon: null,
          label: 'All Service Types'
        };
    }
  };

  const { icon, label } = getBadgeContent();

  return (
    <Badge
      variant={selected ? 'default' : 'outline'}
      className={`flex items-center gap-1 cursor-pointer ${
        selected ? '' : 'hover:bg-muted'
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
