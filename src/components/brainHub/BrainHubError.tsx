
import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";

interface BrainHubErrorProps {
  title?: string;
  description?: string;
  errors?: string[];
  onRetry?: () => void;
}

const BrainHubError: React.FC<BrainHubErrorProps> = ({
  title = "Brain Hub Error",
  description = "There was an error initializing the Brain Hub.",
  errors = [],
  onRetry
}) => {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      
      {errors.length > 0 && (
        <div className="bg-destructive/10 rounded-lg p-4 space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="text-sm text-destructive">
              {error}
            </div>
          ))}
        </div>
      )}
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          className="mt-4"
          variant="outline"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  );
};

export default BrainHubError;
