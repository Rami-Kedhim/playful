
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/auth/useAuthContext';
import { UserRoleStep } from './onboarding/UserRoleStep';
import { BasicProfileStep } from './onboarding/BasicProfileStep';
import { LocationStep } from './onboarding/LocationStep';
import { PreferencesStep } from './onboarding/PreferencesStep';
import { CompleteStep } from './onboarding/CompleteStep';

interface OnboardingFlowProps {
  onComplete: () => void;
}

type OnboardingStep = 'role' | 'basic' | 'location' | 'preferences' | 'complete';

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { user, updateUserProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('role');
  const [userRole, setUserRole] = useState<string>('');
  const [profileData, setProfileData] = useState({
    role: '',
    isCreator: false,
    isCouple: false,
    isLGBTQ: false,
    avatarUrl: '',
    displayName: '',
    bio: '',
    location: '',
    preferences: [],
    profileComplete: false
  });

  const steps: OnboardingStep[] = ['role', 'basic', 'location', 'preferences', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex) / (steps.length - 1)) * 100;

  const handleNext = async (stepData: any = {}) => {
    const updatedProfile = { ...profileData, ...stepData };
    setProfileData(updatedProfile);
    
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < steps.length) {
      setCurrentStep(steps[nextStepIndex]);
    } else {
      // Final step, mark profile as complete and save
      updatedProfile.profileComplete = true;
      await updateUserProfile(updatedProfile);
      onComplete();
    }
  };

  const handlePrevious = () => {
    const prevStepIndex = currentStepIndex - 1;
    if (prevStepIndex >= 0) {
      setCurrentStep(steps[prevStepIndex]);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 'role':
        return <UserRoleStep onNext={handleNext} />;
      case 'basic':
        return <BasicProfileStep onNext={handleNext} userRole={profileData.role} />;
      case 'location':
        return <LocationStep onNext={handleNext} userRole={profileData.role} />;
      case 'preferences':
        return <PreferencesStep onNext={handleNext} userRole={profileData.role} />;
      case 'complete':
        return <CompleteStep onNext={handleNext} userRole={profileData.role} profileData={profileData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background/80 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            {currentStep === 'role' && "Tell us how you want to use UberEscorts"}
            {currentStep === 'basic' && "Let's set up your basic information"}
            {currentStep === 'location' && "Where are you located?"}
            {currentStep === 'preferences' && "What are your preferences?"}
            {currentStep === 'complete' && "You're almost there!"}
          </CardDescription>
          <Progress value={progress} className="h-2 mt-2" />
          <p className="text-xs text-right mt-1 text-muted-foreground">{Math.round(progress)}% complete</p>
        </CardHeader>
        
        <CardContent>
          {getStepContent()}
        </CardContent>
        
        {currentStep !== 'role' && currentStep !== 'complete' && (
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={handlePrevious}>
              Back
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default OnboardingFlow;
