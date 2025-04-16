import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useEscortMedia } from '@/hooks/escort/useEscortMedia';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { escortService } from '@/services/escortService';

const ProfileManagement: React.FC = () => {
  const { user } = useAuth();
  const { profile, isLoading, error, updateProfile } = useProfile();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const updateEscortProfile = async (id: string, updates: Partial<any>) => {
    try {
      const updatedEscort = await escortService.updateProfile(id, updates);
      return updatedEscort;
    } catch (error) {
      console.error("Error updating escort profile:", error);
      return null;
    }
  };
  
  const { setProfileImage } = useEscortMedia(updateEscortProfile);
  
  useEffect(() => {
    if (profile) {
      setProfileImageUrl(profile.avatar_url || null);
    }
  }, [profile]);
  
  const handleSetProfileImage = async (imageUrl: string) => {
    try {
      // Update to call with correct parameters
      await setProfileImage(user?.id as string, imageUrl);
      
      toast({
        title: "Profile image updated",
        description: "Your profile image has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error updating profile image",
        description: "Failed to update profile image. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      if (!profile) {
        throw new Error("Profile not loaded");
      }
      
      const updates = {
        id: profile.id,
        avatar_url: profileImageUrl || profile.avatar_url,
      };
      
      await updateProfile(updates);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Management</CardTitle>
          <CardDescription>Manage your profile information and settings</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              {profileImageUrl ? (
                <AvatarImage src={profileImageUrl} alt="Profile picture" />
              ) : (
                <AvatarFallback>{profile?.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <Label htmlFor="profile-image">Profile Image</Label>
              <Input
                type="url"
                id="profile-image"
                placeholder="Enter image URL"
                value={profileImageUrl || ''}
                onChange={(e) => setProfileImageUrl(e.target.value)}
              />
              <Button 
                variant="secondary" 
                size="sm" 
                className="mt-2"
                onClick={() => handleSetProfileImage(profileImageUrl || '')}
              >
                Set Image
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username" defaultValue={profile?.username} disabled />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" defaultValue={profile?.email} disabled />
            </div>
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Write a short bio about yourself" defaultValue={profile?.bio} disabled />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveProfile} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileManagement;
