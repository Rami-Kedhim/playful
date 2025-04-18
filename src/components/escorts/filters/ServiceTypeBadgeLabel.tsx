
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ServiceTypeFilter } from '@/contexts/ServiceTypeContext';

interface BadgeStyleProps {
  label: string;
  color: string;
  colorDark: string;
  icon: string;
}

export const getServiceTypeBadgeLabel = (serviceType: ServiceTypeFilter): BadgeStyleProps => {
  switch (serviceType) {
    case 'incall':
      return {
        label: 'In-Call',
        color: 'bg-blue-100 text-blue-800',
        colorDark: 'dark:bg-blue-900 dark:text-blue-100',
        icon: 'home'
      };
    case 'outcall':
      return {
        label: 'Out-Call',
        color: 'bg-purple-100 text-purple-800',
        colorDark: 'dark:bg-purple-900 dark:text-purple-100',
        icon: 'map-pin'
      };
    case 'virtual':
      return {
        label: 'Virtual',
        color: 'bg-green-100 text-green-800',
        colorDark: 'dark:bg-green-900 dark:text-green-100',
        icon: 'video'
      };
    case 'all':
    default:
      return {
        label: 'All Services',
        color: 'bg-gray-100 text-gray-800',
        colorDark: 'dark:bg-gray-700 dark:text-gray-100',
        icon: 'layers'
      };
  }
};

interface ServiceTypeBadgeLabelProps {
  serviceType: ServiceTypeFilter;
  variant?: 'outline' | 'default';
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ serviceType, variant = 'default' }) => {
  const badgeStyle = getServiceTypeBadgeLabel(serviceType);
  
  if (variant === 'outline') {
    return (
      <Badge variant="outline" className="font-normal">
        {badgeStyle.label}
      </Badge>
    );
  }
  
  return (
    <Badge className={`${badgeStyle.color} ${badgeStyle.colorDark} font-normal`}>
      {badgeStyle.label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
