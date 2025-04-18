
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceTypeBadgeLabel, { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import ServiceTypeRadioFilter from '@/components/escorts/filters/ServiceTypeRadioFilter';
import { useEscortServiceTypeFilter } from '@/hooks/useEscortServiceTypeFilter';
import ServiceTypeIcon from '@/components/filters/ServiceTypeIcon';

const ServiceTypeDemo: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ServiceTypeFilter>('');
  const { 
    serviceType, 
    setServiceType,
    clearServiceType 
  } = useEscortServiceTypeFilter();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Service Type Components Demo</h1>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Service Type Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">In-Person</h3>
                <ServiceTypeBadgeLabel type="in-person" />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Virtual</h3>
                <ServiceTypeBadgeLabel type="virtual" />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Both</h3>
                <ServiceTypeBadgeLabel type="both" />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Massage</h3>
                <ServiceTypeBadgeLabel type="massage" />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Dinner</h3>
                <ServiceTypeBadgeLabel type="dinner" />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Icon Only</h3>
                <ServiceTypeBadgeLabel type="in-person" showLabel={false} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="radio">
          <TabsList className="mb-4">
            <TabsTrigger value="radio">Radio Filter</TabsTrigger>
            <TabsTrigger value="icons">Service Icons</TabsTrigger>
          </TabsList>
          
          <TabsContent value="radio">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Service Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ServiceTypeRadioFilter 
                    selectedType={selectedType}
                    onChange={setSelectedType}
                    includeSpecializedTypes={false}
                  />
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="mb-2">Selected service type:</p>
                    {selectedType ? (
                      <ServiceTypeBadgeLabel type={selectedType} />
                    ) : (
                      <span className="text-muted-foreground">None selected</span>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>All Service Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ServiceTypeRadioFilter 
                    selectedType={serviceType}
                    onChange={setServiceType}
                    includeSpecializedTypes={true}
                  />
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="mb-2">Selected service type:</p>
                    {serviceType ? (
                      <ServiceTypeBadgeLabel type={serviceType} />
                    ) : (
                      <span className="text-muted-foreground">None selected</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="icons">
            <Card>
              <CardHeader>
                <CardTitle>Service Type Icons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="p-4 border rounded-full mb-2">
                      <ServiceTypeIcon type="in-person" size={24} />
                    </div>
                    <p className="text-sm text-center">In-Person</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="p-4 border rounded-full mb-2">
                      <ServiceTypeIcon type="virtual" size={24} />
                    </div>
                    <p className="text-sm text-center">Virtual</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="p-4 border rounded-full mb-2">
                      <ServiceTypeIcon type="both" size={24} />
                    </div>
                    <p className="text-sm text-center">Both</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="p-4 border rounded-full mb-2">
                      <ServiceTypeIcon type="massage" size={24} />
                    </div>
                    <p className="text-sm text-center">Massage</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="p-4 border rounded-full mb-2">
                      <ServiceTypeIcon type="dinner" size={24} />
                    </div>
                    <p className="text-sm text-center">Dinner</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="p-4 border rounded-full mb-2 bg-primary/10">
                      <ServiceTypeIcon type="in-person" size={24} variant="colored" />
                    </div>
                    <p className="text-sm text-center">In-Person (Colored)</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="p-4 border rounded-full mb-2 bg-primary/10">
                      <ServiceTypeIcon type="virtual" size={24} variant="colored" />
                    </div>
                    <p className="text-sm text-center">Virtual (Colored)</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="p-4 border rounded-full mb-2 bg-primary/10">
                      <ServiceTypeIcon type="both" size={24} variant="colored" />
                    </div>
                    <p className="text-sm text-center">Both (Colored)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceTypeDemo;
