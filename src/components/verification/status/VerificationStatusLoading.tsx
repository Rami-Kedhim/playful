
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, Clock } from 'lucide-react';

const VerificationStatusLoading = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Loader className="h-5 w-5 mr-2 animate-spin" />
          Checking Verification Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-6 flex flex-col items-center justify-center space-y-4">
          <Clock className="h-12 w-12 text-muted-foreground animate-pulse" />
          
          <p className="text-sm text-muted-foreground text-center">
            Please wait while we retrieve your verification status...
          </p>
          
          <div className="space-y-3 w-full max-w-md">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mx-auto animate-pulse"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mx-auto animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationStatusLoading;
