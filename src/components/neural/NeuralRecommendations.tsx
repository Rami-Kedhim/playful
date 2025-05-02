
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Brain, Zap, AlertCircle, CheckCircle, ChevronDown, ChevronUp, Clock, Cpu, Database, BarChart, Shield } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  type: 'performance' | 'security' | 'resource' | 'optimization';
  timeToImplement: string;
  automated: boolean;
  implemented: boolean;
}

const NeuralRecommendations: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const mockRecommendations: Recommendation[] = [
    {
      id: 'rec-1',
      title: 'Optimize memory allocation for language processing module',
      description: 'The language processing module is currently using more memory than necessary. Reducing allocation by 15% can improve overall system performance without affecting accuracy.',
      impact: 'high',
      type: 'performance',
      timeToImplement: '5 minutes',
      automated: true,
      implemented: false
    },
    {
      id: 'rec-2',
      title: 'Implement neural network caching for repeated queries',
      description: 'Analysis shows that 27% of queries are repeated within a 1-hour window. Implementing a caching layer can significantly reduce processing load and improve response times.',
      impact: 'high',
      type: 'optimization',
      timeToImplement: '30 minutes',
      automated: false,
      implemented: false
    },
    {
      id: 'rec-3',
      title: 'Update security certificates for neural data transmission',
      description: 'Security certificates for neural data transmission will expire in 14 days. Updating certificates now will prevent potential security vulnerabilities.',
      impact: 'medium',
      type: 'security',
      timeToImplement: '15 minutes',
      automated: false,
      implemented: true
    },
    {
      id: 'rec-4',
      title: 'Scale down inactive processing nodes during low-traffic periods',
      description: 'System analysis shows that processing capacity is overallocated during overnight hours. Implementing automatic scaling can reduce resource usage by up to 40% during these periods.',
      impact: 'medium',
      type: 'resource',
      timeToImplement: '10 minutes',
      automated: true,
      implemented: false
    },
    {
      id: 'rec-5',
      title: 'Enable parallel processing for image recognition tasks',
      description: 'Image recognition tasks are currently processed sequentially. Enabling parallel processing can improve throughput by approximately 65% for these operations.',
      impact: 'high',
      type: 'performance',
      timeToImplement: '20 minutes',
      automated: false,
      implemented: false
    },
    {
      id: 'rec-6',
      title: 'Implement regular security scanning for neural modules',
      description: 'Adding automated security scanning to detect potential vulnerabilities in neural modules can enhance system protection and integrity.',
      impact: 'medium',
      type: 'security',
      timeToImplement: '25 minutes',
      automated: true,
      implemented: false
    },
  ];
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return '';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return <Zap className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'resource': return <Database className="h-4 w-4" />;
      case 'optimization': return <Cpu className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'performance': return 'Performance';
      case 'security': return 'Security';
      case 'resource': return 'Resources';
      case 'optimization': return 'Optimization';
      default: return type;
    }
  };
  
  const filteredRecommendations = activeTab === 'all' 
    ? mockRecommendations 
    : mockRecommendations.filter(rec => rec.type === activeTab);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle>Neural System Recommendations</CardTitle>
              <CardDescription>Smart suggestions to improve system performance and security</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <BarChart className="h-4 w-4 mr-2" />
                Analyze System
              </Button>
              <Button variant="default" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Apply All Automated
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <div className="border-b mb-4">
              <TabsList className="w-full justify-start bg-transparent border-b-0 mb-[-1px] gap-4">
                <TabsTrigger 
                  value="all" 
                  className="border-b-2 rounded-none border-transparent data-[state=active]:border-primary"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="performance" 
                  className="border-b-2 rounded-none border-transparent data-[state=active]:border-primary"
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Performance
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="border-b-2 rounded-none border-transparent data-[state=active]:border-primary"
                >
                  <Shield className="h-4 w-4 mr-1" />
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="resource" 
                  className="border-b-2 rounded-none border-transparent data-[state=active]:border-primary"
                >
                  <Database className="h-4 w-4 mr-1" />
                  Resources
                </TabsTrigger>
                <TabsTrigger 
                  value="optimization" 
                  className="border-b-2 rounded-none border-transparent data-[state=active]:border-primary"
                >
                  <Cpu className="h-4 w-4 mr-1" />
                  Optimization
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-3">
                {filteredRecommendations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-md">
                    <Brain className="h-12 w-12 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No Recommendations</h3>
                    <p className="text-sm text-muted-foreground mt-1">No {activeTab} recommendations available</p>
                    <Button variant="outline" className="mt-4">Generate Recommendations</Button>
                  </div>
                ) : (
                  filteredRecommendations.map((recommendation) => (
                    <Card key={recommendation.id} className={`${recommendation.implemented ? 'bg-muted/30 border-muted' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                {recommendation.implemented ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  getTypeIcon(recommendation.type)
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="font-medium text-sm">{recommendation.title}</h3>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getImpactColor(recommendation.impact)}`}
                                >
                                  {recommendation.impact} impact
                                </Badge>
                                {recommendation.automated && (
                                  <Badge variant="secondary" className="text-xs">
                                    Automated
                                  </Badge>
                                )}
                                {recommendation.implemented && (
                                  <Badge variant="outline" className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                    Implemented
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {getTypeLabel(recommendation.type)}
                                </Badge>
                              </div>
                              
                              {expandedId === recommendation.id && (
                                <div className="mt-2 mb-3">
                                  <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                      <span className="text-xs text-muted-foreground">
                                        {recommendation.timeToImplement}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex flex-wrap gap-2 mt-2">
                                {!recommendation.implemented && (
                                  <>
                                    <Button 
                                      variant={recommendation.automated ? "default" : "outline"} 
                                      size="sm"
                                      className="h-7"
                                    >
                                      {recommendation.automated ? "Apply Automatically" : "Implement Manually"}
                                    </Button>
                                  </>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-7"
                                  onClick={() => toggleExpand(recommendation.id)}
                                >
                                  {expandedId === recommendation.id ? (
                                    <>Less <ChevronUp className="h-3 w-3 ml-1" /></>
                                  ) : (
                                    <>More <ChevronDown className="h-3 w-3 ml-1" /></>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Impact Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Performance Improvement</span>
                  <span className="text-sm font-medium">+24%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[24%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Security Enhancement</span>
                  <span className="text-sm font-medium">+18%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[18%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Resource Optimization</span>
                  <span className="text-sm font-medium">+32%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[32%]"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Implementation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="h-2 w-2 p-0 rounded-full bg-green-500" />
                  <span className="text-sm">Implemented</span>
                </div>
                <span className="text-sm font-medium">
                  {mockRecommendations.filter(r => r.implemented).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="h-2 w-2 p-0 rounded-full bg-amber-500" />
                  <span className="text-sm">Pending</span>
                </div>
                <span className="text-sm font-medium">
                  {mockRecommendations.filter(r => !r.implemented && !r.automated).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="h-2 w-2 p-0 rounded-full bg-blue-500" />
                  <span className="text-sm">Ready for Automation</span>
                </div>
                <span className="text-sm font-medium">
                  {mockRecommendations.filter(r => !r.implemented && r.automated).length}
                </span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="h-2 w-2 p-0 rounded-full bg-red-500" />
                  <span className="text-sm">High Impact Pending</span>
                </div>
                <span className="text-sm font-medium">
                  {mockRecommendations.filter(r => !r.implemented && r.impact === 'high').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <p className="text-sm">Security certificates updated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  <AlertCircle className="h-3 w-3 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm">Memory optimization recommended</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <p className="text-sm">Daily system scan completed</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <p className="text-sm">Cache cleared automatically</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NeuralRecommendations;
