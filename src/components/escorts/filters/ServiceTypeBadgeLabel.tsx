
import React from 'react';

export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '' | 'massage' | 'dinner';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
}

export const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type }) => {
  return <span>{getServiceTypeBadgeLabel(type)}</span>;
};

export const getServiceTypeBadgeLabel = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'in-person':
      return 'In-Person';
    case 'virtual':
      return 'Virtual';
    case 'both':
      return 'Virtual & In-Person';
    case 'massage':
      return 'Massage';
    case 'dinner':
      return 'Dinner Date';
    default:
      return type;
  }
};

export default ServiceTypeBadgeLabel;
