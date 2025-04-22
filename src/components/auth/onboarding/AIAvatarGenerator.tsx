
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AIAvatarSettings as AIAvatarServiceSettings } from '@/services/ai/aiAvatarService';
import { Loader2 } from "lucide-react";

export interface AIAvatarSettings {
  gender: "female" | "male" | "non-binary";
  style?: string;
  ageRange?: string;
  age?: number;
  ethnicity?: string;
  hairColor?: string;
  hairStyle?: string;
  bodyType?: string;
  skinTone?: string;
  background?: string;
}

export interface AIAvatarGeneratorProps {
  onGenerate: (settings: AIAvatarSettings) => void;
  onComplete: (avatarUrl: string) => void;
  isGenerating: boolean;
  generatedAvatars: string[];
}

export const AIAvatarGenerator: React.FC<AIAvatarGeneratorProps> = ({
  onGenerate,
  onComplete,
  isGenerating,
  generatedAvatars
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [settings, setSettings] = useState<AIAvatarSettings>({
    gender: "female",
    style: "realistic",
    ageRange: "25-34",
    ethnicity: "caucasian",
    hairColor: "blonde",
    background: "neutral"
  });

  const handleGenerateAvatars = () => {
    onGenerate(settings);
  };

  const handleSelectAvatar = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
  };

  const handleCompleteSelection = () => {
    if (selectedAvatar) {
      onComplete(selectedAvatar);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Generate AI Avatar</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={() => setSettings({...settings, gender: "female"})}
          className={settings.gender === "female" ? "border-primary" : ""}
        >
          Female
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setSettings({...settings, gender: "male"})}
          className={settings.gender === "male" ? "border-primary" : ""}
        >
          Male
        </Button>
      </div>
      
      <Button 
        onClick={handleGenerateAvatars}
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate AI Avatars"
        )}
      </Button>
      
      {generatedAvatars.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-md font-medium">Select Your Avatar</h4>
          <div className="grid grid-cols-2 gap-4">
            {generatedAvatars.map((avatar, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer overflow-hidden ${selectedAvatar === avatar ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleSelectAvatar(avatar)}
              >
                <img src={avatar} alt={`AI Avatar ${index + 1}`} className="w-full aspect-square object-cover" />
              </Card>
            ))}
          </div>
          
          <Button 
            onClick={handleCompleteSelection}
            disabled={!selectedAvatar}
            className="w-full"
          >
            Complete Selection
          </Button>
        </div>
      )}
    </div>
  );
};
