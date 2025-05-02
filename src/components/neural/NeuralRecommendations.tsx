
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';

const NeuralRecommendations: React.FC = () => {
  const { analyticsData, loading } = useNeuralAnalytics();
  
  // Mock recommendations data (would be derived from analytics in a real app)
  const recommendations = [
    {
      id: 'rec-1',
      title: 'Optimize memory allocation',
      priority: 'high',
      applied: false,
      impact: 'Potential 15% performance improvement'
    },
    {
      id: 'rec-2',
      title: 'Update neural model parameters',
      priority: 'medium',
      applied: false,
      impact: 'Increased accuracy in content matching'
    },
    {
      id: 'rec-3',
      title: 'Schedule system maintenance',
      priority: 'low',
      applied: true,
      impact: 'Improved system stability'
    }
  ];
  
  const handleApplyRecommendation = (id: string) => {
    console.log(`Applying recommendation ${id}`);
    // In a real app, this would make an API call to apply the recommendation
  };
  
  const handleDismissRecommendation = (id: string) => {
    console.log(`Dismissing recommendation ${id}`);
    // In a real app, this would make an API call to dismiss the recommendation
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
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="p-3">
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-full ${rec.priority === 'high' ? 'bg-red-100 text-red-600' : rec.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                  {!rec.applied && <AlertTriangle className="h-4 w-4" />}
                  {rec.applied && <Check className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm line-clamp-2">{rec.title}</p>
                    {!rec.applied && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-xs"
                          onClick={() => handleDismissRecommendation(rec.id)}
                        >
                          Ignore
                        </Button>
                        <Button 
                          size="sm" 
                          className="h-7 px-2 text-xs"
                          onClick={() => handleApplyRecommendation(rec.id)}
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{rec.impact}</p>
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
