
import React from 'react';
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';
import ServiceTypeIcon from './ServiceTypeIcon';
import { cn } from "@/lib/utils";

interface ServiceTypeRadioGroupProps {
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
  layout?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

/**
 * A component that displays service type options as a radio group with icons
 */
const ServiceTypeRadioGroup: React.FC<ServiceTypeRadioGroupProps> = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter,
  layout = 'horizontal',
  size = 'md',
  showLabels = true
}) => {
  // Ensure serviceTypeFilter is never empty
  const safeServiceTypeFilter = serviceTypeFilter || "any";
  
  // Size classes for the container
  const sizeClasses = {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-3"
  };
  
  // Size for icons
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;
  
  // Size classes for the buttons
  const buttonSizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5"
  };
  
  return (
    <RadioGroup
      value={safeServiceTypeFilter}
      onValueChange={(value) => setServiceTypeFilter(value as ServiceTypeFilter)}
      className={cn(
        "flex",
        layout === 'horizontal' ? "flex-row" : "flex-col",
        sizeClasses[size]
      )}
    >
      <div className={cn(
        "grid grid-flow-col auto-cols-fr",
        layout === 'vertical' && "grid-flow-row auto-rows-fr gap-2"
      )}>
        <Label
          htmlFor="service-type-in-person"
          className={cn(
            "flex items-center gap-2 justify-center border rounded-md cursor-pointer transition-colors",
            "hover:bg-accent hover:border-primary",
            safeServiceTypeFilter === 'in-person' ? "bg-accent border-primary" : "border-muted",
            buttonSizeClasses[size]
          )}
        >
          <input 
            type="radio" 
            id="service-type-in-person" 
            value="in-person"
            checked={safeServiceTypeFilter === 'in-person'}
            onChange={() => setServiceTypeFilter('in-person')}
            className="sr-only" 
          />
          <ServiceTypeIcon 
            type="in-person" 
            size={iconSize} 
            className={safeServiceTypeFilter === 'in-person' ? "text-primary" : ""}
          />
          {showLabels && <span className={cn(size === 'sm' && "text-xs")}>In Person</span>}
        </Label>
        
        <Label
          htmlFor="service-type-virtual"
          className={cn(
            "flex items-center gap-2 justify-center border rounded-md cursor-pointer transition-colors",
            "hover:bg-accent hover:border-primary",
            safeServiceTypeFilter === 'virtual' ? "bg-accent border-primary" : "border-muted",
            buttonSizeClasses[size]
          )}
        >
          <input 
            type="radio" 
            id="service-type-virtual" 
            value="virtual"
            checked={safeServiceTypeFilter === 'virtual'}
            onChange={() => setServiceTypeFilter('virtual')}
            className="sr-only" 
          />
          <ServiceTypeIcon 
            type="virtual" 
            size={iconSize} 
            className={safeServiceTypeFilter === 'virtual' ? "text-primary" : ""}
          />
          {showLabels && <span className={cn(size === 'sm' && "text-xs")}>Virtual</span>}
        </Label>
        
        <Label
          htmlFor="service-type-both"
          className={cn(
            "flex items-center gap-2 justify-center border rounded-md cursor-pointer transition-colors",
            "hover:bg-accent hover:border-primary",
            safeServiceTypeFilter === 'both' ? "bg-accent border-primary" : "border-muted",
            buttonSizeClasses[size]
          )}
        >
          <input 
            type="radio" 
            id="service-type-both" 
            value="both"
            checked={safeServiceTypeFilter === 'both'}
            onChange={() => setServiceTypeFilter('both')}
            className="sr-only" 
          />
          <ServiceTypeIcon 
            type="both" 
            size={iconSize} 
            className={safeServiceTypeFilter === 'both' ? "text-primary" : ""}
          />
          {showLabels && <span className={cn(size === 'sm' && "text-xs")}>Both</span>}
        </Label>
        
        <Label
          htmlFor="service-type-any"
          className={cn(
            "flex items-center gap-2 justify-center border rounded-md cursor-pointer transition-colors",
            "hover:bg-accent hover:border-primary",
            (safeServiceTypeFilter === 'any' || safeServiceTypeFilter === '') ? "bg-accent border-primary" : "border-muted",
            buttonSizeClasses[size]
          )}
        >
          <input 
            type="radio" 
            id="service-type-any" 
            value="any"
            checked={safeServiceTypeFilter === 'any' || safeServiceTypeFilter === ''}
            onChange={() => setServiceTypeFilter('any')}
            className="sr-only" 
          />
          <ServiceTypeIcon 
            type="any" 
            size={iconSize} 
            className={(safeServiceTypeFilter === 'any' || safeServiceTypeFilter === '') ? "text-primary" : ""}
          />
          {showLabels && <span className={cn(size === 'sm' && "text-xs")}>Any</span>}
        </Label>
      </div>
    </RadioGroup>
  );
};

export default ServiceTypeRadioGroup;
