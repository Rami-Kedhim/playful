
import React, { useState } from 'react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import ServiceTypeSelect from '@/components/escorts/filters/ServiceTypeSelect';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ServiceTypeBadgeLabel from '@/components/escorts/filters/ServiceTypeBadgeLabel';

const ServiceTypeDemo: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ServiceTypeFilter>("any");
  
  const handleTypeChange = (type: ServiceTypeFilter) => {
    // Make sure we never set an empty string
    setSelectedType(!type ? "any" : type);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Service Type Components Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Type Select</CardTitle>
          </CardHeader>
          <CardContent>
            <ServiceTypeSelect 
              value={selectedType}
              onChange={handleTypeChange}
            />
            
            <div className="mt-4">
              <p>Selected type: {selectedType}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Service Type Badge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <ServiceTypeBadgeLabel type="in-person" />
              <ServiceTypeBadgeLabel type="virtual" />
              <ServiceTypeBadgeLabel type="both" />
              <ServiceTypeBadgeLabel type="any" />
              
              <div className="w-full mt-4">
                <p>Selected type badge:</p>
                <ServiceTypeBadgeLabel type={selectedType} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceTypeDemo;
