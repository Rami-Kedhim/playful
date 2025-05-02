
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Lightbulb, AlertTriangle, ArrowRight } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'optimization' | 'warning' | 'improvement';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  autoApplicable: boolean;
}

const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    type: 'optimization',
    title: 'Optimize neural resource allocation',
    description: 'Reallocate resources from idle services to high-demand services',
    impact: 'high',
    autoApplicable: true
  },
  {
    id: 'rec-2',
    type: 'warning',
    title: 'Memory leak detected',
    description: 'Potential memory leak in the content analysis service',
    impact: 'medium',
    autoApplicable: false
  },
  {
    id: 'rec-3',
    type: 'improvement',
    title: 'Enable continuous learning',
    description: 'Activate continuous learning to improve model accuracy',
    impact: 'medium',
    autoApplicable: true
  },
  {
    id: 'rec-4',
    type: 'optimization',
    title: 'Reduce model size',
    description: 'Switch to a lighter model for non-critical operations',
    impact: 'low',
    autoApplicable: true
  }
];

const NeuralRecommendations: React.FC = () => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization':
        return <Lightbulb className="h-4 w-4 text-primary" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'improvement':
        return <ArrowRight className="h-4 w-4 text-green-500" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };
  
  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-3">
        {mockRecommendations.length === 0 ? (
          <div className="text-center py-8">
            <Lightbulb className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No recommendations at this time</p>
          </div>
        ) : (
          mockRecommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="p-3 border rounded-lg hover:bg-accent/5 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  {getTypeIcon(rec.type)}
                  <div>
                    <h4 className="text-sm font-medium">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium ${getImpactColor(rec.impact)}`}>
                  {rec.impact} impact
                </span>
              </div>
              
              {rec.autoApplicable && (
                <div className="mt-2 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-xs h-7">
                    Apply
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default NeuralRecommendations;
