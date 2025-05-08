
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

const SafetyTips: React.FC = () => {
  return (
    <div className="space-y-6">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Safety First</AlertTitle>
        <AlertDescription>
          Always prioritize your safety when meeting new people. We recommend following these guidelines.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Essential Safety Tips</h3>
        
        <div>
          <h4 className="font-medium mb-1">Verify Identity</h4>
          <p className="text-sm text-muted-foreground">
            Always verify the identity of the person you're meeting. Look for verified profiles and read reviews.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Public Meeting</h4>
          <p className="text-sm text-muted-foreground">
            For initial meetings, choose a public location like a hotel lobby or a café.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Share Your Location</h4>
          <p className="text-sm text-muted-foreground">
            Let a trusted friend know where you're going, who you're meeting, and when you expect to return.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Trust Your Instincts</h4>
          <p className="text-sm text-muted-foreground">
            If something doesn't feel right, don't hesitate to leave the situation.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Stay Sober</h4>
          <p className="text-sm text-muted-foreground">
            Maintain clarity of mind by avoiding excessive alcohol or substances.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Emergency Contact</h4>
          <p className="text-sm text-muted-foreground">
            Have emergency contacts readily available on your phone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;
