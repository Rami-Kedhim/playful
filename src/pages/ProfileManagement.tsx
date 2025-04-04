
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth"; // Make sure to use the correct import
import AppLayout from "@/components/layout/AppLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthUser } from "@/types/auth"; // Import AuthUser

// Import custom components
import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import AccountSettings from "@/components/profile/AccountSettings";
import { uploadAvatar, validateGender } from "@/utils/profileUtils";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";
import { profileFormSchema, ProfileFormData } from "@/components/profile/ProfileFormSchema";

const ProfileManagement = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const {
    avatarFile,
    avatarPreview,
    handleAvatarChange,
    handleAvatarRemove,
    isDefault,
    uploadProgress,
    setUploadProgress
  } = useAvatarUpload(profile?.avatar_url || "");

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    setLoading(true);

    try {
      let avatarUrl = profile?.avatar_url || null;
      
      // Handle avatar changes
      if (avatarFile) {
        // Set initial progress
        setUploadProgress(10);
        
        // Create a function to track upload progress
        const trackProgress = (progress: number) => {
          setUploadProgress(Math.min(Math.floor(10 + progress * 0.8), 90)); // Scale between 10% and 90%
        };
        
        // Here we need to adapt for the AuthUser type - use user.id instead of the full User object
        const newAvatarUrl = await uploadAvatar(avatarFile, { id: user.id }, trackProgress);
        if (newAvatarUrl) {
          avatarUrl = newAvatarUrl;
        }
      } else if (!isDefault && profile?.avatar_url) {
        // User removed the avatar
        avatarUrl = null;
        
        // If there was a previous avatar, remove it from storage
        try {
          const filename = profile.avatar_url.split('/').pop();
          if (filename) {
            setUploadProgress(30);
            await supabase
              .storage
              .from('profiles')
              .remove([`avatars/${filename}`]);
            setUploadProgress(70);
          }
        } catch (error) {
          console.error("Error removing old avatar:", error);
          // Non-critical error, continue with profile update
        }
      }

      // Validate and process gender to ensure it matches our database accepted values
      const validatedGender = validateGender(data.gender);

      setUploadProgress(90); // Almost done

      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          full_name: data.full_name,
          bio: data.bio,
          gender: validatedGender,
          sexual_orientation: data.sexual_orientation,
          location: data.location,
          avatar_url: avatarUrl,
          updated_at: new Date()
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      setUploadProgress(100); // Complete
      
      await refreshProfile();
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Please log in to manage your profile.</p>
          <div className="flex justify-center mt-4">
            <button onClick={() => navigate("/auth")}>Go to Login</button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ProfileHeader title="Profile Management" />
      
      <div className="container mx-auto px-4 pb-8">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and how others see you on the platform
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <PersonalInfoForm 
                  profile={profile}
                  user={user}
                  loading={loading}
                  avatarPreview={avatarPreview}
                  handleAvatarChange={handleAvatarChange}
                  handleAvatarRemove={handleAvatarRemove}
                  onSubmit={onSubmit}
                  uploadProgress={uploadProgress}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccountSettings user={user} profile={profile} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ProfileManagement;
