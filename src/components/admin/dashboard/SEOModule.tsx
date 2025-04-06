
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Globe, 
  Search, 
  RefreshCw, 
  ListFilter, 
  Settings, 
  Share2, 
  AlertCircle,
  CheckCircle,
  Brain
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import HermesSeoConnector from "./HermesSeoConnector";
import { useHermesSeoHistory } from "@/hooks/useHermesSeoHistory";

interface MetaTagsType {
  title: string;
  description: string;
  keywords: string;
}

interface SocialCardType {
  title: string;
  description: string;
  imageUrl: string;
}

const SEOModule = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isAutoGenerateEnabled, setIsAutoGenerateEnabled] = useState(true);
  const [isHermesEnabled, setIsHermesEnabled] = useState(true);
  const [metaTags, setMetaTags] = useState<MetaTagsType>({
    title: "UberEscorts - Next-generation Web3 adult platform",
    description: "Premium escort services and content creators with Web3 and metaverse integration.",
    keywords: "escort service, adult content, web3, crypto payments, metaverse"
  });
  
  const [socialCards, setSocialCards] = useState<SocialCardType>({
    title: "UberEscorts - Premium Adult Services",
    description: "Connect with verified escorts and content creators in the metaverse.",
    imageUrl: "https://example.com/og-image.jpg"
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const { history } = useHermesSeoHistory();
  const [optimizationCount, setOptimizationCount] = useState(0);
  
  // Calculate average score from history
  const averageScore = history.length > 0 
    ? Math.round(history.reduce((acc, item) => acc + item.result.visibilityScore, 0) / history.length) 
    : 0;
  
  // Get optimization count
  useEffect(() => {
    setOptimizationCount(history.length);
  }, [history]);

  const handleGenerateSeo = async () => {
    setIsGenerating(true);
    
    // Simulate API call for generating SEO content
    setTimeout(() => {
      setMetaTags({
        title: "UberEscorts - Premium Adult Services Platform | Web3 Integration",
        description: "Connect with verified escorts and premium content creators. Experience the next generation of adult services with our secure Web3 platform and metaverse integration.",
        keywords: "escorts, adult content, web3, crypto payments, metaverse, premium services, verified escorts"
      });
      
      setSocialCards({
        title: "Experience Premium Adult Services on UberEscorts",
        description: "Verified escorts and exclusive content in our secure Web3 platform and metaverse.",
        imageUrl: "https://example.com/og-image-new.jpg"
      });
      
      setIsGenerating(false);
      
      toast({
        title: "SEO Content Generated",
        description: "The system has successfully generated optimized SEO content.",
      });
    }, 1500);
  };
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your SEO settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">SEO Automation</h2>
          <p className="text-muted-foreground">
            Manage and optimize your site's search engine visibility
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleGenerateSeo}
            disabled={isGenerating}
            className="flex items-center"
          >
            {isGenerating ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Generate SEO
          </Button>
          
          <Button variant="outline" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Auto-generation Settings
              </CardTitle>
              <CardDescription>
                Configure how the system automatically generates SEO content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Enable automatic SEO generation</h4>
                  <p className="text-sm text-muted-foreground">
                    System will periodically analyze content and generate optimized SEO tags
                  </p>
                </div>
                <Switch 
                  checked={isAutoGenerateEnabled}
                  onCheckedChange={setIsAutoGenerateEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div className="space-y-1">
                  <h4 className="font-medium flex items-center">
                    <Brain className="h-4 w-4 mr-1 text-primary" />
                    Enable HERMES intelligence
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Use advanced HERMES neural models to optimize content visibility
                  </p>
                </div>
                <Switch 
                  checked={isHermesEnabled}
                  onCheckedChange={setIsHermesEnabled}
                />
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Generation Frequency</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant={activeTab === "daily" ? "default" : "outline"} size="sm">Daily</Button>
                    <Button variant={activeTab === "weekly" ? "default" : "outline"} size="sm">Weekly</Button>
                    <Button variant="default" size="sm">Monthly</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Content Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Escort profiles
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Creator content
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Blog posts
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <Brain className="h-4 w-4 mr-1 text-primary" />
                  HERMES SEO Statistics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-md bg-background">
                    <div className="text-sm text-muted-foreground">Optimizations</div>
                    <div className="text-2xl font-bold">{optimizationCount}</div>
                  </div>
                  <div className="p-3 rounded-md bg-background">
                    <div className="text-sm text-muted-foreground">Avg. Score</div>
                    <div className="text-2xl font-bold">{averageScore}%</div>
                  </div>
                  <div className="p-3 rounded-md bg-background">
                    <div className="text-sm text-muted-foreground">Improved</div>
                    <div className="text-2xl font-bold text-green-500">+23%</div>
                  </div>
                  <div className="p-3 rounded-md bg-background">
                    <div className="text-sm text-muted-foreground">Keywords</div>
                    <div className="text-2xl font-bold">{history.reduce((acc, item) => 
                      acc + (item.result.priorityKeywords?.length || 0), 0)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <HermesSeoConnector />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="general">General SEO</TabsTrigger>
          <TabsTrigger value="social">Social Cards</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meta Tags</CardTitle>
              <CardDescription>
                Configure the primary meta tags for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input 
                  id="meta-title" 
                  value={metaTags.title} 
                  onChange={(e) => setMetaTags({...metaTags, title: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea 
                  id="meta-description" 
                  rows={3}
                  value={metaTags.description}
                  onChange={(e) => setMetaTags({...metaTags, description: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Keywords</Label>
                <Textarea 
                  id="meta-keywords" 
                  rows={2}
                  value={metaTags.keywords}
                  onChange={(e) => setMetaTags({...metaTags, keywords: e.target.value})}
                  placeholder="Comma-separated keywords"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>URL Structure</CardTitle>
              <CardDescription>
                Configure how URLs are structured across the site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url-structure">URL Format</Label>
                <div className="flex gap-2">
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <option value="hierarchical">Hierarchical</option>
                    <option value="flat">Flat</option>
                  </select>
                  <Button variant="outline">Apply</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Cards</CardTitle>
              <CardDescription>
                Configure how your content appears when shared on social media
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="social-title">Card Title</Label>
                <Input 
                  id="social-title" 
                  value={socialCards.title}
                  onChange={(e) => setSocialCards({...socialCards, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social-description">Card Description</Label>
                <Textarea 
                  id="social-description" 
                  rows={3}
                  value={socialCards.description}
                  onChange={(e) => setSocialCards({...socialCards, description: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social-image">Card Image URL</Label>
                <Input 
                  id="social-image" 
                  value={socialCards.imageUrl}
                  onChange={(e) => setSocialCards({...socialCards, imageUrl: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Recommended size: 1200 x 630 pixels</p>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Card Preview</h4>
                <div className="border rounded-md p-4 max-w-md">
                  <div className="h-40 bg-muted rounded-md mb-3 flex items-center justify-center text-muted-foreground">
                    Image Preview
                  </div>
                  <h5 className="font-bold text-blue-600">{socialCards.title}</h5>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{socialCards.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">uberescorts.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Performance</CardTitle>
              <CardDescription>
                View analytics for your site's search engine performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Analytics Integration Required</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Connect your Google Search Console or similar SEO analytics tool to view performance data.
                </p>
                <Button className="mt-4">Connect Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOModule;
