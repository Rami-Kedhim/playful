import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Loader2,
  RefreshCw
} from "lucide-react";

export interface AIAvatarSettings {
  gender: 'female' | 'male' | 'non-binary';
  style: 'realistic' | 'anime' | 'artistic';
  ageRange: number;
  age: number;
  ethnicity: string;
  hairColor: string;
  hairStyle: string;
  bodyType: string;
  skinTone: string;
  background: string;
}

interface AIAvatarGeneratorProps {
  onGenerate: (settings: AIAvatarSettings) => Promise<void>;
  onComplete: (avatarUrl: string) => Promise<void>;
  isGenerating: boolean;
  generatedAvatars: string[];
}

const defaultSettings: AIAvatarSettings = {
  gender: 'female',
  style: 'realistic',
  age: 30,
  ageRange: 30,
  ethnicity: 'mixed',
  hairColor: 'brown',
  hairStyle: 'medium',
  bodyType: 'average',
  skinTone: 'medium',
  background: 'neutral'
};

export const AIAvatarGenerator: React.FC<AIAvatarGeneratorProps> = ({
  onGenerate,
  onComplete,
  isGenerating,
  generatedAvatars = []
}) => {
  const [settings, setSettings] = useState<AIAvatarSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState('appearance');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const updateSetting = (key: keyof AIAvatarSettings, value: string | number) => {
    setSettings(prev => {
      if (key === 'age') {
        return { ...prev, [key]: value, ageRange: value };
      }
      if (key === 'ageRange') {
        return { ...prev, [key]: value, age: value };
      }
      return { ...prev, [key]: value };
    });
  };

  const handleGenerate = () => {
    onGenerate(settings);
  };

  const handleComplete = () => {
    if (selectedAvatar) {
      onComplete(selectedAvatar);
    } else if (generatedAvatars.length > 0) {
      onComplete(generatedAvatars[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Create Your AI Avatar</h2>
        <p className="text-muted-foreground">
          Customize how you want your AI-generated avatar to look
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="style">Style & Background</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select 
                value={settings.gender} 
                onValueChange={(value: 'female' | 'male' | 'non-binary') => updateSetting('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Age: {settings.age}</Label>
              <Slider 
                value={[settings.age]} 
                min={18} 
                max={60} 
                step={1} 
                onValueChange={(value) => updateSetting('age', value[0])}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ethnicity</Label>
              <Select 
                value={settings.ethnicity} 
                onValueChange={(value) => updateSetting('ethnicity', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ethnicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="caucasian">Caucasian</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="asian">Asian</SelectItem>
                  <SelectItem value="hispanic">Hispanic</SelectItem>
                  <SelectItem value="middle-eastern">Middle Eastern</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Skin Tone</Label>
              <Select 
                value={settings.skinTone} 
                onValueChange={(value) => updateSetting('skinTone', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select skin tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-light">Very Light</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="tan">Tan</SelectItem>
                  <SelectItem value="deep">Deep</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Hair Color</Label>
              <Select 
                value={settings.hairColor} 
                onValueChange={(value) => updateSetting('hairColor', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hair color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="brown">Brown</SelectItem>
                  <SelectItem value="blonde">Blonde</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="gray">Gray</SelectItem>
                  <SelectItem value="colorful">Colorful</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Hair Style</Label>
              <Select 
                value={settings.hairStyle} 
                onValueChange={(value) => updateSetting('hairStyle', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hair style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="long">Long</SelectItem>
                  <SelectItem value="curly">Curly</SelectItem>
                  <SelectItem value="wavy">Wavy</SelectItem>
                  <SelectItem value="straight">Straight</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Body Type</Label>
            <Select 
              value={settings.bodyType} 
              onValueChange={(value) => updateSetting('bodyType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slender">Slender</SelectItem>
                <SelectItem value="athletic">Athletic</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="curvy">Curvy</SelectItem>
                <SelectItem value="muscular">Muscular</SelectItem>
                <SelectItem value="plus-size">Plus Size</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="style" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Style</Label>
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
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="elegant">Elegant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Background</Label>
            <Select 
              value={settings.background} 
              onValueChange={(value) => updateSetting('background', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select background" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="urban">Urban</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <Button
          onClick={handleGenerate}
          className="w-full"
          disabled={isGenerating}
          variant="secondary"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Avatar
            </>
          )}
        </Button>

        {generatedAvatars.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {generatedAvatars.map((avatar, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer overflow-hidden ${selectedAvatar === avatar ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <CardContent className="p-0">
                    <img 
                      src={avatar} 
                      alt={`Generated avatar ${index + 1}`} 
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button 
              onClick={handleComplete}
              className="w-full"
              disabled={!selectedAvatar && generatedAvatars.length <= 0}
            >
              Continue
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAvatarGenerator;
