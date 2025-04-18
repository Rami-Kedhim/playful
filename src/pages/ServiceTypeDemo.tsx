import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from '@/components/escorts/filters/ServiceTypeIcon';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

const ServiceTypeDemo = () => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('');
  
  const handleTypeChange = (type: ServiceTypeFilter) => {
    setServiceType(type);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Service Type Components Demo</h1>
      
      <Card>
        <CardContent className="space-y-4">
          <div>
            <Label>Select Service Type</Label>
            <RadioGroup value={serviceType} onValueChange={handleTypeChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all" />
                <Label htmlFor="all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label htmlFor="in-person">In-Person</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="virtual" id="virtual" />
                <Label htmlFor="virtual">Virtual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both">Both</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label>Selected Service Type</Label>
            {serviceType ? (
              <Badge>
                {serviceType}
              </Badge>
            ) : (
              <p>No service type selected</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>ServiceTypeIcon Component</CardTitle>
          <CardDescription>Display service types as icons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 p-2 border rounded">
              <ServiceTypeIcon type="in-person" size={24} />
              <span>In Person (default)</span>
            </div>
            
            <div className="flex items-center gap-1 p-2 border rounded">
              <ServiceTypeIcon type="virtual" size={24} variant="colored" />
              <span>Virtual (colored)</span>
            </div>
            
            <div className="flex items-center gap-1 p-2 border rounded">
              <ServiceTypeIcon type="both" size={24} variant="colored" />
              <span>Both</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Service Type Icons</h2>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <ServiceTypeIcon type="in-person" size={32} className="text-indigo-600" />
            <span>In-Person</span>
          </div>
          
          <div className="flex flex-col items-center">
            <ServiceTypeIcon type="virtual" size={32} className="text-purple-600" />
            <span>Virtual</span>
          </div>
          
          <div className="flex flex-col items-center">
            <ServiceTypeIcon type="both" size={32} className="text-blue-600" />
            <span>Both</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTypeDemo;
