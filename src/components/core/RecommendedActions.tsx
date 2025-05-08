
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { hermes } from '@/core/Hermes';

interface RecommendedAction {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: number;
  action: string;
  actionLabel: string;
  iconName?: string;
}

export const RecommendedActions: React.FC<{ userId: string }> = ({ userId }) => {
  const [actions, setActions] = useState<RecommendedAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedActions = async () => {
      try {
        // Mock implementation until hermes.recommendNextAction is fully implemented
        const mockActions: RecommendedAction[] = [
          {
            id: 'action-1',
            type: 'boost',
            title: 'Boost Your Profile',
            description: 'Increase your visibility by boosting your profile for 24 hours.',
            priority: 5,
            action: '/boost',
            actionLabel: 'Boost Now'
          },
          {
            id: 'action-2',
            type: 'complete-profile',
            title: 'Complete Your Profile',
            description: 'Add more details to your profile to attract more visitors.',
            priority: 4,
            action: '/profile/edit',
            actionLabel: 'Edit Profile'
          }
        ];
        
        setActions(mockActions);
      } catch (error) {
        console.error('Error fetching recommended actions:', error);
        setActions([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecommendedActions();
    }
  }, [userId]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground">Loading recommendations...</p>
        </CardContent>
      </Card>
    );
  }

  if (actions.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground">No recommendations available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3">Recommended Actions</h3>
        <div className="space-y-3">
          {actions.map((action) => (
            <div key={action.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <h4 className="font-medium">{action.title}</h4>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
              <Button 
                size="sm" 
                variant="default"
                className="ml-2 flex-shrink-0"
                asChild
              >
                <a href={action.action}>{action.actionLabel}</a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;
