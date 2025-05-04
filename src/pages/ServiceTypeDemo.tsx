
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ServiceTypeBadgeLabel from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import ServiceTypeIcon from '@/components/escorts/filters/ServiceTypeIcon';
import { MainLayout } from '@/layouts/MainLayout';

const ServiceTypeDemo: React.FC = () => {
  return (
    <MainLayout title="Service Type Components">
      <div className="container mx-auto py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Service Type Badge Label Component</CardTitle>
            <CardDescription>
              Used to display service type badges in various sizes and styles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <section>
                <h3 className="text-base font-medium mb-4">Default Badges</h3>
                <div className="flex flex-wrap gap-4">
                  <ServiceTypeBadgeLabel type="in-person" />
                  <ServiceTypeBadgeLabel type="virtual" />
                  <ServiceTypeBadgeLabel type="both" />
                  <ServiceTypeBadgeLabel type="any" />
                </div>
              </section>
              
              <section>
                <h3 className="text-base font-medium mb-4">Size Variations</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm mb-2">Small:</p>
                    <div className="flex gap-2">
                      <ServiceTypeBadgeLabel type="in-person" size="sm" />
                      <ServiceTypeBadgeLabel type="virtual" size="sm" />
                      <ServiceTypeBadgeLabel type="both" size="sm" />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm mb-2">Default:</p>
                    <div className="flex gap-2">
                      <ServiceTypeBadgeLabel type="in-person" />
                      <ServiceTypeBadgeLabel type="virtual" />
                      <ServiceTypeBadgeLabel type="both" />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm mb-2">Large:</p>
                    <div className="flex gap-2">
                      <ServiceTypeBadgeLabel type="in-person" size="lg" />
                      <ServiceTypeBadgeLabel type="virtual" size="lg" />
                      <ServiceTypeBadgeLabel type="both" size="lg" />
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-base font-medium mb-4">Color Variations</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm mb-2">Default:</p>
                    <div className="flex gap-2">
                      <ServiceTypeBadgeLabel type="in-person" />
                      <ServiceTypeBadgeLabel type="virtual" />
                      <ServiceTypeBadgeLabel type="both" />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm mb-2">Secondary:</p>
                    <div className="flex gap-2">
                      <ServiceTypeBadgeLabel type="in-person" color="secondary" />
                      <ServiceTypeBadgeLabel type="virtual" color="secondary" />
                      <ServiceTypeBadgeLabel type="both" color="secondary" />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm mb-2">Outline:</p>
                    <div className="flex gap-2">
                      <ServiceTypeBadgeLabel type="in-person" color="outline" />
                      <ServiceTypeBadgeLabel type="virtual" color="outline" />
                      <ServiceTypeBadgeLabel type="both" color="outline" />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm mb-2">Destructive:</p>
                    <div className="flex gap-2">
                      <ServiceTypeBadgeLabel type="in-person" color="destructive" />
                      <ServiceTypeBadgeLabel type="virtual" color="destructive" />
                      <ServiceTypeBadgeLabel type="both" color="destructive" />
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-base font-medium mb-4">Without Icons</h3>
                <div className="flex gap-2">
                  <ServiceTypeBadgeLabel type="in-person" showIcon={false} />
                  <ServiceTypeBadgeLabel type="virtual" showIcon={false} />
                  <ServiceTypeBadgeLabel type="both" showIcon={false} />
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Service Type Icon Component</CardTitle>
            <CardDescription>
              Individual icons representing service types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <section>
                <h3 className="text-base font-medium mb-4">Default Icons</h3>
                <div className="flex gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <ServiceTypeIcon type="in-person" size={24} />
                    <span className="text-sm">In Person</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ServiceTypeIcon type="virtual" size={24} />
                    <span className="text-sm">Virtual</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ServiceTypeIcon type="both" size={24} />
                    <span className="text-sm">Both</span>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-base font-medium mb-4">Colored Icons</h3>
                <div className="flex gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <ServiceTypeIcon type="in-person" size={24} variant="colored" />
                    <span className="text-sm">In Person</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ServiceTypeIcon type="virtual" size={24} variant="colored" />
                    <span className="text-sm">Virtual</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ServiceTypeIcon type="both" size={24} variant="colored" />
                    <span className="text-sm">Both</span>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-base font-medium mb-4">Size Variations</h3>
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <ServiceTypeIcon type="in-person" size={16} />
                    <span className="text-xs">16px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ServiceTypeIcon type="in-person" size={24} />
                    <span className="text-xs">24px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ServiceTypeIcon type="in-person" size={32} />
                    <span className="text-xs">32px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ServiceTypeIcon type="in-person" size={48} />
                    <span className="text-xs">48px</span>
                  </div>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ServiceTypeDemo;
