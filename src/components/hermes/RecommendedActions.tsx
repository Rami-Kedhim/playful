
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RecommendedAction } from '@/types/core-systems';

interface RecommendedActionsProps {
  actions: RecommendedAction[];
  onActionTaken?: (actionId: string) => void;
  title?: string;
  loading?: boolean;
  emptyMessage?: string;
}

const RecommendedActions: React.FC<RecommendedActionsProps> = ({
  actions,
  onActionTaken,
  title = "Recommended Actions",
  loading = false,
  emptyMessage = "No recommended actions at this time."
}) => {
  const [actionsState, setActionsState] = useState<RecommendedAction[]>(actions);

  const handleActionClick = (actionId: string) => {
    // Find the action
    const action = actionsState.find(a => a.id === actionId);
    if (!action) return;

    // Update the actions state to remove this action
    setActionsState(prevActions => prevActions.filter(a => a.id !== actionId));

    // Notify parent component
    if (onActionTaken) {
      onActionTaken(actionId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading recommendations...</div>
        ) : actionsState.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">{emptyMessage}</div>
        ) : (
          <div className="space-y-4">
            {actionsState.map((action) => (
              <div key={action.id} className="flex justify-between items-start gap-4 p-3 bg-muted/50 rounded-md">
                <div>
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleActionClick(action.id)}
                >
                  {action.action || "Take Action"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;
