
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HermesSeoNavigation from '@/components/seo/HermesSeoNavigation';
import AutomaticSeoManager from '@/components/seo/AutomaticSeoManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { uberCore } from '@/core/UberCore';
import { orus } from '@/core/Orus';

const SEODashboard: React.FC = () => {
  const { toast } = useToast();

  // Initialize automatic SEO and validate session on component mount
  useEffect(() => {
    // Validate session
    const sessionToken = localStorage.getItem('session_token') || 'demo-token';
    const sessionResult = orus.validateSession(sessionToken);
    
    if (!sessionResult.isValid) {
      toast({
        title: "Session Warning",
        description: "Your session could not be validated. Some features may be unavailable.",
        variant: "destructive"
      });
    }
    
    // Initialize automatic SEO system
    uberCore.initializeAutomaticSeo();
  }, [toast]);

  return (
    <MainLayout
      title="HERMES SEO Dashboard"
      description="Monitor and optimize SEO performance"
    >
      <div className="flex h-full">
        {/* Left sidebar - Navigation */}
        <div className="w-64 flex-shrink-0">
          <HermesSeoNavigation />
        </div>
        
        {/* Main content area */}
        <div className="flex-grow p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">SEO Dashboard</h1>
            <p className="text-muted-foreground">
              Powered by HERMES Neural SEO Technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>SEO Health</CardTitle>
                <CardDescription>Overall site performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">85%</div>
                <p className="text-sm text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Indexed Pages</CardTitle>
                <CardDescription>Pages found by search engines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,204</div>
                <p className="text-sm text-muted-foreground">+32 new pages this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Ranking Keywords</CardTitle>
                <CardDescription>Keywords in top 10 positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">347</div>
                <p className="text-sm text-muted-foreground">+12 keywords since last scan</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="automatic" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="automatic">Automatic SEO</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="optimizations">Optimizations</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="automatic" className="space-y-4">
              <AutomaticSeoManager />
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Optimizations</CardTitle>
                  <CardDescription>Latest automatic SEO improvements</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="p-2 border-b">
                      <div className="font-medium">Homepage meta description</div>
                      <div className="text-sm text-muted-foreground">Score improved from 72 to 86</div>
                    </li>
                    <li className="p-2 border-b">
                      <div className="font-medium">Escort directory H1 tags</div>
                      <div className="text-sm text-muted-foreground">Score improved from 65 to 82</div>
                    </li>
                    <li className="p-2 border-b">
                      <div className="font-medium">About page content optimization</div>
                      <div className="text-sm text-muted-foreground">Score improved from 68 to 79</div>
                    </li>
                    <li className="p-2">
                      <div className="font-medium">FAQ schema implementation</div>
                      <div className="text-sm text-muted-foreground">Score improved from 70 to 91</div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Performance Analytics</CardTitle>
                  <CardDescription>Track visibility and rankings over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Analytics charts will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="optimizations">
              <Card>
                <CardHeader>
                  <CardTitle>Manual Optimizations</CardTitle>
                  <CardDescription>Request specific optimizations</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Optimization tools will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Configure neural SEO behavior</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Settings controls will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default SEODashboard;
