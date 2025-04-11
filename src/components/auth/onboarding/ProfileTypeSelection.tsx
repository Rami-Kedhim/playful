
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Shield, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProfileTypeSelectionProps {
  onSelect: (type: 'real' | 'ai') => void;
  selectedType?: 'real' | 'ai';
  onNext: () => void;
  userRole: string;
}

export const ProfileTypeSelection: React.FC<ProfileTypeSelectionProps> = ({
  onSelect,
  selectedType,
  onNext,
  userRole
}) => {
  const isEscortOrCreator = userRole === 'escort' || userRole === 'creator';
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Choose Your Presentation Style</h2>
        <p className="text-muted-foreground">
          Select how you want to present yourself on {isEscortOrCreator ? "UberEscorts" : "the platform"}
        </p>
      </div>

      <RadioGroup 
        value={selectedType} 
        onValueChange={(value) => onSelect(value as 'real' | 'ai')}
        className="grid gap-4"
      >
        <Card className={`cursor-pointer ${selectedType === 'real' ? 'border-primary' : ''}`}>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="real" id="real-profile" />
                    <Label htmlFor="real-profile" className="text-base font-medium cursor-pointer">Real Profile</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload real photos and showcase your authentic appearance.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc list-inside">
                    <li>Complete identity verification</li>
                    <li>Maximum authenticity</li>
                    <li>Higher trust factor</li>
                  </ul>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-5 w-5 text-muted-foreground hover:text-primary cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-sm">
                    <p>Real profiles use your actual photos and require identity verification for safety and trust.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        <Card className={`cursor-pointer ${selectedType === 'ai' ? 'border-primary' : ''}`}>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="ai" id="ai-profile" />
                    <Label htmlFor="ai-profile" className="text-base font-medium cursor-pointer">AI-Enhanced Privacy</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use AI-generated avatars to protect your identity while maintaining a professional presence.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc list-inside">
                    <li>Enhanced privacy protection</li>
                    <li>Private verification (not displayed)</li>
                    <li>Customizable AI-generated appearance</li>
                  </ul>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-5 w-5 text-muted-foreground hover:text-primary cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-sm">
                    <p>AI profiles use generated images based on your appearance preferences, protecting your real identity while still undergoing private verification.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </RadioGroup>

      <Button 
        onClick={onNext} 
        className="w-full" 
        disabled={!selectedType}
      >
        Continue
      </Button>
    </div>
  );
};

export default ProfileTypeSelection;
