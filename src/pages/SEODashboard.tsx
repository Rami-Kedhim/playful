
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Brain, LineChart, TrendingUp, FileText, Sparkles, BarChart, RefreshCw, Zap } from 'lucide-react';

// Import SEO components
import HermesSeoNavigation from '@/components/seo/HermesSeoNavigation';
import HermesSeoHome from '@/components/seo/HermesSeoHome';
import SEOModule from '@/components/admin/dashboard/SEOModule';
import HermesSeoHistory from '@/components/seo/HermesSeoHistory';
import HermesSeoRecommendations from '@/components/admin/dashboard/seo/Recommendations';
import AutomaticSeoManager from '@/components/seo/AutomaticSeoManager';

// Import services
import { automaticSeoService } from '@/services/seo/AutomaticSeoService';
import { orus } from '@/core/Orus';

// Sample content for demonstration
const sampleContent = [
  {
    id: 'content1',
    title: 'Sample SEO Content 1',
    description: 'Description for content 1.',
    keywords: ['seo', 'sample', 'content'],
    contentType: 'content'
  },
  {
    id: 'profile1',
    title: 'Profile for SEO',
    description: 'Profile description here.',
    keywords: ['profile', 'seo', 'optimization'],
    contentType: 'profile'
  },
];

const SEODashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<string>('home');
  const [contentToOptimize, setContentToOptimize] = useState(sampleContent[0]);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [autoSeoStatus, setAutoSeoStatus] = useState({
    active: false,
    queueLength: 0,
    processing: false
  });

  // Validate session with Orus on component mount
  useEffect(() => {
    const validateSession = () => {
      try {
        // Validate user session using Orus as required in the plan
        const sessionToken = localStorage.getItem('session_token') || 'demo-token';
        const sessionResult = orus.validateSession(sessionToken);
        
        if (!sessionResult.isValid) {
          toast({
            title: "Session Warning",
            description: "Your session could not be validated. Some features may be unavailable.",
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error('Session validation error:', err);
      }
    };
    
    validateSession();
  }, [toast]);

  // Get automatic SEO status
  useEffect(() => {
    const status = automaticSeoService.getStatus();
    setAutoSeoStatus({
      active: status.active,
      queueLength: status.queueLength,
      processing: status.processing
    });
    
    // Update status every 5 seconds
    const statusTimer = setInterval(() => {
      const currentStatus = automaticSeoService.getStatus();
      setAutoSeoStatus({
        active: currentStatus.active,
        queueLength: currentStatus.queueLength,
        processing: currentStatus.processing
      });
    }, 5000);
    
    return () => clearInterval(statusTimer);
  }, []);

  const handleOptimizationApplied = () => {
    toast({
      title: 'Optimization Applied',
      description: 'SEO optimizations have been applied successfully.',
      variant: 'success'
    });
  };

  const handleRunOptimization = async () => {
    setIsOptimizing(true);
    
    try {
      toast({
        title: 'Optimization Started',
        description: 'Running automatic SEO optimization across the platform...'
      });
      
      await automaticSeoService.performSiteScan();
      
      toast({
        title: 'Optimization Complete',
        description: 'SEO optimization scan completed successfully.',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Optimization Failed',
        description: 'There was an error during the optimization process.',
        variant: 'destructive'
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r">
        <HermesSeoNavigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="auto">Automatic SEO</TabsTrigger>
            <TabsTrigger value="optimize">Manual Optimize</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          {/* Home */}
          <TabsContent value="home">
            <HermesSeoHome />
          </TabsContent>

          {/* Automatic SEO */}
          <TabsContent value="auto">
            <div className="grid grid-cols-1 gap-6">
              <AutomaticSeoManager onSettingsClick={() => setActiveTab('settings')} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Automated SEO Analytics</CardTitle>
                  <CardDescription>Performance metrics for automatic SEO optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Optimized Pages</h3>
                      <div className="text-2xl font-bold">245</div>
                      <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Average Score Improvement</h3>
                      <div className="text-2xl font-bold">+18.5%</div>
                      <p className="text-xs text-muted-foreground mt-1">Based on 245 optimizations</p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Latest Optimization</h3>
                      <div className="text-md font-medium">Profile: Luxury Escort NYC</div>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex justify-end">
                    <Button onClick={handleRunOptimization} disabled={isOptimizing}>
                      {isOptimizing ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Run Platform-wide Optimization
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Manual Optimize Content */}
          <TabsContent value="optimize">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-6 w-6 text-primary" />
                  SEO Optimization Module
                </CardTitle>
                <CardDescription>
                  Use AI to optimize your content for search engines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SEOModule />
                <div className="mt-4 flex space-x-2">
                  {sampleContent.map(content => (
                    <Button
                      key={content.id}
                      variant={contentToOptimize.id === content.id ? 'default' : 'outline'}
                      onClick={() => setContentToOptimize(content)}
                    >
                      {content.title}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-6 w-6 text-primary" />
                  SEO Optimization History
                </CardTitle>
                <CardDescription>Review your past optimizations</CardDescription>
              </CardHeader>
              <CardContent>
                <HermesSeoHistory />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations */}
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-6 w-6 text-primary" />
                  SEO Recommendations
                </CardTitle>
                <CardDescription>Improve your content based on recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <HermesSeoRecommendations recommendations={optimizationResult?.recommendations || []} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SEODashboard;
