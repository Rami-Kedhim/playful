
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';
import { ServiceTypeFilter } from '@/contexts/ServiceTypeContext';

interface ServiceTypeBadgeProps {
  service: ServiceTypeFilter;
  className?: string;
}

const ServiceTypeBadge: React.FC<ServiceTypeBadgeProps> = ({ service, className }) => {
  // Map service types to readable labels
  const serviceLabels: Record<ServiceTypeFilter, string> = {
    'in-call': 'In-call',
    'out-call': 'Out-call',
    'virtual': 'Virtual',
    'massage': 'Massage',
    'dinner': 'Dinner',
    'any': 'Any'
  };

  // Map service types to variant styles
  const variantMap: Record<ServiceTypeFilter, string> = {
    'in-call': 'bg-blue-100 text-blue-800',
    'out-call': 'bg-green-100 text-green-800',
    'virtual': 'bg-purple-100 text-purple-800',
    'massage': 'bg-indigo-100 text-indigo-800',
    'dinner': 'bg-amber-100 text-amber-800',
    'any': 'bg-gray-100 text-gray-800'
  };

  return (
    <Badge 
      className={`flex items-center gap-1 font-normal ${variantMap[service]} ${className}`}
      variant="outline"
    >
      <ServiceTypeIcon type={service} className="h-3 w-3" />
      <span>{serviceLabels[service]}</span>
    </Badge>
  );
};

export default ServiceTypeBadge;
