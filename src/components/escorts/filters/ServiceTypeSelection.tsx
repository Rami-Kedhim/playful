
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useServiceType } from '@/contexts/ServiceTypeContext';
import { ServiceTypeFilter } from '@/types/serviceType';
import ServiceTypeIcon from './ServiceTypeIcon';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface ServiceTypeSelectionProps {
  onChange?: (type: ServiceTypeFilter) => void;
  value?: ServiceTypeFilter;
  className?: string;
}

const ServiceTypeSelection: React.FC<ServiceTypeSelectionProps> = ({
  onChange,
  value,
  className
}) => {
  const { 
    serviceType, 
    setServiceType,
    specializedServiceTypes = [], 
    selectedSpecializedTypes = [], 
    toggleSpecializedType = () => {}
  } = useServiceType();
  
  const selectedType = value !== undefined ? value : serviceType;
  
  const handleTypeChange = (type: ServiceTypeFilter) => {
    if (onChange) {
      onChange(type);
    } else {
      setServiceType(type);
    }
  };

  return (
    <div className={className}>
      <Tabs
        defaultValue={selectedType}
        value={selectedType}
        onValueChange={(value) => handleTypeChange(value as ServiceTypeFilter)}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-3 h-auto">
          <TabsTrigger value="any" className="py-2">
            <ServiceTypeIcon type="any" className="mr-2 h-4 w-4" />
            <span>Any</span>
          </TabsTrigger>
          <TabsTrigger value="in-call" className="py-2">
            <ServiceTypeIcon type="in-call" className="mr-2 h-4 w-4" />
            <span>In-Call</span>
          </TabsTrigger>
          <TabsTrigger value="out-call" className="py-2">
            <ServiceTypeIcon type="out-call" className="mr-2 h-4 w-4" />
            <span>Out-Call</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {specializedServiceTypes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Specialized Services</h3>
          <div className="flex flex-wrap gap-2">
            {specializedServiceTypes.map(serviceType => (
              <Badge
                key={serviceType}
                variant={selectedSpecializedTypes.includes(serviceType) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSpecializedType(serviceType)}
              >
                {selectedSpecializedTypes.includes(serviceType) && (
                  <Check className="mr-1 h-3 w-3" />
                )}
                {serviceType}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTypeSelection;
