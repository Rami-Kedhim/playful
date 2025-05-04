
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { useHermesFlow } from '@/hooks/useHermesFlow';

interface RecommendedActionsProps {
  userId: string;
  context?: Record<string, any>;
}

const RecommendedActions: React.FC<RecommendedActionsProps> = ({ userId, context }) => {
  const [recommendation, setRecommendation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hermesFlow = useHermesFlow('recommended-actions');

  const fetchRecommendation = async () => {
    setIsLoading(true);
    try {
      // Using the hermes.getRecommendedAction method from global hermes service
      const action = await hermesFlow.getRecommendedAction(userId, context);
      setRecommendation(action);
    } catch (error) {
      console.error('Error fetching recommended action:', error);
      setRecommendation('Explore our featured profiles to discover new connections.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendation();
  }, [userId]);

  const handleActionTaken = () => {
    hermesFlow.trackStep('recommendation_clicked', { 
      recommendation, 
      timestamp: new Date().toISOString() 
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{recommendation || 'Loading recommendation...'}</p>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleActionTaken}
          disabled={isLoading || !recommendation}
        >
          Take Action <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;
