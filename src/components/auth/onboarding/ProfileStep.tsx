
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProfileStepProps {
  onNext: (data: any) => void;
  initialData: any;
}

export const ProfileStep: React.FC<ProfileStepProps> = ({ onNext, initialData }) => {
  const [displayName, setDisplayName] = useState(initialData.displayName || '');
  const [bio, setBio] = useState(initialData.bio || '');
  const [location, setLocation] = useState(initialData.location || '');
  const [role, setRole] = useState(initialData.role || 'client');
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ 
      displayName, 
      bio, 
      location, 
      role,
      avatarUrl
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    setIsUploading(true);

    try {
      // Upload image to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      
      toast({
        title: "Image uploaded",
        description: "Your profile picture has been updated."
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Could not upload image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback>{displayName ? displayName.substring(0, 2).toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
          <label 
            htmlFor="avatar-upload" 
            className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer"
          >
            <Camera className="h-4 w-4" />
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              className="sr-only" 
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">Upload your profile picture</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            placeholder="How you'll appear to others"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us a bit about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="resize-none h-24"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, Country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>I am joining as a</Label>
          <RadioGroup 
            value={role} 
            onValueChange={setRole}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="client" id="client" />
              <Label htmlFor="client" className="cursor-pointer">Client</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="escort" id="escort" />
              <Label htmlFor="escort" className="cursor-pointer">Escort</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="creator" id="creator" />
              <Label htmlFor="creator" className="cursor-pointer">Creator</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <Button type="submit" className="w-full mt-4">
        Continue
      </Button>
    </form>
  );
};
