
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Users, Video, Workflow } from 'lucide-react';

// Define and export ServiceTypeFilter for reuse in other components
export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  size?: 'sm' | 'md' | 'lg';
}

// Helper functions that other components need to access
export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  switch (type) {
    case 'in-person':
      return 'In-Person Only';
    case 'virtual':
      return 'Virtual Only';
    case 'both':
      return 'In-Person & Virtual';
    default:
      return 'Any Service Type';
  }
};

export const getSafeServiceLabel = (service: string): string => {
  // Map potentially sensitive/explicit services to safer terms
  const safeServiceMap: Record<string, string> = {
    'BDSM': 'Special Experience',
    'Domination': 'Power Dynamic Experience',
    'Submission': 'Guided Experience',
    'Anal': 'Specialized Service',
    'Deepthroat': 'Advanced Oral Service',
    'Fetish': 'Specialized Fantasy',
    // Add more mappings as needed
  };

  return safeServiceMap[service] || service;
};

interface ServiceTypeInfo {
  label: string;
  filterLabel: string;
  description?: string;
  iconName?: string;
  color?: string;
}

export const serviceTypeInfoMap: Record<string, ServiceTypeInfo> = {
  'in-person': {
    label: 'In-Person',
    filterLabel: 'In-Person Only',
    description: 'Physical meetings only',
    iconName: 'Users',
    color: 'bg-blue-600'
  },
  'virtual': {
    label: 'Virtual',
    filterLabel: 'Virtual Only',
    description: 'Online experiences only',
    iconName: 'Video',
    color: 'bg-purple-600'
  },
  'both': {
    label: 'In-Person & Virtual',
    filterLabel: 'Both Types',
    description: 'Flexible availability',
    iconName: 'Workflow',
    color: 'bg-green-600'
  },
  '': {
    label: 'Any Type',
    filterLabel: 'Any Service Type',
    description: '',
    iconName: '',
    color: 'bg-gray-600'
  }
};

export const getServiceTypeInfo = (type: ServiceTypeFilter): ServiceTypeInfo => {
  return serviceTypeInfoMap[type] || serviceTypeInfoMap[''];
};

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type, size = 'md' }) => {
  if (!type) return null;
  
  let icon;
  let label;
  let colorClass;
  
  switch (type) {
    case 'in-person':
      icon = <Users className={size === 'sm' ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1.5'} />;
      label = 'In-Person';
      colorClass = 'bg-blue-600 hover:bg-blue-700';
      break;
    case 'virtual':
      icon = <Video className={size === 'sm' ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1.5'} />;
      label = 'Virtual';
      colorClass = 'bg-purple-600 hover:bg-purple-700';
      break;
    case 'both':
      icon = <Workflow className={size === 'sm' ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1.5'} />;
      label = 'In-Person & Virtual';
      colorClass = 'bg-green-600 hover:bg-green-700';
      break;
    default:
      return null;
  }
  
  return (
    <Badge 
      variant="secondary"
      className={`${colorClass} text-white border-0 flex items-center ${size === 'sm' ? 'text-xs py-0.5 px-1.5' : 'text-sm'}`}
    >
      {icon}
      {label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
