
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';
import { ServiceTypeFilter } from '@/types/serviceType';

interface ServiceTypeBadgeProps {
  service: ServiceTypeFilter;
  className?: string;
}

const ServiceTypeBadge: React.FC<ServiceTypeBadgeProps> = ({ service, className }) => {
  // Map service types to readable labels
  const serviceLabels: Record<string, string> = {
    'in-person': 'In-Person',
    'virtual': 'Virtual',
    'both': 'Both',
    'in-call': 'In-call',
    'out-call': 'Out-call',
    'massage': 'Massage',
    'dinner': 'Dinner',
    'any': 'Any',
    'all': 'All Services'
  };

  // Map service types to variant styles
  const variantMap: Record<string, string> = {
    'in-person': 'bg-blue-100 text-blue-800',
    'virtual': 'bg-purple-100 text-purple-800',
    'both': 'bg-green-100 text-green-800',
    'in-call': 'bg-blue-100 text-blue-800',
    'out-call': 'bg-green-100 text-green-800',
    'massage': 'bg-indigo-100 text-indigo-800',
    'dinner': 'bg-amber-100 text-amber-800',
    'any': 'bg-gray-100 text-gray-800',
    'all': 'bg-gray-100 text-gray-800'
  };

  // Get label with fallback
  const label = serviceLabels[service] || 'Service';
  const variantClass = variantMap[service] || 'bg-gray-100 text-gray-800';

  return (
    <Badge 
      className={`flex items-center gap-1 font-normal ${variantClass} ${className || ''}`}
      variant="outline"
    >
      <ServiceTypeIcon type={service as any} className="h-3 w-3" />
      <span>{label}</span>
    </Badge>
  );
};

export default ServiceTypeBadge;
