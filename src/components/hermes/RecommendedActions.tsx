
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, BarChart, Lightbulb, TrendingUp } from 'lucide-react';

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: 'boost' | 'verify' | 'complete' | 'optimize';
  action: string;
  status?: 'pending' | 'completed' | 'in_progress'; // Add status property
  onClick?: () => void;
}

interface RecommendedActionsProps {
  actions: RecommendedAction[];
  onActionClick?: (action: RecommendedAction) => void;
}

const RecommendedActions: React.FC<RecommendedActionsProps> = ({ 
  actions, 
  onActionClick 
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'boost': return <TrendingUp className="h-8 w-8 text-primary" />;
      case 'verify': return <Lightbulb className="h-8 w-8 text-amber-500" />;
      case 'complete': return <ChevronRight className="h-8 w-8 text-green-500" />;
      default: return <BarChart className="h-8 w-8 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Recommended Actions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {actions.map(action => (
          <Card key={action.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                {getActionIcon(action.type)}
                <span className={`text-sm font-medium ${getPriorityColor(action.priority)}`}>
                  {action.priority.toUpperCase()}
                </span>
              </div>
              <CardTitle className="text-lg">{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm text-muted-foreground">
                {action.status && (
                  <div className="mb-2">
                    Status: <span className="font-medium">{action.status}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => action.onClick ? action.onClick() : onActionClick?.(action)}
              >
                {action.action}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedActions;
