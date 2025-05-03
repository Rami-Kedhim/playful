
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SafetyTips: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Safety Tips</h3>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Meeting in person?</AlertTitle>
        <AlertDescription>
          Always meet in a public place for the first time.
        </AlertDescription>
      </Alert>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Share your route</AlertTitle>
        <AlertDescription>
          Use the route sharing feature to let a trusted contact know your whereabouts.
        </AlertDescription>
      </Alert>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Trust your instincts</AlertTitle>
        <AlertDescription>
          If something doesn't feel right, don't hesitate to leave the situation.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SafetyTips;
