
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/MainLayout';
import ServiceTypeBadgeLabel from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import ServiceTypeIcon from '@/components/escorts/filters/ServiceTypeIcon';
import type { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

const ServiceTypeDemo = () => {
  const [selectedTab, setSelectedTab] = useState('badges');
  const serviceTypes: ServiceTypeFilter[] = ['in-person', 'virtual', 'both', 'any', ''];

  return (
    <MainLayout title="Service Type Components Demo">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="icons">Icons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="badges" className="p-4">
          <Card>
            <CardContent className="space-y-6 p-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Default Size</h2>
                <div className="flex flex-wrap gap-4">
                  {serviceTypes.map((type) => (
                    <ServiceTypeBadgeLabel key={`default-${type}`} type={type} />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4">Small Size</h2>
                <div className="flex flex-wrap gap-4">
                  {serviceTypes.map((type) => (
                    <ServiceTypeBadgeLabel key={`sm-${type}`} type={type} size="sm" />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4">Large Size</h2>
                <div className="flex flex-wrap gap-4">
                  {serviceTypes.map((type) => (
                    <ServiceTypeBadgeLabel key={`lg-${type}`} type={type} size="lg" />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4">No Icon</h2>
                <div className="flex flex-wrap gap-4">
                  {serviceTypes.map((type) => (
                    <ServiceTypeBadgeLabel key={`no-icon-${type}`} type={type} showIcon={false} />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4">Color Variants</h2>
                <div className="flex flex-wrap gap-4">
                  <ServiceTypeBadgeLabel type="in-person" color="default" />
                  <ServiceTypeBadgeLabel type="virtual" color="secondary" />
                  <ServiceTypeBadgeLabel type="both" color="outline" />
                  <ServiceTypeBadgeLabel type="any" color="destructive" />
                  <ServiceTypeBadgeLabel type="in-person" color="success" />
                  <ServiceTypeBadgeLabel type="virtual" color="warning" />
                  <ServiceTypeBadgeLabel type="both" color="ubx" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="icons" className="p-4">
          <Card>
            <CardContent className="space-y-6 p-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Default Size</h2>
                <div className="flex flex-wrap gap-6">
                  {serviceTypes.map((type) => (
                    <div key={`icon-${type}`} className="flex flex-col items-center">
                      <ServiceTypeIcon type={type} />
                      <span className="text-xs mt-1">{type || 'empty'}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4">Large Size</h2>
                <div className="flex flex-wrap gap-6">
                  <div className="flex flex-col items-center">
                    <ServiceTypeIcon type="in-person" size={24} />
                    <span className="text-xs mt-1">in-person</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ServiceTypeIcon type="virtual" size={24} />
                    <span className="text-xs mt-1">virtual</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ServiceTypeIcon type="both" size={24} />
                    <span className="text-xs mt-1">both</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ServiceTypeIcon type="any" size={24} />
                    <span className="text-xs mt-1">any</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4">Custom Color</h2>
                <div className="flex flex-wrap gap-6">
                  <div className="flex flex-col items-center">
                    <ServiceTypeIcon type="in-person" className="text-red-500" />
                    <span className="text-xs mt-1">red</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ServiceTypeIcon type="virtual" className="text-blue-500" />
                    <span className="text-xs mt-1">blue</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ServiceTypeIcon type="both" className="text-green-500" />
                    <span className="text-xs mt-1">green</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ServiceTypeDemo;
