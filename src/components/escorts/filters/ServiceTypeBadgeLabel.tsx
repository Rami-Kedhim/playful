
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | null | "";

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  variant?: 'small' | 'default' | 'colored';
  className?: string;
}

// Helper function to get badge details for a service type
export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter) => {
  if (!type) return null;
  
  switch(type) {
    case "in-person":
      return {
        label: "In Person",
        color: "bg-blue-500/10 text-blue-600 border-blue-200",
        colorDark: "dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
        icon: "🏠"
      };
    case "virtual":
      return {
        label: "Virtual",
        color: "bg-purple-500/10 text-purple-600 border-purple-200",
        colorDark: "dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
        icon: "💻"
      };
    case "both":
      return {
        label: "In Person & Virtual",
        color: "bg-green-500/10 text-green-600 border-green-200",
        colorDark: "dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
        icon: "✓"
      };
    default:
      return {
        label: "Unknown",
        color: "bg-gray-500/10 text-gray-600 border-gray-200",
        colorDark: "dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800",
        icon: "?"
      };
  }
};

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type, 
  variant = 'default',
  className 
}) => {
  if (!type) return null;
  
  const details = getServiceTypeBadgeLabel(type);
  
  if (variant === 'small') {
    return (
      <Badge
        variant="outline"
        className={cn(
          details.color,
          details.colorDark,
          "font-normal text-xs py-0 h-5",
          className
        )}
      >
        {details.label}
      </Badge>
    );
  }
  
  if (variant === 'colored') {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <Avatar className="h-5 w-5">
          <AvatarFallback className={cn(
            "text-[10px]",
            details.color,
            details.colorDark
          )}>
            {details.icon}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm">{details.label}</span>
      </div>
    );
  }
  
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Avatar className="h-5 w-5">
        <AvatarFallback className="bg-muted text-[10px]">
          {details.icon}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm">{details.label}</span>
    </div>
  );
};

export default ServiceTypeBadgeLabel;
