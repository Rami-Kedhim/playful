
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getRecommendedAction } from '@/core/index';
import { RecommendedAction } from '@/types/core-systems';
import { Zap, ChevronRight } from 'lucide-react';

interface RecommendedActionsProps {
  userId: string;
  limit?: number;
}

const RecommendedActions: React.FC<RecommendedActionsProps> = ({ 
  userId,
  limit = 3
}) => {
  const [recommendations, setRecommendations] = useState<RecommendedAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = () => {
      setIsLoading(true);
      
      try {
        // In a real app, we'd fetch multiple recommendations
        // For now, we'll simulate by calling the function multiple times
        const actions = Array.from({ length: limit }).map(() => 
          getRecommendedAction(userId)
        );
        
        // Sort by priority (highest first)
        const sortedActions = [...actions].sort((a, b) => b.priority - a.priority);
        
        setRecommendations(sortedActions);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [userId, limit]);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Zap className="h-4 w-4 mr-2 text-yellow-500" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="h-12 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Zap className="h-4 w-4 mr-2 text-yellow-500" />
          Recommended Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {recommendations.map((action, index) => (
            <Link 
              key={index} 
              to={action.destination || '#'}
              className="block"
            >
              <Button 
                variant="outline" 
                className="w-full justify-between h-auto py-3 group"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">
                    {actionToTitle(action.action)}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {action.reason}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper to convert action names to display titles
function actionToTitle(action: string): string {
  const mapping: Record<string, string> = {
    'complete_profile': 'Complete Your Profile',
    'browse_escorts': 'Browse Escorts',
    'check_messages': 'Check Messages',
    'purchase_credits': 'Purchase Credits',
    'update_photos': 'Update Your Photos',
    'setup_verification': 'Get Verified',
    'boost_profile': 'Boost Your Profile'
  };
  
  return mapping[action] || action.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export default RecommendedActions;
