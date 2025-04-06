
import React from 'react';
import { Container } from '@/components/ui/container';
import UnifiedEcosystemBanner from '@/components/unifiedEcosystem/UnifiedEcosystemBanner';
import UnifiedEcosystemDashboard from '@/components/admin/UnifiedEcosystemDashboard';
import HermesOxumMonitor from '@/components/admin/HermesOxumMonitor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExclamationTriangleIcon, InfoCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons';

const EcosystemDashboard: React.FC = () => {
  return (
    <Container className="py-8 space-y-8">
      <h1 className="text-3xl font-bold">UberEscorts Ecosystem Dashboard</h1>
      
      <UnifiedEcosystemBanner />
      
      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="ai-system">AI System</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <UnifiedEcosystemDashboard />
        </TabsContent>
        
        <TabsContent value="ai-system" className="mt-6">
          <HermesOxumMonitor />
        </TabsContent>
        
        <TabsContent value="integration" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ecosystem Integration Status</CardTitle>
              <CardDescription>Status of the integration between real escorts and AI models</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircledIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">AI Profile Generation</h3>
                    <p className="text-sm text-muted-foreground">AI profiles are being successfully generated and optimized through Hermes+Oxum.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircledIcon className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Monetization System</h3>
                    <p className="text-sm text-muted-foreground">Lucoin-based transaction system is operational for both AI content and real escort bookings.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <InfoCircledIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Conversion Funnel</h3>
                    <p className="text-sm text-muted-foreground">AI to real escort conversion funnel is active but requires optimization to increase conversion rates.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <InfoCircledIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Cross-Promotion</h3>
                    <p className="text-sm text-muted-foreground">AI profiles are recommending real escorts, and real escort profiles are promoting AI companions.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Content Synchronization</h3>
                    <p className="text-sm text-muted-foreground">Content styles and themes between AI and real escorts need better alignment for seamless experience.</p>
                  </div>
                </div>
              </div>
              
              <Card className="bg-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Optimize AI-to-escort cross-promotion algorithms</li>
                    <li>Implement shared content themes between AI profiles and real escorts</li>
                    <li>Develop A/B testing framework for conversion funnel optimization</li>
                    <li>Expand Hermes+Oxum model training with real escort data insights</li>
                    <li>Launch unified marketing campaigns featuring both ecosystem components</li>
                  </ol>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default EcosystemDashboard;
