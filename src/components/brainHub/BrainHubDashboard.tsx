
import React from 'react';
import SuperlativeBrainHub from './SuperlativeBrainHub';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const BrainHubDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Alert className="bg-amber-50 border-amber-200">
        <InfoIcon className="h-4 w-4 text-amber-800" />
        <AlertTitle className="text-amber-800">Superlative Brain Hub Prototype</AlertTitle>
        <AlertDescription className="text-amber-700">
          You are accessing the next-generation neural intelligence system. Use the Advanced Mode toggle to activate enhanced capabilities.
        </AlertDescription>
      </Alert>
      
      <Separator />
      
      <SuperlativeBrainHub />
    </div>
  );
};

export default BrainHubDashboard;
