
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ServiceTypeFilter } from '@/contexts/ServiceTypeContext';

export type BadgeStyleProps = {
  label: string;
  color: string;
  colorDark: string;
  icon: string;
};

export interface ServiceTypeBadgeLabelProps {
  type?: ServiceTypeFilter | string;
  style?: BadgeStyleProps;
  className?: string;
  variant?: 'default' | 'outline' | 'colored';
}

// Map service types to display labels and colors
const serviceTypeStyles: Record<string, BadgeStyleProps> = {
  'all': {
    label: 'All Services',
    color: 'bg-gray-100 text-gray-900',
    colorDark: 'dark:bg-gray-800 dark:text-gray-100',
    icon: 'globe'
  },
  'in-person': {
    label: 'In-Person',
    color: 'bg-rose-100 text-rose-900',
    colorDark: 'dark:bg-rose-900/30 dark:text-rose-300',
    icon: 'user'
  },
  'incall': {
    label: 'Incall',
    color: 'bg-pink-100 text-pink-900',
    colorDark: 'dark:bg-pink-900/30 dark:text-pink-300',
    icon: 'home'
  },
  'outcall': {
    label: 'Outcall',
    color: 'bg-violet-100 text-violet-900',
    colorDark: 'dark:bg-violet-900/30 dark:text-violet-300',
    icon: 'car'
  },
  'virtual': {
    label: 'Virtual',
    color: 'bg-blue-100 text-blue-900',
    colorDark: 'dark:bg-blue-900/30 dark:text-blue-300',
    icon: 'video'
  },
  'both': {
    label: 'All Types',
    color: 'bg-emerald-100 text-emerald-900',
    colorDark: 'dark:bg-emerald-900/30 dark:text-emerald-300',
    icon: 'check-circle'
  }
};

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type,
  style,
  className,
  variant = 'default'
}) => {
  // Use provided style or look up by type
  const badgeStyle = style || (type ? serviceTypeStyles[type] || serviceTypeStyles['all'] : serviceTypeStyles['all']);
  const { label, color, colorDark } = badgeStyle;
  
  if (variant === 'colored') {
    return (
      <Badge 
        className={cn(
          color, 
          colorDark, 
          "font-medium border-0 px-2 py-0.5",
          className
        )}
      >
        {label}
      </Badge>
    );
  }
  
  return (
    <Badge 
      variant={variant === 'outline' ? 'outline' : 'secondary'}
      className={cn("font-medium whitespace-nowrap", className)}
    >
      {label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
