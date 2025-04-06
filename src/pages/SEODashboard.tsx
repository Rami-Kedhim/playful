import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOModule from "@/components/admin/dashboard/SEOModule";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import HermesSeoOptimizer from "@/components/seo/HermesSeoOptimizer";
import HermesSeoMetrics from "@/components/seo/HermesSeoMetrics";
import HermesSeoHistory from "@/components/seo/HermesSeoHistory";
import HermesSeoRecommendations from "@/components/seo/HermesSeoRecommendations";
import { Separator } from "@/components/ui/separator";
import { Brain, LineChart, BarChart, TrendingUp, Sparkles, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import HermesSeoNavigation from "@/components/seo/HermesSeoNavigation";
import HermesSeoHome from "@/components/seo/HermesSeoHome";

const sampleContent = {
  profiles: [
    { id: 'profile-1', title: 'VIP Model', description: 'High-end companion services', keywords: ['vip', 'model', 'luxury'] },
    { id: 'profile-2', title: 'Escort in LA', description: 'Premium escort in Los Angeles area', keywords: ['la', 'premium'] }
  ],
  content: [
    { id: 'content-1', title: 'Premium Adult Content', description: 'Exclusive videos and photoshoots', keywords: ['exclusive', 'premium', 'adult'] },
    { id: 'content-2', title: 'Private Gallery', description: 'Access my private collection', keywords: ['private', 'gallery'] }
  ],
  livecams: [
    { id: 'livecam-1', title: 'Live Show', description: 'Interactive live sessions', keywords: ['live', 'interactive'] },
    { id: 'livecam-2', title: 'Private Stream', description: 'One-on-one private streaming', keywords: ['private', 'stream'] }
  ]
};

const SEODashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("admin");
  const [selectedContent, setSelectedContent] = useState(sampleContent.profiles[0]);
  const [contentType, setContentType] = useState<'profile' | 'content' | 'livecam' | 'event'>('profile');
  const [selectedAnalyticsTab, setSelectedAnalyticsTab] = useState("history");
  
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/seo') {
      return;
    } else if (path.includes('/optimize')) {
      setActiveTab('content');
    } else if (path.includes('/analytics') || path.includes('/history')) {
      setActiveTab('analytics');
      
      if (path.includes('/history')) {
        setSelectedAnalyticsTab('history');
      } else if (path.includes('/analytics')) {
        setSelectedAnalyticsTab('performance');
      }
    } else if (path.includes('/tools')) {
      setActiveTab('admin');
    }
  }, [location.pathname]);
  
  const handleOptimizationsApplied = () => {
    toast({
      title: "SEO Optimizations Applied",
      description: "The content has been successfully optimized with HERMES intelligence."
    });
  };
  
  const isMainDashboard = location.pathname === '/seo';
  
  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-64 border-r">
        <HermesSeoNavigation />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="container py-8 space-y-8">
          {isMainDashboard ? (
            <HermesSeoHome />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">SEO Dashboard</h1>
                  <p className="text-muted-foreground">
                    Optimize your content visibility with HERMES intelligence
                  </p>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="admin">Admin Settings</TabsTrigger>
                  <TabsTrigger value="content">Content Optimization</TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center">
                    <LineChart className="h-4 w-4 mr-2" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="admin" className="space-y-6 mt-6">
                  <SEOModule />
                </TabsContent>
                
                <TabsContent value="content" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-1">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Brain className="h-5 w-5 mr-2 text-primary" />
                          Content Selection
                        </CardTitle>
                        <CardDescription>
                          Select content to optimize with HERMES
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Content Type</label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant={contentType === 'profile' ? 'default' : 'outline'}
                              onClick={() => {
                                setContentType('profile');
                                setSelectedContent(sampleContent.profiles[0]);
                              }}
                              className="w-full"
                            >
                              Profiles
                            </Button>
                            <Button
                              variant={contentType === 'content' ? 'default' : 'outline'}
                              onClick={() => {
                                setContentType('content');
                                setSelectedContent(sampleContent.content[0]);
                              }}
                              className="w-full"
                            >
                              Content
                            </Button>
                            <Button
                              variant={contentType === 'livecam' ? 'default' : 'outline'}
                              onClick={() => {
                                setContentType('livecam');
                                setSelectedContent(sampleContent.livecams[0]);
                              }}
                              className="w-full"
                            >
                              Livecams
                            </Button>
                            <Button
                              variant={contentType === 'event' ? 'default' : 'outline'}
                              onClick={() => {
                                setContentType('event');
                                setSelectedContent(sampleContent.profiles[0]);
                              }}
                              className="w-full"
                            >
                              Events
                            </Button>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Select Item</label>
                          <div className="space-y-2">
                            {contentType === 'profile' && sampleContent.profiles.map(item => (
                              <div
                                key={item.id}
                                className={`p-3 rounded-md cursor-pointer ${selectedContent.id === item.id ? 'bg-primary/10 border border-primary/30' : 'bg-card hover:bg-accent'}`}
                                onClick={() => setSelectedContent(item)}
                              >
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            ))}
                            
                            {contentType === 'content' && sampleContent.content.map(item => (
                              <div
                                key={item.id}
                                className={`p-3 rounded-md cursor-pointer ${selectedContent.id === item.id ? 'bg-primary/10 border border-primary/30' : 'bg-card hover:bg-accent'}`}
                                onClick={() => setSelectedContent(item)}
                              >
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            ))}
                            
                            {contentType === 'livecam' && sampleContent.livecams.map(item => (
                              <div
                                key={item.id}
                                className={`p-3 rounded-md cursor-pointer ${selectedContent.id === item.id ? 'bg-primary/10 border border-primary/30' : 'bg-card hover:bg-accent'}`}
                                onClick={() => setSelectedContent(item)}
                              >
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="lg:col-span-2">
                      <HermesSeoOptimizer
                        contentId={selectedContent.id}
                        initialTitle={selectedContent.title}
                        initialDescription={selectedContent.description}
                        initialKeywords={selectedContent.keywords}
                        contentType={contentType}
                        onOptimizationsApplied={handleOptimizationsApplied}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="mt-6">
                  <div className="grid grid-cols-1 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-primary" />
                          SEO Analytics Dashboard
                        </CardTitle>
                        <CardDescription>
                          Comprehensive analytics for your content's search visibility
                        </CardDescription>
                        <Tabs 
                          value={selectedAnalyticsTab} 
                          onValueChange={setSelectedAnalyticsTab}
                          className="mt-4"
                        >
                          <TabsList>
                            <TabsTrigger value="history" className="flex items-center">
                              <LineChart className="h-4 w-4 mr-2" />
                              History
                            </TabsTrigger>
                            <TabsTrigger value="performance" className="flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Performance
                            </TabsTrigger>
                            <TabsTrigger value="content" className="flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              Content Analysis
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </CardHeader>
                      <CardContent>
                        <TabsContent value="history" className="mt-0 p-0">
                          <HermesSeoHistory />
                        </TabsContent>
                        
                        <TabsContent value="performance" className="mt-0 p-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center">
                                  <BarChart className="h-5 w-5 mr-2 text-primary" />
                                  Performance by Content Type
                                </CardTitle>
                                <CardDescription>
                                  Average visibility scores across different content types
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="h-[300px]">
                                  <div className="flex flex-col h-full justify-center items-center space-y-4">
                                    <div className="flex items-center justify-between w-full">
                                      <span>Profiles</span>
                                      <span>85%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2.5">
                                      <div className="bg-primary h-2.5 rounded-full" style={{width: "85%"}}></div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between w-full">
                                      <span>Content</span>
                                      <span>78%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2.5">
                                      <div className="bg-primary h-2.5 rounded-full" style={{width: "78%"}}></div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between w-full">
                                      <span>Livecams</span>
                                      <span>92%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2.5">
                                      <div className="bg-primary h-2.5 rounded-full" style={{width: "92%"}}></div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between w-full">
                                      <span>Events</span>
                                      <span>72%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2.5">
                                      <div className="bg-primary h-2.5 rounded-full" style={{width: "72%"}}></div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader>
                                <CardTitle>Top Performing Content</CardTitle>
                                <CardDescription>
                                  Content with the highest visibility scores
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between border-b pb-2">
                                    <div>
                                      <p className="font-medium">Live Show</p>
                                      <p className="text-sm text-muted-foreground">Livecam</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium text-green-500">98%</p>
                                      <p className="text-sm text-muted-foreground">+12%</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between border-b pb-2">
                                    <div>
                                      <p className="font-medium">VIP Model</p>
                                      <p className="text-sm text-muted-foreground">Profile</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium text-green-500">94%</p>
                                      <p className="text-sm text-muted-foreground">+8%</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between border-b pb-2">
                                    <div>
                                      <p className="font-medium">Premium Adult Content</p>
                                      <p className="text-sm text-muted-foreground">Content</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium text-green-500">88%</p>
                                      <p className="text-sm text-muted-foreground">+15%</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium">Escort in LA</p>
                                      <p className="text-sm text-muted-foreground">Profile</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium text-green-500">85%</p>
                                      <p className="text-sm text-muted-foreground">+5%</p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="content" className="mt-0 p-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <HermesSeoRecommendations
                              title="Sample Content For Analysis"
                              description="This is a sample content piece that demonstrates how the HERMES SEO system analyzes and provides recommendations for improving your content's search visibility."
                              keywords={["sample", "content", "seo", "hermes"]}
                              contentType="content"
                            />
                            
                            <Card>
                              <CardHeader>
                                <CardTitle>Content Improvement Stats</CardTitle>
                                <CardDescription>
                                  Average improvements after applying HERMES recommendations
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-6">
                                  <div>
                                    <div className="flex justify-between mb-1">
                                      <span className="text-sm font-medium">Title Optimization</span>
                                      <span className="text-sm font-medium text-green-600">+35%</span>
                                    </div>
                                    <div className="w-full bg-muted h-2.5 rounded-full">
                                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="flex justify-between mb-1">
                                      <span className="text-sm font-medium">Description Quality</span>
                                      <span className="text-sm font-medium text-green-600">+42%</span>
                                    </div>
                                    <div className="w-full bg-muted h-2.5 rounded-full">
                                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="flex justify-between mb-1">
                                      <span className="text-sm font-medium">Keyword Relevance</span>
                                      <span className="text-sm font-medium text-green-600">+28%</span>
                                    </div>
                                    <div className="w-full bg-muted h-2.5 rounded-full">
                                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="flex justify-between mb-1">
                                      <span className="text-sm font-medium">Overall Visibility</span>
                                      <span className="text-sm font-medium text-green-600">+47%</span>
                                    </div>
                                    <div className="w-full bg-muted h-2.5 rounded-full">
                                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '47%' }}></div>
                                    </div>
                                  </div>
                                  
                                  <div className="pt-4 border-t">
                                    <h4 className="font-medium mb-2">Content Type Distribution</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-center p-3 bg-muted/30 rounded-md">
                                        <div className="text-2xl font-bold">42%</div>
                                        <div className="text-xs text-muted-foreground">Profiles</div>
                                      </div>
                                      <div className="text-center p-3 bg-muted/30 rounded-md">
                                        <div className="text-2xl font-bold">31%</div>
                                        <div className="text-xs text-muted-foreground">Content</div>
                                      </div>
                                      <div className="text-center p-3 bg-muted/30 rounded-md">
                                        <div className="text-2xl font-bold">18%</div>
                                        <div className="text-xs text-muted-foreground">Livecams</div>
                                      </div>
                                      <div className="text-center p-3 bg-muted/30 rounded-md">
                                        <div className="text-2xl font-bold">9%</div>
                                        <div className="text-xs text-muted-foreground">Events</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SEODashboard;
