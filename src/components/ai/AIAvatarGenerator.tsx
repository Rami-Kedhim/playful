
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Sparkles, Check } from "lucide-react";

export interface AIAvatarSettings {
  gender: 'male' | 'female' | 'non-binary';
  style: 'realistic' | 'anime' | 'artistic';
  ageRange: number;
  features: string[];
}

interface AIAvatarGeneratorProps {
  onGenerate: (settings: AIAvatarSettings) => Promise<void>;
  onComplete: (avatarUrl: string) => Promise<void>;
  isGenerating: boolean;
  generatedAvatars: string[];
}

const AIAvatarGenerator: React.FC<AIAvatarGeneratorProps> = ({
  onGenerate,
  onComplete,
  isGenerating,
  generatedAvatars
}) => {
  const [settings, setSettings] = useState<AIAvatarSettings>({
    gender: 'female',
    style: 'realistic',
    ageRange: 25,
    features: []
  });
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const updateSetting = <K extends keyof AIAvatarSettings>(key: K, value: AIAvatarSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    await onGenerate(settings);
  };

  const handleSelectAvatar = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
  };

  const handleComplete = async () => {
    if (selectedAvatar) {
      await onComplete(selectedAvatar);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">AI Avatar Generator</h2>
        <p className="text-muted-foreground">
          Create AI-generated avatars to protect your privacy
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="gender">Gender Appearance</Label>
          <Select
            value={settings.gender}
            onValueChange={(value: 'male' | 'female' | 'non-binary') => updateSetting('gender', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender appearance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="non-binary">Non-Binary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="style">Visual Style</Label>
          <Select
            value={settings.style}
            onValueChange={(value: 'realistic' | 'anime' | 'artistic') => updateSetting('style', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="anime">Anime</SelectItem>
              <SelectItem value="artistic">Artistic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <div className="flex justify-between">
            <Label htmlFor="ageRange">Age Appearance: {settings.ageRange}</Label>
          </div>
          <Slider
            id="ageRange"
            min={18}
            max={60}
            step={1}
            value={[settings.ageRange]}
            onValueChange={(value) => updateSetting('ageRange', value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>18</span>
            <span>60</span>
          </div>
        </div>
        
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="mt-4"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Avatars
            </>
          )}
        </Button>
      </div>

      {generatedAvatars.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Select an Avatar</h3>
          <div className="grid grid-cols-2 gap-4">
            {generatedAvatars.map((avatar, index) => (
              <div 
                key={index} 
                className={`relative rounded-lg overflow-hidden cursor-pointer border-2 ${selectedAvatar === avatar ? 'border-primary' : 'border-transparent'}`}
                onClick={() => handleSelectAvatar(avatar)}
              >
                <img 
                  src={avatar} 
                  alt={`AI Avatar option ${index + 1}`}
                  className="w-full aspect-square object-cover"
                />
                {selectedAvatar === avatar && (
                  <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <Button 
            onClick={handleComplete} 
            disabled={!selectedAvatar}
            className="w-full mt-4"
          >
            Continue with Selected Avatar
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIAvatarGenerator;
