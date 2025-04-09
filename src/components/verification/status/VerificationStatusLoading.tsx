
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';

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
        <div className="py-6 flex justify-center items-center">
          <div className="space-y-4">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5 animate-pulse"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationStatusLoading;
