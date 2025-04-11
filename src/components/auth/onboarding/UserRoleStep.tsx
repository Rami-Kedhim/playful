
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Camera, Users, Heart, ChevronRight } from "lucide-react";
import ProfileTypeSelection from './ProfileTypeSelection';
import AIAvatarGenerator, { AIAvatarSettings } from './AIAvatarGenerator';
import { generateAIAvatars, saveAIAvatar } from '@/services/ai/aiAvatarService';

interface UserRoleStepProps {
  onNext: (data: any) => void;
}

export const UserRoleStep: React.FC<UserRoleStepProps> = ({ onNext }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [step, setStep] = useState<'role' | 'type' | 'avatar'>('role');
  const [profileType, setProfileType] = useState<'real' | 'ai' | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAvatars, setGeneratedAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (step === 'role' && selectedRole) {
      setStep('type');
    } else if (step === 'type' && profileType) {
      if (profileType === 'ai') {
        setStep('avatar');
      } else {
        // Skip avatar generation for real profiles
        handleComplete();
      }
    }
  };

  const handleBack = () => {
    if (step === 'type') {
      setStep('role');
    } else if (step === 'avatar') {
      setStep('type');
    }
  };

  const handleGenerateAvatars = async (settings: AIAvatarSettings) => {
    setIsGenerating(true);
    try {
      const avatars = await generateAIAvatars(settings);
      setGeneratedAvatars(avatars);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAvatarSelected = async (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    handleComplete(avatarUrl);
  };

  const handleComplete = (avatarUrl?: string) => {
    onNext({
      role: selectedRole,
      profileType,
      isAI: profileType === 'ai',
      avatarUrl: avatarUrl || null
    });
  };

  const roleOptions = [
    { id: 'client', name: 'Client', icon: <Search className="h-6 w-6" />, description: 'I want to find escorts and content' },
    { id: 'escort', name: 'Escort', icon: <Heart className="h-6 w-6" />, description: 'I offer in-person services' },
    { id: 'creator', name: 'Creator', icon: <Camera className="h-6 w-6" />, description: 'I create content and engage with fans' },
    { id: 'agency', name: 'Agency', icon: <Users className="h-6 w-6" />, description: 'I represent multiple escorts' }
  ];

  return (
    <div className="space-y-6">
      {step === 'role' && (
        <>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">How will you use UberEscorts?</h2>
            <p className="text-muted-foreground">Select your primary role on the platform</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {roleOptions.map(role => (
              <Card
                key={role.id}
                className={`p-4 cursor-pointer transition hover:border-primary ${
                  selectedRole === role.id ? 'border-primary' : ''
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      selectedRole === role.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {role.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                  {role.id === 'client' && (
                    <Badge variant="outline">Most Popular</Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {step === 'type' && selectedRole && (
        <ProfileTypeSelection 
          onSelect={setProfileType}
          selectedType={profileType || undefined}
          onNext={handleContinue}
          userRole={selectedRole}
        />
      )}

      {step === 'avatar' && (
        <AIAvatarGenerator
          onGenerate={handleGenerateAvatars}
          onComplete={handleAvatarSelected}
          isGenerating={isGenerating}
          generatedAvatars={generatedAvatars}
        />
      )}

      <div className="flex justify-between pt-4">
        {step !== 'role' && (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}
        
        {step === 'role' && (
          <Button 
            onClick={handleContinue}
            disabled={!selectedRole}
            className="ml-auto"
          >
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserRoleStep;
