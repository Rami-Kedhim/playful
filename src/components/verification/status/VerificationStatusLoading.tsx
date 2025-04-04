
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const VerificationStatusLoading = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-6">
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Checking verification status...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationStatusLoading;
