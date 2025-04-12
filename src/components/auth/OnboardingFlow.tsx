
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/hooks/auth/useAuthContext';
import { ProfileStep } from './onboarding/ProfileStep';
import { PreferencesStep } from './onboarding/PreferencesStep';
import { CompleteStep } from './onboarding/CompleteStep';
import { Loader2 } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { user, updateUserProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Combined profile data that will be updated throughout the flow
  const [profileData, setProfileData] = useState({
    displayName: user?.username || '',
    bio: '',
    location: '',
    role: 'client', // Default role
    avatarUrl: user?.avatarUrl || '',
    preferences: {
      genderPreferences: [],
      servicePreferences: [],
      maxDistance: 50,
      ageRange: [21, 65]
    }
  });

  const handleNext = async (data: any) => {
    // Update the profile data with the new data from the current step
    setProfileData(prev => ({ ...prev, ...data }));
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - save everything to the user profile
      setIsLoading(true);
      
      try {
        const success = await updateUserProfile({
          ...profileData,
          ...data,
          profileComplete: true
        });
        
        if (success) {
          toast({
            title: "Profile setup complete!",
            description: "Welcome to the platform. You can now explore all features.",
          });
          onComplete();
        } else {
          toast({
            title: "Error",
            description: "Failed to save profile data. Please try again.",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background/80 to-background p-4">
      <div className="w-full max-w-md">
        <Card className="border shadow-lg">
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Step {currentStep} of 3: {currentStep === 1 ? "Basic Information" : currentStep === 2 ? "Your Preferences" : "Almost Done!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <ProfileStep onNext={handleNext} initialData={profileData} />
            )}
            
            {currentStep === 2 && (
              <PreferencesStep onNext={handleNext} initialData={profileData.preferences} />
            )}
            
            {currentStep === 3 && (
              <CompleteStep onNext={handleNext} userRole={profileData.role} profileData={profileData} />
            )}
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
