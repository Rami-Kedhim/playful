import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUBX } from '@/hooks/useUBX';
import { useAuth } from '@/contexts/AuthContext';

export interface AIAvatarSettings {
  gender: string;
  style: string;
  ageRange: string;
  age: number;
  ethnicity: string;
  hairColor: string;
  hairStyle: string;
  bodyType: string;
  skinTone: string;
  background: string;
}

interface AIAvatarGeneratorProps {
  onGenerate: (settings: AIAvatarSettings) => void;
  onComplete: (selectedAvatar: string) => void;
  isGenerating: boolean;
  generatedAvatars?: string[];
}

export const AIAvatarGenerator: React.FC<AIAvatarGeneratorProps> = ({
  onGenerate,
  onComplete,
  isGenerating,
  generatedAvatars = []
}) => {
  const [gender, setGender] = useState<string>('female');
  const [style, setStyle] = useState<string>('realistic');
  const [ageRange, setAgeRange] = useState<string>('20-30');
  const [age, setAge] = useState<number>(25);
  const [ethnicity, setEthnicity] = useState<string>('caucasian');
  const [hairColor, setHairColor] = useState<string>('blonde');
  const [hairStyle, setHairStyle] = useState<string>('long');
  const [bodyType, setBodyType] = useState<string>('slim');
  const [skinTone, setSkinTone] = useState<string>('fair');
  const [background, setBackground] = useState<string>('studio');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  const handleGenerate = () => {
    const settings: AIAvatarSettings = {
      gender,
      style,
      ageRange,
      age,
      ethnicity,
      hairColor,
      hairStyle,
      bodyType,
      skinTone,
      background
    };
    onGenerate(settings);
  };

  // Sample function for handling premium avatar generation that costs UBX
  const handlePremiumGeneration = async () => {
    const { processTransaction } = useUBX();
    const { user } = useAuth();
    
    if (!user) {
      // Handle unauthenticated user
      return;
    }
    
    try {
      // Process UBX transaction for premium avatar generation
      const success = await processTransaction({
        amount: -10, // Cost in UBX tokens
        transaction_type: "avatar_generation", // Using the correct property name
        description: "Premium AI avatar generation"
      });
      
      if (success) {
        // Proceed with premium generation
        handleGenerate();
      }
    } catch (error) {
      console.error("Failed to process transaction for premium avatar:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="non-binary">Non-Binary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="style">Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger id="style">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="artistic">Artistic</SelectItem>
              <SelectItem value="anime">Anime</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ageRange">Age Range</Label>
          <Select value={ageRange} onValueChange={setAgeRange}>
            <SelectTrigger id="ageRange">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="18-25">18-25</SelectItem>
              <SelectItem value="20-30">20-30</SelectItem>
              <SelectItem value="30-40">30-40</SelectItem>
              <SelectItem value="40+">40+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="ethnicity">Ethnicity</Label>
          <Select value={ethnicity} onValueChange={setEthnicity}>
            <SelectTrigger id="ethnicity">
              <SelectValue placeholder="Select ethnicity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="caucasian">Caucasian</SelectItem>
              <SelectItem value="african">African</SelectItem>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="hispanic">Hispanic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="hairColor">Hair Color</Label>
          <Select value={hairColor} onValueChange={setHairColor}>
            <SelectTrigger id="hairColor">
              <SelectValue placeholder="Select hair color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blonde">Blonde</SelectItem>
              <SelectItem value="brown">Brown</SelectItem>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="red">Red</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="hairStyle">Hair Style</Label>
          <Select value={hairStyle} onValueChange={setHairStyle}>
            <SelectTrigger id="hairStyle">
              <SelectValue placeholder="Select hair style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="long">Long</SelectItem>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="curly">Curly</SelectItem>
              <SelectItem value="straight">Straight</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bodyType">Body Type</Label>
          <Select value={bodyType} onValueChange={setBodyType}>
            <SelectTrigger id="bodyType">
              <SelectValue placeholder="Select body type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slim">Slim</SelectItem>
              <SelectItem value="athletic">Athletic</SelectItem>
              <SelectItem value="average">Average</SelectItem>
              <SelectItem value="curvy">Curvy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="skinTone">Skin Tone</Label>
          <Select value={skinTone} onValueChange={setSkinTone}>
            <SelectTrigger id="skinTone">
              <SelectValue placeholder="Select skin tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="background">Background</Label>
        <Select value={background} onValueChange={setBackground}>
          <SelectTrigger id="background">
            <SelectValue placeholder="Select background" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
            <SelectItem value="abstract">Abstract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate Avatars
          </>
        )}
      </Button>

      {generatedAvatars.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {generatedAvatars.map((avatar, index) => (
            <Card
              key={index}
              className={`cursor-pointer ${selectedAvatar === avatar ? 'border-2 border-primary' : ''}`}
              onClick={() => setSelectedAvatar(avatar)}
            >
              <CardContent className="p-2">
                <img
                  src={avatar}
                  alt={`Generated Avatar ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedAvatar && (
        <Button onClick={() => onComplete(selectedAvatar)}>
          Complete
        </Button>
      )}
    </div>
  );
};

export default AIAvatarGenerator;
