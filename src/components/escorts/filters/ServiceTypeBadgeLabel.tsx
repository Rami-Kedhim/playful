
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';

// Define the ServiceTypeFilter type and export it
export type ServiceTypeFilter = 'in-call' | 'out-call' | 'virtual' | 'massage' | 'dinner' | 'any' | 'in-person' | 'both';

export interface ServiceTypeBadgeLabelProps {
  service: ServiceTypeFilter;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  service, 
  className = '', 
  size = 'md' 
}) => {
  // Map service types to readable labels
  const serviceLabels: Record<ServiceTypeFilter, string> = {
    'in-call': 'In-call',
    'out-call': 'Out-call',
    'virtual': 'Virtual',
    'massage': 'Massage',
    'dinner': 'Dinner',
    'any': 'Any Service',
    'in-person': 'In Person',
    'both': 'Both'
  };

  // Map service types to variant styles
  const variants: Record<ServiceTypeFilter, string> = {
    'in-call': 'bg-blue-100 text-blue-800 border-blue-200',
    'out-call': 'bg-green-100 text-green-800 border-green-200',
    'virtual': 'bg-purple-100 text-purple-800 border-purple-200',
    'massage': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'dinner': 'bg-amber-100 text-amber-800 border-amber-200',
    'any': 'bg-gray-100 text-gray-800 border-gray-200',
    'in-person': 'bg-blue-100 text-blue-800 border-blue-200',
    'both': 'bg-teal-100 text-teal-800 border-teal-200'
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };

  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 font-normal ${variants[service]} ${sizeStyles[size]} ${className}`}
    >
      <ServiceTypeIcon type={service} className="h-3.5 w-3.5" />
      <span>{serviceLabels[service]}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
