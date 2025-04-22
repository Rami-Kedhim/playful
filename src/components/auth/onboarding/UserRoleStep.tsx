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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AIAvatarGenerator, AIAvatarSettings } from './AIAvatarGenerator';
import { generateAIAvatars, saveAIAvatar } from '@/services/ai/aiAvatarService';
import { Loader2, Check } from "lucide-react";

interface UserRoleStepProps {
  onNext: (data: any) => void;
}

export const UserRoleStep: React.FC<UserRoleStepProps> = ({ onNext }) => {
  const [role, setRole] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [isCouple, setIsCouple] = useState<boolean>(false);
  const [isLGBTQ, setIsLGBTQ] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [generatedAvatars, setGeneratedAvatars] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [aiAvatarMode, setAiAvatarMode] = useState<boolean>(false);

  useEffect(() => {
    if (role) {
      setAiAvatarMode(role === 'escort');
    }
  }, [role]);

  const handleRoleChange = (value: string) => {
    setRole(value);
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAvatars = async (settings: AIAvatarSettings) => {
    setIsGenerating(true);
    try {
      const avatarGender = settings.gender;
      const avatarSettings: AIAvatarSettings = {
        gender: avatarGender,
        style: settings.style,
        ageRange: settings.ageRange,
        age: settings.age,
        ethnicity: settings.ethnicity,
        hairColor: settings.hairColor,
        hairStyle: settings.hairStyle,
        bodyType: settings.bodyType,
        skinTone: settings.skinTone,
        background: settings.background
      };
      
      const avatars = await generateAIAvatars(avatarSettings);
      setGeneratedAvatars(avatars);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleComplete = async (selectedAvatar: string) => {
    setIsSaving(true);
    try {
      const success = await saveAIAvatar(selectedAvatar);
      if (success) {
        setAvatarUrl(selectedAvatar);
        const stepData = {
          role,
          isCreator,
          isCouple,
          isLGBTQ,
          avatarUrl: selectedAvatar,
          displayName,
          bio
        };
        onNext(stepData);
      } else {
        alert('Failed to save AI avatar. Please try again.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = () => {
    const stepData = {
      role,
      isCreator,
      isCouple,
      isLGBTQ,
      avatarUrl,
      displayName,
      bio
    };
    onNext(stepData);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="role">I am a...</Label>
        <Select value={role} onValueChange={handleRoleChange}>
          <SelectTrigger id="role">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="escort">Escort</SelectItem>
            <SelectItem value="client">Client</SelectItem>
            <SelectItem value="enthusiast">Enthusiast</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          type="text"
          id="displayName"
          placeholder="Enter your display name"
          value={displayName}
          onChange={handleDisplayNameChange}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us a little about yourself"
          value={bio}
          onChange={handleBioChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="isCreator" checked={isCreator} onCheckedChange={setIsCreator} />
        <Label htmlFor="isCreator">I am a content creator</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="isCouple" checked={isCouple} onCheckedChange={setIsCouple} />
        <Label htmlFor="isCouple">We are a couple</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="isLGBTQ" checked={isLGBTQ} onCheckedChange={setIsLGBTQ} />
        <Label htmlFor="isLGBTQ">We are LGBTQ+</Label>
      </div>

      {aiAvatarMode ? (
        <AIAvatarGenerator
          onGenerate={handleGenerateAvatars}
          onComplete={handleComplete}
          isGenerating={isGenerating}
          generatedAvatars={generatedAvatars}
        />
      ) : (
        <>
          <div className="grid gap-2">
            <Label htmlFor="avatar">Upload Avatar</Label>
            <Input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} />
          </div>

          {avatarUrl && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <img
                src={avatarUrl}
                alt="Uploaded avatar"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </>
      )}

      <Button onClick={handleSubmit} disabled={isGenerating || isSaving}>
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            {avatarUrl ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Continue
              </>
            ) : (
              "Continue"
            )}
          </>
        )}
      </Button>
    </div>
  );
};
