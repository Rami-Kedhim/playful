
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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

// Import custom components
import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInfoForm, { ProfileFormData } from "@/components/profile/PersonalInfoForm";
import AccountSettings from "@/components/profile/AccountSettings";
import { uploadAvatar } from "@/utils/profileUtils";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";

const ProfileManagement = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const {
    avatarFile,
    avatarPreview,
    handleAvatarChange
  } = useAvatarUpload(profile?.avatar_url || "");

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    setLoading(true);

    try {
      let avatarUrl = profile?.avatar_url || null;
      
      if (avatarFile) {
        const newAvatarUrl = await uploadAvatar(avatarFile, user);
        if (newAvatarUrl) {
          avatarUrl = newAvatarUrl;
        }
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          full_name: data.full_name,
          bio: data.bio,
          gender: data.gender,
          sexual_orientation: data.sexual_orientation,
          location: data.location,
          avatar_url: avatarUrl,
          updated_at: new Date()
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

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
                  onSubmit={onSubmit}
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
