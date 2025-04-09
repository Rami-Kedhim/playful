
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

const VerificationStatusLoading = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-4 w-64 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="my-4">
          <Skeleton className="h-2 w-full mb-1" />
          <Progress value={30} className="h-2 animate-pulse" />
        </div>
        
        <Skeleton className="h-10 w-full mb-6" />
        
        <div className="bg-muted/50 p-4 rounded-md">
          <div className="flex justify-between mb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
          
          <div className="flex justify-between mb-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-28" />
          </div>
          
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        
        <Skeleton className="h-10 w-full mt-6" />
      </CardContent>
    </Card>
  );
};

export default VerificationStatusLoading;
