
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Check, AlertTriangle, ArrowRight, Zap, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';

const NeuralRecommendations: React.FC = () => {
  const { analyticsData, loading } = useNeuralAnalytics();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  
  useEffect(() => {
    if (analyticsData) {
      // Generate recommendations based on analytics data
      const newRecommendations = [];
      
      // Check memory usage
      if (analyticsData.systemMetrics.memoryUsage > 75) {
        newRecommendations.push({
          id: 'rec-1',
          title: 'Optimize memory allocation',
          priority: 'high',
          applied: false,
          impact: 'Potential 15% performance improvement',
          details: 'Memory usage is above 75%, optimization can free up resources and improve system response time.'
        });
      }
      
      // Check error rate
      if (analyticsData.systemMetrics.errorRate > 1.0) {
        newRecommendations.push({
          id: 'rec-2',
          title: 'Investigate error rate increase',
          priority: 'high',
          applied: false,
          impact: 'Reduce failed operations by up to 30%',
          details: 'Error rate has increased above normal threshold. Review logs and recent changes to identify the cause.'
        });
      }
      
      // Check response time
      if (analyticsData.systemMetrics.responseTimeMs > 150) {
        newRecommendations.push({
          id: 'rec-3',
          title: 'Optimize neural processing pathways',
          priority: 'medium',
          applied: false,
          impact: 'Reduce response time by 20-40ms',
          details: 'Response time is higher than optimal. Consider adjusting processing parameters or caching frequently accessed data.'
        });
      }
      
      // Check model performance
      if (analyticsData.modelPerformance && analyticsData.modelPerformance.accuracy < 0.9) {
        newRecommendations.push({
          id: 'rec-4',
          title: 'Schedule neural model retraining',
          priority: 'medium',
          applied: false,
          impact: 'Improve accuracy by 3-5%',
          details: 'Model accuracy has dropped below target threshold. Retraining with recent data can improve performance.'
        });
      }
      
      // Add maintenance recommendation
      if (analyticsData.systemHealth && Date.now() - new Date(analyticsData.systemHealth.lastMaintenanceDate).getTime() > 30 * 24 * 60 * 60 * 1000) {
        newRecommendations.push({
          id: 'rec-5',
          title: 'Schedule routine maintenance',
          priority: 'low',
          applied: false,
          impact: 'Ensure long-term system stability',
          details: 'It has been over 30 days since the last maintenance operation. Consider scheduling routine checkups to prevent issues.'
        });
      }
      
      // Add a few standard recommendations if none were generated
      if (newRecommendations.length === 0) {
        newRecommendations.push({
          id: 'rec-standard-1',
          title: 'Enable automatic optimization',
          priority: 'low',
          applied: false,
          impact: 'Maintain optimal performance',
          details: 'Enable the automated optimization system to continuously adjust parameters for best results.'
        });
        
        newRecommendations.push({
          id: 'rec-standard-2',
          title: 'Review security settings',
          priority: 'low',
          applied: false,
          impact: 'Enhanced system security',
          details: 'Periodically review security settings to ensure they align with current best practices.'
        });
      }
      
      setRecommendations(newRecommendations);
    }
  }, [analyticsData]);
  
  const handleApplyRecommendation = (id: string) => {
    setRecommendations(
      recommendations.map(rec => 
        rec.id === id ? { ...rec, applied: true } : rec
      )
    );
    // In a real app, this would make an API call to apply the recommendation
  };
  
  const handleDismissRecommendation = (id: string) => {
    setRecommendations(recommendations.filter(rec => rec.id !== id));
    // In a real app, this would make an API call to dismiss the recommendation
  };

  const handleFeedback = (id: string, isPositive: boolean) => {
    console.log(`Feedback for recommendation ${id}: ${isPositive ? 'positive' : 'negative'}`);
    // In a real app, this would send feedback to improve future recommendations
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin h-5 w-5 border-t-2 border-primary border-r-2 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      {recommendations.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-4">
          <Check className="h-8 w-8 text-green-500 mb-2" />
          <p className="text-muted-foreground">All systems operating optimally</p>
          <p className="text-xs text-muted-foreground mt-1">No recommendations at this time</p>
        </div>
      ) : (
        <div className="space-y-3 pb-1">
          {recommendations.map((rec) => (
            <Card key={rec.id} className={`p-3 ${rec.applied ? 'bg-muted/30' : ''}`}>
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-full flex-shrink-0 ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-600' : 
                  rec.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 
                  'bg-blue-100 text-blue-600'
                }`}>
                  {rec.applied ? <Check className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`font-medium text-sm ${rec.applied ? 'line-through text-muted-foreground' : ''}`}>
                        {rec.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px] px-1 h-4">
                          {rec.priority}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{rec.impact}</p>
                      </div>
                    </div>
                    
                    {!rec.applied && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => handleDismissRecommendation(rec.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p className="text-xs">Dismiss recommendation</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <Button 
                          size="sm" 
                          className="h-7 px-2 text-xs"
                          onClick={() => handleApplyRecommendation(rec.id)}
                        >
                          <Zap className="h-3.5 w-3.5 mr-1" />
                          Apply
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {rec.details && (
                    <>
                      <Separator className="my-2" />
                      <p className="text-xs text-muted-foreground">{rec.details}</p>
                    </>
                  )}
                  
                  {rec.applied && (
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-xs text-green-600 font-medium">Applied</p>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={() => handleFeedback(rec.id, true)}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={() => handleFeedback(rec.id, false)}
                        >
                          <ThumbsDown className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
          
          <Button variant="ghost" size="sm" className="w-full mt-2">
            <span>View all recommendations</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default NeuralRecommendations;
