
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertTriangle, Info, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NeuralRecommendationsProps {
  className?: string;
}

const NeuralRecommendations: React.FC<NeuralRecommendationsProps> = ({ className }) => {
  // Sample recommendations data
  const recommendations = [
    {
      id: 1,
      message: 'Optimize neural pathways for improved response time',
      severity: 'high',
      icon: 'alert',
      actionable: true
    },
    {
      id: 2,
      message: 'Consider upgrading memory allocation for complex operations',
      severity: 'medium',
      icon: 'info',
      actionable: true
    },
    {
      id: 3,
      message: 'Schedule maintenance during low-traffic periods',
      severity: 'low',
      icon: 'clock',
      actionable: true
    },
    {
      id: 4,
      message: 'All core neural systems operating within normal parameters',
      severity: 'info',
      icon: 'check',
      actionable: false
    }
  ];

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
      default:
        return <Check className="h-5 w-5" />;
    }
  };

  const handleAction = (id: number) => {
    console.log(`Action taken on recommendation ${id}`);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Neural System Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map(rec => (
            <div 
              key={rec.id} 
              className="p-3 rounded-lg border flex flex-col space-y-2"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-1.5 rounded-full ${getSeverityColor(rec.severity)}`}>
                  {getIcon(rec.icon)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{rec.message}</p>
                  {rec.actionable && (
                    <div className="mt-2">
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralRecommendations;
