
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  BarChart, 
  History, 
  FileText, 
  Settings, 
  ChevronRight,
  LineChart 
} from 'lucide-react';
import { SeoOptimizationResult } from '@/services/seo/HermesSeoService';
import { Link } from 'react-router-dom';
import { useHermesSeoHistory } from '@/hooks/useHermesSeoHistory';

interface ProjectSummary {
  id: string;
  title: string;
  type: 'profile' | 'content' | 'livecam' | 'event';
  lastOptimized?: Date;
  score?: number;
}

const HermesSeoHome: React.FC = () => {
  // Get optimization history from all content
  const { history } = useHermesSeoHistory();
  
  // Sample projects (in a real implementation, this would come from an API)
  const recentProjects: ProjectSummary[] = [
    { id: 'profile-1', title: 'VIP Model', type: 'profile', lastOptimized: new Date(), score: 85 },
    { id: 'content-1', title: 'Premium Adult Content', type: 'content', lastOptimized: new Date(Date.now() - 86400000), score: 78 },
    { id: 'livecam-1', title: 'Live Show', type: 'livecam', lastOptimized: new Date(Date.now() - 172800000), score: 92 }
  ];
  
  // Get overall optimization statistics
  const getOverallStats = () => {
    if (history.length === 0) return { avgScore: 0, improved: 0, total: 0 };
    
    const avgScore = history.reduce((sum, entry) => sum + entry.result.visibilityScore, 0) / history.length;
    const improved = history.filter(entry => 
      entry.result.seoImprovements?.title || 
      entry.result.seoImprovements?.description || 
      entry.result.seoImprovements?.keywords
    ).length;
    
    return {
      avgScore: Math.round(avgScore),
      improved,
      total: history.length
    };
  };
  
  const stats = getOverallStats();
  
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HERMES SEO Dashboard</h1>
          <p className="text-muted-foreground">
            AI-powered optimization for maximum content visibility
          </p>
        </div>
        <Button asChild>
          <Link to="/seo/new-optimization">
            New Optimization
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      {/* Overview stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Visibility Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.avgScore}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all optimized content
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Content Optimized
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.total}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total items processed by HERMES
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Content Improved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.improved}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Items enhanced with HERMES intelligence
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <div className="text-xl font-bold">
                Operational
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              HERMES neural intelligence active
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="recent" className="flex items-center">
            <History className="h-4 w-4 mr-2" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Tools
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary" />
                  Recent Optimizations
                </CardTitle>
                <CardDescription>
                  Your latest SEO optimizations by HERMES
                </CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No optimization history found. Start optimizing your content to see results here.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {history.slice(0, 5).map((entry, index) => (
                      <div key={entry.timestamp} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{entry.contentType.charAt(0).toUpperCase() + entry.contentType.slice(1)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <Badge>Score: {entry.result.visibilityScore}%</Badge>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/seo/history">View All History</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Performance by Type
                </CardTitle>
                <CardDescription>
                  SEO performance across different content types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Profiles</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full bg-muted h-2.5 rounded-full">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Content</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="w-full bg-muted h-2.5 rounded-full">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Livecams</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-muted h-2.5 rounded-full">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Events</span>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                    <div className="w-full bg-muted h-2.5 rounded-full">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/seo/analytics">Detailed Analytics</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-primary" />
                Projects Needing Optimization
              </CardTitle>
              <CardDescription>
                These content items could benefit from SEO enhancement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className={`h-1 ${
                      project.score && project.score > 80 
                        ? 'bg-green-500' 
                        : project.score && project.score > 60 
                          ? 'bg-amber-500' 
                          : 'bg-red-500'
                    }`} />
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{project.title}</CardTitle>
                          <CardDescription className="text-xs">
                            {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                          </CardDescription>
                        </div>
                        {project.score && (
                          <Badge variant={
                            project.score > 80 ? "default" : 
                            project.score > 60 ? "secondary" : "destructive"
                          }>
                            {project.score}%
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                          Last optimized: {project.lastOptimized ? new Date(project.lastOptimized).toLocaleDateString() : 'Never'}
                        </p>
                        <Button size="sm" variant="ghost" asChild className="text-xs px-2">
                          <Link to={`/seo/optimize/${project.id}`}>
                            Optimize
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Performance Over Time</CardTitle>
                <CardDescription>
                  30-day visibility score trend across all content types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex flex-col justify-center items-center text-center">
                  <Brain className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <h3 className="font-medium text-lg">Enhanced Analytics Dashboard</h3>
                  <p className="text-muted-foreground text-sm mt-2 max-w-md">
                    View detailed performance metrics, visibility trends, and competitive analysis in the full analytics dashboard.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link to="/seo/analytics">
                      Go to SEO Analytics
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content">
          <div className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Optimization</CardTitle>
                <CardDescription>
                  Enhance your content's visibility with HERMES intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Profile Optimization</CardTitle>
                      <CardDescription>
                        Enhance escort and creator profiles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Optimize individual profiles to increase visibility and booking conversions with HERMES AI.
                      </p>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/seo/optimize-profile">
                          Optimize Profiles
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Content Optimization</CardTitle>
                      <CardDescription>
                        Enhance articles and media content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Maximize the reach and engagement of your premium content with AI-driven SEO recommendations.
                      </p>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/seo/optimize-content">
                          Optimize Content
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Live Content</CardTitle>
                      <CardDescription>
                        Enhance live streams and events
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Boost visibility for your live content and special events to maximize audience participation.
                      </p>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/seo/optimize-live">
                          Optimize Live Content
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tools">
          <div className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Tools Suite</CardTitle>
                <CardDescription>
                  Professional tools powered by HERMES neural intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Keyword Explorer</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Find high-performance keywords for your niche
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Content Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Deep content evaluation and recommendations
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Performance Tracker</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Track optimization impact over time
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Competitive Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Compare visibility against competitors
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full" asChild>
                    <Link to="/seo/tools">
                      Access All Tools
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HermesSeoHome;
