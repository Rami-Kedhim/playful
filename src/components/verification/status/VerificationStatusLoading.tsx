
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const VerificationStatusLoading = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-20 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationStatusLoading;
