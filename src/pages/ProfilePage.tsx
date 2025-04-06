
import React, { useState, useEffect } from 'react';
import ProfileLayout from '@/components/layout/ProfileLayout';
import UserDashboardOverview from '@/components/dashboard/UserDashboardOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/auth/useAuth';
import { Shield, User, CreditCard, Settings } from 'lucide-react';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import AccountSettings from '@/components/profile/AccountSettings';
import { toast } from '@/components/ui/use-toast';
import { uploadAvatar } from '@/utils/profileUtils';
import { ProfileFormData } from '@/components/profile/ProfileFormSchema';

const ProfilePage = () => {
  const { user, profile, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(profile?.avatar_url || '');
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Reset avatar preview when profile changes
  useEffect(() => {
    if (profile?.avatar_url) {
      setAvatarPreview(profile.avatar_url);
    }
  }, [profile?.avatar_url]);
  
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarRemove = () => {
    setAvatarFile(null);
    setAvatarPreview(profile?.avatar_url || '');
  };

  const handleSubmit = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      
      // If there's a new avatar file, upload it
      let avatar_url = profile?.avatar_url;
      if (avatarFile) {
        avatar_url = await uploadAvatar(avatarFile, user, setUploadProgress);
        if (!avatar_url) {
          toast({
            title: "Avatar upload failed",
            description: "We couldn't upload your avatar. Please try again.",
            variant: "destructive",
          });
          return;
        }
      }
      
      // Update profile with new data
      await updateUserProfile({
        ...data,
        avatar_url
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ProfileLayout
      title="My Profile"
      subtitle={`Welcome back, ${user?.username || 'User'}`}
      backLink="/"
    >
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="bg-background/50 border border-white/10 p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Personal Information
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Account Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <UserDashboardOverview />
        </TabsContent>

        <TabsContent value="personal" className="space-y-6">
          <PersonalInfoForm 
            profile={profile}
            user={user}
            loading={loading}
            avatarPreview={avatarPreview}
            handleAvatarChange={handleAvatarChange}
            handleAvatarRemove={handleAvatarRemove}
            onSubmit={handleSubmit}
            uploadProgress={uploadProgress}
          />
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <AccountSettings 
            user={user}
            profile={profile}
          />
        </TabsContent>
      </Tabs>
    </ProfileLayout>
  );
};

export default ProfilePage;
