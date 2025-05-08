
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import ServiceTypeSelect from './ServiceTypeSelect';
import { ServiceTypeFilter } from '@/types/serviceType';
import { useServiceType } from '../context/ServiceTypeContext';

interface EnhancedServiceTypeFilterProps {
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (filter: ServiceTypeFilter) => void;
  className?: string;
  compact?: boolean;
}

/**
 * Enhanced service type filter component that includes both
 * basic service types (in-person, virtual) and specialized service types
 */
const EnhancedServiceTypeFilter: React.FC<EnhancedServiceTypeFilterProps> = ({
  serviceTypeFilter,
  setServiceTypeFilter,
  className,
  compact = false
}) => {
  const { 
    selectedSpecializedTypes,
    toggleSpecializedType,
    specializedServiceTypes
  } = useServiceType();

  const handleFilterToggle = (type: string) => {
    if (toggleSpecializedType) {
      toggleSpecializedType(type);
    }
  };

  return (
    <Card className={className}>
      <CardHeader className={compact ? "pb-2" : "pb-4"}>
        <CardTitle className={compact ? "text-md" : "text-lg"}>Service Types</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ServiceTypeSelect 
          value={serviceTypeFilter} 
          onChange={setServiceTypeFilter}
          label={compact ? undefined : "Basic Service Type"} 
        />
        
        <div className="space-y-2">
          {!compact && (
            <h4 className="text-sm font-medium">Specialized Services</h4>
          )}
          
          <div className="flex flex-wrap gap-1.5">
            {specializedServiceTypes?.slice(0, compact ? 8 : undefined).map((type) => (
              <Badge
                key={type}
                variant={selectedSpecializedTypes?.includes(type) ? "default" : "outline"}
                className={`
                  cursor-pointer transition-colors py-1 px-2.5 
                  ${selectedSpecializedTypes?.includes(type) ? "bg-primary/20 hover:bg-primary/30 text-foreground" : "hover:bg-accent"}
                `}
                onClick={() => handleFilterToggle(type)}
              >
                <span className="text-xs font-normal">{type}</span>
                {selectedSpecializedTypes?.includes(type) && (
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    handleFilterToggle(type);
                  }} />
                )}
              </Badge>
            ))}
          </div>
          
          {compact && specializedServiceTypes && specializedServiceTypes.length > 8 && (
            <div className="text-xs text-muted-foreground mt-1">
              +{specializedServiceTypes.length - 8} more services available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedServiceTypeFilter;
