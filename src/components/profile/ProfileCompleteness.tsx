
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Shield, AlertCircle, CheckCircle } from "lucide-react";

interface ProfileCompletenessProps {
  completeness: number;
}

const ProfileCompleteness = ({ completeness }: ProfileCompletenessProps) => {
  // Define verification status based on completeness
  const getVerificationStatus = () => {
    if (completeness < 50) {
      return {
        color: "text-yellow-500",
        icon: <AlertCircle className="h-5 w-5" />,
        label: "Not verified",
        description: "Complete your profile to get verified",
      };
    } else if (completeness < 100) {
      return {
        color: "text-blue-500",
        icon: <Shield className="h-5 w-5" />,
        label: "Pending verification",
        description: "Your profile is under review",
      };
    } else {
      return {
        color: "text-green-500",
        icon: <CheckCircle className="h-5 w-5" />,
        label: "Verified",
        description: "Your profile is fully verified",
      };
    }
  };

  const status = getVerificationStatus();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <span className={status.color}>{status.icon}</span>
          <span className="ml-2">Profile Completeness</span>
        </CardTitle>
        <CardDescription>{status.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>{completeness}% complete</span>
            <span className={status.color}>{status.label}</span>
          </div>
          <Progress value={completeness} className="h-2" />
        </div>
        
        {completeness < 100 && (
          <div className="space-y-2">
            {completeness < 40 && (
              <div className="text-xs text-muted-foreground">
                Complete these items to improve your profile:
                <ul className="mt-1 list-disc pl-4 space-y-0.5">
                  <li>Add a profile photo</li>
                  <li>Write a bio</li>
                  <li>Add your location</li>
                </ul>
              </div>
            )}
            <Button variant="outline" size="sm" className="w-full">
              Improve Your Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCompleteness;
