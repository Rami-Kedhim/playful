
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertTriangle, Info, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface NeuralRecommendationsProps {
  className?: string;
}

interface Recommendation {
  id: number;
  message: string;
  severity: 'high' | 'medium' | 'low' | 'info';
  icon: 'alert' | 'info' | 'clock' | 'check' | 'zap';
  actionable: boolean;
  impact?: string;
  autoApply?: boolean;
}

const NeuralRecommendations: React.FC<NeuralRecommendationsProps> = ({ className }) => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: 1,
      message: 'Optimize neural pathways for improved response time',
      severity: 'high',
      icon: 'alert',
      actionable: true,
      impact: 'Could improve response time by up to 15%',
      autoApply: false
    },
    {
      id: 2,
      message: 'Consider upgrading memory allocation for complex operations',
      severity: 'medium',
      icon: 'info',
      actionable: true,
      impact: 'Would reduce memory bottlenecks during peak usage',
      autoApply: false
    },
    {
      id: 3,
      message: 'Schedule maintenance during low-traffic periods',
      severity: 'low',
      icon: 'clock',
      actionable: true,
      impact: 'Minimizes impact on system availability',
      autoApply: true
    },
    {
      id: 4,
      message: 'Apply neural network optimization algorithm',
      severity: 'medium',
      icon: 'zap',
      actionable: true,
      impact: 'Could improve accuracy by up to 8%',
      autoApply: false
    },
    {
      id: 5,
      message: 'All core neural systems operating within normal parameters',
      severity: 'info',
      icon: 'check',
      actionable: false
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-950/30';
      case 'medium':
        return 'text-amber-500 bg-amber-50 dark:bg-amber-950/30';
      case 'low':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-950/30';
      default:
        return 'text-green-500 bg-green-50 dark:bg-green-950/30';
    }
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5" />;
      case 'info':
        return <Info className="h-5 w-5" />;
      case 'clock':
        return <Clock className="h-5 w-5" />;
      case 'zap':
        return <Zap className="h-5 w-5" />;
      default:
        return <Check className="h-5 w-5" />;
    }
  };

  const handleAction = (id: number) => {
    const recommendation = recommendations.find(rec => rec.id === id);
    if (!recommendation) return;
    
    // Apply the recommendation
    toast({
      title: "Recommendation Applied",
      description: `Applied: ${recommendation.message}`,
    });
    
    // Remove the recommendation from the list
    setRecommendations(prevRecs => prevRecs.filter(rec => rec.id !== id));
  };

  const handleAutoApply = () => {
    const autoApplicable = recommendations.filter(rec => rec.autoApply && rec.actionable);
    
    if (autoApplicable.length === 0) {
      toast({
        title: "No Auto-Applicable Recommendations",
        description: "There are no recommendations that can be automatically applied.",
      });
      return;
    }
    
    const appliedIds = autoApplicable.map(rec => rec.id);
    
    toast({
      title: "Auto-Applied Recommendations",
      description: `Applied ${autoApplicable.length} recommendations automatically.`,
    });
    
    setRecommendations(prevRecs => prevRecs.filter(rec => !appliedIds.includes(rec.id)));
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Neural System Recommendations</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAutoApply}
        >
          Auto-Apply Safe Changes
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Check className="h-8 w-8 mx-auto mb-2" />
              <p>All recommendations have been applied. System running optimally.</p>
            </div>
          ) : (
            recommendations.map(rec => (
              <div 
                key={rec.id} 
                className="p-3 rounded-lg border flex flex-col space-y-2 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-1.5 rounded-full ${getSeverityColor(rec.severity)}`}>
                    {getIcon(rec.icon)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{rec.message}</p>
                    {rec.impact && (
                      <p className="text-sm text-muted-foreground mt-1">{rec.impact}</p>
                    )}
                    {rec.actionable && (
                      <div className="mt-3">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleAction(rec.id)}
                        >
                          Apply Recommendation
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralRecommendations;
