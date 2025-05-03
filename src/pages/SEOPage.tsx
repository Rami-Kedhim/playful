
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Globe, TagIcon, ArrowUpRight, BarChart3, Share2, Sparkles } from 'lucide-react';

import SEOModuleMain from '@/components/admin/dashboard/SEOModule';

const SEOPage = () => {
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');

  return (
    <MainLayout
      title="SEO Tools"
      description="Optimize your content for better search engine visibility"
      showBreadcrumbs
    >
      <div className="py-6">
        <Tabs defaultValue="analyzer" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="analyzer">SEO Analyzer</TabsTrigger>
            <TabsTrigger value="optimizer">Content Optimizer</TabsTrigger>
            <TabsTrigger value="keywords">Keyword Research</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyzer">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-primary" />
                  URL Analysis
                </CardTitle>
                <CardDescription>
                  Enter any URL to analyze its SEO performance and discover improvement opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Enter a URL to analyze" 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button>Analyze</Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                    SEO Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">86/100</div>
                  <p className="text-sm text-muted-foreground mt-1">Good</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
                    Page Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-500">92/100</div>
                  <p className="text-sm text-muted-foreground mt-1">Excellent</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Share2 className="h-4 w-4 mr-2 text-amber-500" />
                    Backlinks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-500">147</div>
                  <p className="text-sm text-muted-foreground mt-1">34 domains</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Improvement Suggestions</CardTitle>
                  <CardDescription>Actionable insights to improve your page ranking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 mb-2">Meta Description</Badge>
                      </div>
                      <h4 className="font-medium">Optimize your meta description</h4>
                      <p className="text-sm text-muted-foreground mt-1">Your meta description is too short (54 characters). Consider extending it to between 120-156 characters.</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 mb-2">Image Alt Tags</Badge>
                      </div>
                      <h4 className="font-medium">Add missing alt tags</h4>
                      <p className="text-sm text-muted-foreground mt-1">3 images on your page are missing alt tags. Add descriptive alt text to improve accessibility and SEO.</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200 mb-2">Mobile Responsiveness</Badge>
                      </div>
                      <h4 className="font-medium">Improve mobile experience</h4>
                      <p className="text-sm text-muted-foreground mt-1">Your page is not fully optimized for mobile devices. Text is too small and clickable elements are too close together.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="optimizer">
            <SEOModuleMain />
          </TabsContent>
          
          <TabsContent value="keywords">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TagIcon className="h-5 w-5 mr-2 text-primary" />
                  Keyword Research
                </CardTitle>
                <CardDescription>
                  Research keywords to optimize your content for search engines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Enter a keyword to research" 
                        value={keyword} 
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button>Search</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keyword Research Results</CardTitle>
                <CardDescription>Enter a keyword above to see research data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Get keyword insights</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Research keywords to find their search volume, competition level, and related terms to optimize your content
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SEOPage;
