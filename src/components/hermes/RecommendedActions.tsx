
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

export const RecommendedActions: React.FC<RecommendedActionsProps> = ({ timeRange = '7d' }) => {
  const [action, setAction] = useState<RecommendedAction | null>(null);
  
  const hermesOptions: UseHermesFlowOptions = {
    autoConnect: true,
    initialTimeRange: timeRange
  };
  
  const { isLoading, isConnected, getRecommendedAction, trackStep } = useHermesFlow(hermesOptions);
  
  useEffect(() => {
    if (isConnected && !isLoading) {
      const recommendedAction = getRecommendedAction();
      setAction(recommendedAction);
    }
  }, [isConnected, isLoading, getRecommendedAction]);
  
  const handleActionClick = () => {
    if (action) {
      trackStep('recommended_action_clicked', { actionType: action.type });
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
  
  if (!action) {
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
    switch (action.priority) {
      case 'high': return 'border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30';
      case 'medium': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-900/30';
      case 'low': return 'border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-900/30';
      default: return '';
    }
  };
  
  return (
    <Card className={getPriorityColor()}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CircleAlert className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
          {action.title}
        </CardTitle>
        <CardDescription>
          {action.reason || "Recommended action to improve your metrics"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          {action.description}
        </p>
      </CardContent>
      {(action.actionUrl || action.destination) && (
        <CardFooter>
          <Button asChild onClick={handleActionClick}>
            <Link to={action.actionUrl || action.destination || "#"}>
              {action.action || "Take Action"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RecommendedActions;
