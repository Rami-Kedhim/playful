
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { History, Search, Filter, Trash2, Download, Brain, TrendingUp } from 'lucide-react';
import { useHermesSeoHistory } from '@/hooks/useHermesSeoHistory';
import { SeoOptimizationResult } from '@/services/seo/HermesSeoService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HermesSeoHistory: React.FC = () => {
  const { history, clearHistory } = useHermesSeoHistory();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'score'>('newest');
  const [activeTab, setActiveTab] = useState<string>('list');
  
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all SEO history? This action cannot be undone.')) {
      const success = clearHistory();
      if (success) {
        toast({
          title: "History cleared",
          description: "Your SEO optimization history has been cleared successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to clear SEO history. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleExportHistory = () => {
    try {
      // Convert history to CSV format
      const headers = "Timestamp,Content ID,Content Type,Visibility Score,Title Improved,Description Improved,Keywords Improved\n";
      const rows = history.map(entry => {
        const timestamp = new Date(entry.timestamp).toISOString();
        const contentId = entry.contentId;
        const contentType = entry.contentType;
        const score = entry.result.visibilityScore;
        const titleImproved = entry.result.seoImprovements?.title ? 'Yes' : 'No';
        const descImproved = entry.result.seoImprovements?.description ? 'Yes' : 'No';
        const keywordsImproved = entry.result.seoImprovements?.keywords ? 'Yes' : 'No';
        
        return `${timestamp},${contentId},${contentType},${score},${titleImproved},${descImproved},${keywordsImproved}`;
      }).join('\n');
      
      const csvContent = headers + rows;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      // Create download link and trigger download
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `hermes-seo-history-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export successful",
        description: "Your SEO history has been exported as CSV.",
      });
    } catch (error) {
      console.error("Failed to export history:", error);
      toast({
        title: "Export failed",
        description: "Could not export SEO history. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Filter and sort history
  const getFilteredHistory = () => {
    let filtered = [...history];
    
    // Apply content type filter
    if (contentTypeFilter !== 'all') {
      filtered = filtered.filter(entry => entry.contentType === contentTypeFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(entry => 
        entry.contentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.contentType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortOrder) {
      case 'newest':
        filtered.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case 'score':
        filtered.sort((a, b) => b.result.visibilityScore - a.result.visibilityScore);
        break;
    }
    
    return filtered;
  };
  
  const filteredHistory = getFilteredHistory();
  
  // Calculate metrics for the summary tab
  const getHistorySummary = () => {
    if (history.length === 0) {
      return {
        totalOptimizations: 0,
        avgScore: 0,
        highestScore: 0,
        lowestScore: 0,
        contentTypeBreakdown: {},
        improvement: {
          title: 0,
          description: 0,
          keywords: 0,
        }
      };
    }
    
    const totalOptimizations = history.length;
    
    const avgScore = history.reduce((sum, entry) => 
      sum + entry.result.visibilityScore, 0) / totalOptimizations;
    
    const highestScore = Math.max(...history.map(entry => entry.result.visibilityScore));
    const lowestScore = Math.min(...history.map(entry => entry.result.visibilityScore));
    
    // Breakdown by content type
    const contentTypeBreakdown: Record<string, number> = {};
    history.forEach(entry => {
      if (!contentTypeBreakdown[entry.contentType]) {
        contentTypeBreakdown[entry.contentType] = 0;
      }
      contentTypeBreakdown[entry.contentType]++;
    });
    
    // Count improvements by type
    const titleImprovements = history.filter(entry => entry.result.seoImprovements?.title).length;
    const descriptionImprovements = history.filter(entry => entry.result.seoImprovements?.description).length;
    const keywordsImprovements = history.filter(entry => entry.result.seoImprovements?.keywords).length;
    
    return {
      totalOptimizations,
      avgScore: Math.round(avgScore),
      highestScore,
      lowestScore,
      contentTypeBreakdown,
      improvement: {
        title: titleImprovements,
        description: descriptionImprovements,
        keywords: keywordsImprovements,
      }
    };
  };
  
  const summary = getHistorySummary();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="flex items-center">
              <History className="h-5 w-5 mr-2 text-primary" />
              HERMES SEO History
            </CardTitle>
            <CardDescription>
              View and analyze your SEO optimization history
            </CardDescription>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportHistory}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearHistory}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="list">History List</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="profile">Profile</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="livecam">Livecam</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortOrder} onValueChange={(value: string) => setSortOrder(value as 'newest' | 'oldest' | 'score')}>
                  <SelectTrigger className="w-[180px]">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="score">Highest score</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredHistory.length === 0 ? (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 mx-auto text-muted-foreground/30" />
                <h3 className="mt-4 text-lg font-medium">No history found</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  {history.length === 0 
                    ? "You haven't optimized any content yet. Start using HERMES SEO to see your optimization history here."
                    : "No results match your current filters. Try adjusting your search criteria."
                  }
                </p>
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Content Type</TableHead>
                      <TableHead>Content ID</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Improvements</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((entry) => (
                      <TableRow key={entry.timestamp}>
                        <TableCell className="font-medium">
                          {new Date(entry.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {entry.contentType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {entry.contentId}
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            entry.result.visibilityScore > 80 ? "default" :
                            entry.result.visibilityScore > 60 ? "secondary" : "destructive"
                          }>
                            {entry.result.visibilityScore}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {entry.result.seoImprovements?.title && (
                              <Badge variant="outline" className="bg-primary/10">Title</Badge>
                            )}
                            {entry.result.seoImprovements?.description && (
                              <Badge variant="outline" className="bg-primary/10">Desc</Badge>
                            )}
                            {entry.result.seoImprovements?.keywords && (
                              <Badge variant="outline" className="bg-primary/10">Keys</Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="summary" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Optimizations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-3xl font-bold">
                    {summary.totalOptimizations}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-3xl font-bold">
                    {summary.avgScore}%
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Highest Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-3xl font-bold text-green-500">
                    {summary.highestScore}%
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Lowest Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-3xl font-bold text-amber-500">
                    {summary.lowestScore}%
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Type Breakdown</CardTitle>
                  <CardDescription>
                    Distribution of optimizations by content type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {Object.keys(summary.contentTypeBreakdown).length === 0 ? (
                    <p className="text-sm text-muted-foreground">No data available</p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(summary.contentTypeBreakdown).map(([type, count]) => (
                        <div key={type}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                            <span className="text-sm font-medium">
                              {count} ({Math.round((count / summary.totalOptimizations) * 100)}%)
                            </span>
                          </div>
                          <div className="w-full bg-muted h-2.5 rounded-full">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ 
                                width: `${(count / summary.totalOptimizations) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Improvement Types</CardTitle>
                  <CardDescription>
                    Types of improvements made by HERMES
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {summary.totalOptimizations === 0 ? (
                    <p className="text-sm text-muted-foreground">No data available</p>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Title Improvements</span>
                          <span className="text-sm font-medium">
                            {summary.improvement.title} ({Math.round((summary.improvement.title / summary.totalOptimizations) * 100)}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted h-2.5 rounded-full">
                          <div 
                            className="bg-green-500 h-2.5 rounded-full" 
                            style={{ 
                              width: `${(summary.improvement.title / summary.totalOptimizations) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Description Improvements</span>
                          <span className="text-sm font-medium">
                            {summary.improvement.description} ({Math.round((summary.improvement.description / summary.totalOptimizations) * 100)}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted h-2.5 rounded-full">
                          <div 
                            className="bg-blue-500 h-2.5 rounded-full" 
                            style={{ 
                              width: `${(summary.improvement.description / summary.totalOptimizations) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Keyword Improvements</span>
                          <span className="text-sm font-medium">
                            {summary.improvement.keywords} ({Math.round((summary.improvement.keywords / summary.totalOptimizations) * 100)}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted h-2.5 rounded-full">
                          <div 
                            className="bg-purple-500 h-2.5 rounded-full" 
                            style={{ 
                              width: `${(summary.improvement.keywords / summary.totalOptimizations) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HermesSeoHistory;
