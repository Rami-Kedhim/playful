
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RecommendedAction } from '@/types/core-systems';
import { cn } from '@/lib/utils';

interface RecommendedActionsProps {
  actions: RecommendedAction[];
  onActionClick?: (action: RecommendedAction) => void;
  className?: string;
  limit?: number;
  loading?: boolean;
}

const RecommendedActions: React.FC<RecommendedActionsProps> = ({
  actions = [],
  onActionClick,
  className,
  limit = 3,
  loading = false
}) => {
  // Filter and sort actions by priority
  const prioritizedActions = actions
    .filter(action => action.status !== 'completed')
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);

  if (loading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-12 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (prioritizedActions.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No actions recommended at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Recommended Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {prioritizedActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3 flex items-center gap-2"
              onClick={() => onActionClick?.(action)}
            >
              {/* Render icon if available */}
              {action.icon && (
                <span className="text-primary">
                  {/* Icon would go here */}
                </span>
              )}
              <div>
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;
