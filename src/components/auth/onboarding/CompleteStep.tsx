
import React from 'react';
import { Button } from "@/components/ui/button";
import { CircleCheck, Rocket } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from '@/hooks/auth/useAuthContext';

interface CompleteStepProps {
  onNext: (data: any) => void;
  userRole: string;
  profileData: any;
}

export const CompleteStep: React.FC<CompleteStepProps> = ({ onNext, userRole, profileData }) => {
  const { updateUserProfile } = useAuth();
  const profileCompleteness = calculateProfileCompleteness(profileData);

  // Function to calculate profile completeness
  function calculateProfileCompleteness(profile: any): number {
    let score = 0;
    let total = 0;
    
    // Basic info
    if (profile.role) { score += 1; total += 1; }
    if (profile.displayName) { score += 1; total += 1; }
    if (profile.avatarUrl) { score += 2; total += 2; }
    if (profile.bio) { score += 2; total += 2; }
    
    // Location
    if (profile.location) { score += 2; total += 2; }
    
    // Preferences
    if (profile.preferences?.genderPreferences?.length > 0) { score += 1; total += 1; }
    if (profile.preferences?.servicePreferences?.length > 0) { score += 2; total += 2; }
    
    return Math.round((score / total) * 100);
  }

  const getNextSteps = () => {
    if (userRole === 'client') {
      return [
        "Browse profiles and connect with escorts",
        "Set up payment methods for booking",
        "Complete verification for premium features"
      ];
    } else {
      return [
        "Add more photos to your gallery",
        "Set your service rates and availability",
        "Complete verification for higher visibility"
      ];
    }
  };

  const handleFinish = async () => {
    // Mark profile as complete and save all data
    await updateUserProfile({
      ...profileData,
      profileComplete: true,
      profileCompleteness
    });
    onNext({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-primary/20 p-3">
          <CircleCheck className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-center">Profile Created Successfully!</h3>
        <p className="text-center text-muted-foreground">
          You're all set to start using UberEscorts as a{" "}
          <span className="font-medium">{userRole}</span>
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Profile Completeness</span>
          <span className="text-sm font-medium">{profileCompleteness}%</span>
        </div>
        <Progress value={profileCompleteness} className="h-2" />
      </div>

      <div className="rounded-md border p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Rocket className="h-4 w-4 text-primary" />
          <h4 className="font-medium">Next steps to enhance your experience:</h4>
        </div>
        <ul className="ml-6 list-disc text-sm space-y-1">
          {getNextSteps().map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>

      <Button className="w-full" onClick={handleFinish}>
        Start Exploring
      </Button>
    </div>
  );
};
