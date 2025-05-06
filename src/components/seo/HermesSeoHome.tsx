
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { automaticSeoService } from '@/services/seo/AutomaticSeoService';

const HermesSeoHome = () => {
  const [autoSeoActive, setAutoSeoActive] = useState(false);
  
  useEffect(() => {
    const status = automaticSeoService.getStatus();
    setAutoSeoActive(status.active);
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">SEO Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the HERMES SEO Dashboard. Optimize your content visibility and boost your rankings.
        </p>
        
        {!autoSeoActive && (
          <Button 
            className="mt-4"
            onClick={() => {
              automaticSeoService.startAutoMonitoring();
              setAutoSeoActive(true);
            }}
          >
            Activate Automatic SEO
          </Button>
        )}
      </div>
      
      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* SEO Score Card */}
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <h3 className="font-medium mb-4">Overall SEO Score</h3>
          <div className="flex items-center justify-center">
            <div className="h-32 w-32 rounded-full flex items-center justify-center 
                bg-gradient-to-br from-green-500/20 to-green-700/20 
                border-4 border-green-500">
              <span className="text-3xl font-bold">86%</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            Your profiles are well optimized
          </div>
        </div>
        
        {/* Keywords Card */}
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <h3 className="font-medium mb-4">Top Keywords</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Escort services</span>
              <span className="font-medium">92%</span>
            </li>
            <li className="flex justify-between">
              <span>Premium companion</span>
              <span className="font-medium">87%</span>
            </li>
            <li className="flex justify-between">
              <span>VIP escort</span>
              <span className="font-medium">81%</span>
            </li>
            <li className="flex justify-between">
              <span>Luxury date</span>
              <span className="font-medium">76%</span>
            </li>
          </ul>
        </div>
        
        {/* Visibility Card */}
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <h3 className="font-medium mb-4">Profile Visibility</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Search Visibility</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Platform Ranking</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">External Visibility</span>
                <span className="text-sm font-medium">63%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '63%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* SEO Analytics */}
      <Card className="p-6">
        <Tabs defaultValue="profiles">
          <TabsList className="mb-4">
            <TabsTrigger value="profiles">Profiles</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="platform">Platform</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profiles">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Profile Optimization Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Escort Profiles</span>
                    <span>95% optimized</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Creator Profiles</span>
                    <span>87% optimized</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Live Cam Profiles</span>
                    <span>79% optimized</span>
                  </div>
                  <Progress value={79} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Agency Profiles</span>
                    <span>82% optimized</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Content Optimization Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Blog Posts</span>
                    <span>88% optimized</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Image Galleries</span>
                    <span>76% optimized</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Video Content</span>
                    <span>81% optimized</span>
                  </div>
                  <Progress value={81} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Service Pages</span>
                    <span>91% optimized</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="platform">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Platform Optimization Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Landing Pages</span>
                    <span>94% optimized</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Category Pages</span>
                    <span>89% optimized</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Location Pages</span>
                    <span>85% optimized</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Metaverse Experience</span>
                    <span>72% optimized</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      
      {/* Recommendations Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Optimization Recommendations</h2>
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="mr-3 mt-0.5 h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-amber-500 text-xs">!</span>
              </div>
              <span>Add more high-quality images to improve engagement metrics</span>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-0.5 h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-amber-500 text-xs">!</span>
              </div>
              <span>Update your profile description with more targeted keywords</span>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-0.5 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-500 text-xs">✓</span>
              </div>
              <span>Your profile title is well-optimized</span>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-0.5 h-5 w-5 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-500 text-xs">×</span>
              </div>
              <span>Missing location keywords in your profile</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HermesSeoHome;
