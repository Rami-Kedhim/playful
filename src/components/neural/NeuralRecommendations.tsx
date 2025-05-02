
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Lightbulb, ArrowUpRight, Terminal, Gauge, Cpu, BarChart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const NeuralRecommendations = () => {
  // Recommendations data
  const recommendations = [
    {
      id: 'rec-1',
      title: 'Increase memory allocation',
      description: 'System is experiencing high memory pressure during peak loads. Increasing allocation by 20% can improve stability.',
      impact: 'high',
      category: 'performance',
      effort: 'medium',
      implemented: false
    },
    {
      id: 'rec-2',
      title: 'Optimize request batching',
      description: 'Current batching algorithm is not efficient for short requests. Implement dynamic batching based on request characteristics.',
      impact: 'medium',
      category: 'optimization',
      effort: 'high',
      implemented: false
    },
    {
      id: 'rec-3',
      title: 'Update neural model',
      description: 'A new version of the core neural model is available with 15% better accuracy and 8% lower latency.',
      impact: 'high',
      category: 'model',
      effort: 'low',
      implemented: false
    },
    {
      id: 'rec-4',
      title: 'Enable response caching',
      description: 'Frequently requested data patterns could be cached to reduce processing overhead and improve response times.',
      impact: 'medium',
      category: 'optimization',
      effort: 'low',
      implemented: true
    },
    {
      id: 'rec-5',
      title: 'Adjust error tolerance threshold',
      description: 'Current threshold is too conservative. Increasing it to 12% would improve throughput with minimal accuracy impact.',
      impact: 'low',
      category: 'configuration',
      effort: 'low',
      implemented: false
    },
  ];
  
  const handleImplement = (id: string) => {
    toast({
      title: "Implementation started",
      description: "The recommendation is being applied to the neural system.",
    });
  };

  const handleDismiss = (id: string) => {
    toast({
      title: "Recommendation dismissed",
      description: "This recommendation has been removed from your list.",
    });
  };
  
  // Filter active recommendations
  const activeRecommendations = recommendations.filter(rec => !rec.implemented);
  const implementedRecommendations = recommendations.filter(rec => rec.implemented);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance':
        return <Gauge className="h-5 w-5" />;
      case 'optimization':
        return <Terminal className="h-5 w-5" />;
      case 'model':
        return <Cpu className="h-5 w-5" />;
      case 'configuration':
        return <BarChart className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-500 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'medium':
        return 'text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800';
      case 'low':
        return 'text-blue-500 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      default:
        return 'text-gray-500 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };
  
  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
      case 'low':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Recommendations</CardTitle>
          <CardDescription>
            AI-generated recommendations to optimize neural system performance
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {activeRecommendations.length > 0 ? (
              activeRecommendations.map((recommendation) => (
                <div key={recommendation.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className={`p-2.5 rounded-full ${getImpactColor(recommendation.impact)} mt-1 shrink-0`}>
                      {getCategoryIcon(recommendation.category)}
                    </div>
                    
                    <div className="space-y-2 flex-grow">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium">{recommendation.title}</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="outline" className={getImpactColor(recommendation.impact)}>
                            {recommendation.impact} impact
                          </Badge>
                          <Badge variant="outline" className={getEffortColor(recommendation.effort)}>
                            {recommendation.effort} effort
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm">
                        {recommendation.description}
                      </p>
                      
                      <div className="pt-2 flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDismiss(recommendation.id)}
                        >
                          Dismiss
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleImplement(recommendation.id)}
                        >
                          Implement
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 p-3 rounded-full mb-3">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-xl mb-1">All caught up!</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  There are no pending recommendations for your neural system at this time.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {implementedRecommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recently Implemented</CardTitle>
            <CardDescription>
              Recommendations you've recently applied to your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {implementedRecommendations.map(recommendation => (
                <div key={recommendation.id} className="p-3 bg-muted/40 rounded-lg flex items-start gap-3">
                  <div className="p-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{recommendation.title}</h4>
                    <p className="text-xs text-muted-foreground">Implemented on May 1, 2025</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommendation Sources</CardTitle>
          <CardDescription>
            External resources for system optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 border-b pb-3">
              <div className="p-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Neural System Best Practices</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Official documentation with optimization techniques and configuration guides.
                </p>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <span>View Guide</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Performance Troubleshooting</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Learn how to diagnose and resolve common neural system performance issues.
                </p>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <span>View Guide</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuralRecommendations;
