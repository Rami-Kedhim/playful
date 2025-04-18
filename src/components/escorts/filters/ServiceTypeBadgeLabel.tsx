
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "massage" | "dinner" | "";

export interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type }) => {
  if (!type) return null;
  
  const labels = {
    "in-person": "In Person",
    "virtual": "Virtual",
    "both": "Both",
    "massage": "Massage",
    "dinner": "Dinner Date"
  };
  
  const getColorClass = (): string => {
    switch (type) {
      case 'in-person': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'virtual': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'both': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'massage': return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
      case 'dinner': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };
  
  const label = labels[type as keyof typeof labels] || type;
  
  return (
    <Badge variant="outline" className={`flex items-center gap-1 ${getColorClass()}`}>
      <ServiceTypeIcon type={type} size={14} />
      <span>{label}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
