
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { UserCircle } from 'lucide-react';

interface BasicProfileStepProps {
  onNext: (data: any) => void;
  userRole: string;
}

export const BasicProfileStep: React.FC<BasicProfileStepProps> = ({ onNext, userRole }) => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [bio, setBio] = useState('');
  
  // Mock function for avatar upload - in a real app, this would upload to storage
  const handleAvatarUpload = () => {
    // This is a placeholder - in a real implementation, you'd handle file uploads
    const randomAvatar = `https://i.pravatar.cc/150?u=${Date.now()}`;
    setAvatarUrl(randomAvatar);
  };

  const handleContinue = () => {
    onNext({
      displayName,
      avatarUrl,
      bio
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <Label className="text-center">Profile Picture</Label>
        <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarUpload}>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-primary/10">
            <UserCircle className="h-12 w-12 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
          Upload Image
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="displayName">
          {userRole === 'escort' ? 'Stage Name / Alias' : 'Display Name'}
        </Label>
        <Input
          id="displayName"
          placeholder={userRole === 'escort' ? 'Your alias or stage name' : 'How others will see you'}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Short Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us a bit about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <Button className="w-full" onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
};
