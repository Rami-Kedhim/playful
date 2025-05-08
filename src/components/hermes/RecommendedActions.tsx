
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleAlert, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useHermesFlow, { UseHermesFlowOptions } from '@/hooks/useHermesFlow';
import { RecommendedAction } from '@/types/core-systems';
import { Skeleton } from "@/components/ui/skeleton";

interface RecommendedActionsProps {
  timeRange?: string;
}

// Define the type for the useHermesFlow recommendedAction
interface HermesFlowAction {
  id?: string;
  title?: string;
  description?: string;
  priority?: number;
  action?: string;
  type?: string;
}

export const RecommendedActions: React.FC<RecommendedActionsProps> = ({ timeRange = '7d' }) => {
  const [currentAction, setCurrentAction] = useState<RecommendedAction | null>(null);
  
  const hermesOptions: UseHermesFlowOptions = {
    autoConnect: true,
    initialTimeRange: timeRange
  };
  
  const { isLoading, isConnected, getRecommendedAction, trackStep } = useHermesFlow(hermesOptions);
  
  useEffect(() => {
    if (isConnected && !isLoading) {
      const recommendedAction = getRecommendedAction();
      if (recommendedAction) {
        // Convert from hook's RecommendedAction to our core-systems RecommendedAction
        setCurrentAction({
          id: recommendedAction.id || `action-${Date.now()}`,
          title: recommendedAction.title || '',
          description: recommendedAction.description || '',
          priority: typeof recommendedAction.priority === 'number' ? recommendedAction.priority : 0,
          action: recommendedAction.action || '#',
          type: recommendedAction.type
        });
      }
    }
  }, [isConnected, isLoading, getRecommendedAction]);
  
  const handleActionClick = () => {
    if (currentAction) {
      trackStep('recommended_action_clicked', { actionId: currentAction.id });
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-[120px]" />
        </CardFooter>
      </Card>
    );
  }
  
  if (!currentAction) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/30">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            No Actions Needed
          </CardTitle>
          <CardDescription>
            Your profile is performing well at the moment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            All of your metrics look good. Continue with your current strategy.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const getPriorityColor = () => {
    const priority = currentAction.priority;
    
    if (priority > 8) return 'border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30';
    if (priority > 5) return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-900/30';
    return 'border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-900/30';
  };
  
  return (
    <Card className={getPriorityColor()}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CircleAlert className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
          {currentAction.title}
        </CardTitle>
        <CardDescription>
          {currentAction.description || "Recommended action to improve your metrics"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          {currentAction.description}
        </p>
      </CardContent>
      {typeof currentAction.action === 'string' && (
        <CardFooter>
          <Button asChild onClick={handleActionClick}>
            <Link to={currentAction.action as string}>
              Take Action
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RecommendedActions;
