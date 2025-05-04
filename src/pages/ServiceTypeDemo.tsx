
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import ServiceTypeIcon from '@/components/escorts/filters/ServiceTypeIcon';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { Button } from '@/components/ui/button';

const ServiceTypeDemo: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ServiceTypeFilter>("in-person");
  
  const serviceTypes: ServiceTypeFilter[] = ["in-person", "virtual", "both", "any"];
  
  const labels = {
    "in-person": "In Person",
    "virtual": "Virtual",
    "both": "Both Types",
    "any": "Any"
  };
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Service Type Components Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>ServiceTypeFilter Demo</CardTitle>
            <CardDescription>
              Demonstrates the service type selection component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label className="text-sm font-medium mb-2 block">Service Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {serviceTypes.map((type) => (
                <Card
                  key={type || "any"}
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors ${
                    selectedType === type 
                      ? "bg-primary/10 border-primary" 
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  <ServiceTypeIcon 
                    type={type}
                    className={selectedType === type ? "text-primary" : ""}
                  />
                  <span>{labels[type]}</span>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Service Type Icons Demo</CardTitle>
            <CardDescription>
              Demonstrates the different service type icons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4">
                <ServiceTypeIcon type="in-person" size={24} />
                <span>In Person</span>
              </div>
              
              <div className="flex items-center gap-4">
                <ServiceTypeIcon type="virtual" size={24} />
                <span>Virtual</span>
              </div>
              
              <div className="flex items-center gap-4">
                <ServiceTypeIcon type="both" size={24} />
                <span>Both</span>
              </div>
              
              <div className="flex items-center gap-4">
                <ServiceTypeIcon type="any" size={24} />
                <span>Any (No icon)</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Colored Icons</h3>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="gap-2">
                  <ServiceTypeIcon type="in-person" size={16} variant="colored" />
                  In Person
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <ServiceTypeIcon type="virtual" size={16} variant="colored" />
                  Virtual
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <ServiceTypeIcon type="both" size={16} variant="colored" />
                  Both
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceTypeDemo;
