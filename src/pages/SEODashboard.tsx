
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOModule from "@/components/admin/dashboard/SEOModule";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import HermesSeoOptimizer from "@/components/seo/HermesSeoOptimizer";
import HermesSeoMetrics from "@/components/seo/HermesSeoMetrics";
import { Separator } from "@/components/ui/separator";
import { Brain } from "lucide-react";

// Sample content for demonstration
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
  
  const handleOptimizationsApplied = () => {
    toast({
      title: "SEO Optimizations Applied",
      description: "The content has been successfully optimized with HERMES intelligence."
    });
  };
  
  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Dashboard</h1>
          <p className="text-muted-foreground">
            Optimize your content visibility with HERMES intelligence
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="admin">Admin Settings</TabsTrigger>
          <TabsTrigger value="content">Content Optimization</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default SEODashboard;
