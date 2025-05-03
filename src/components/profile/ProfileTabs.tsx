import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/types/user";
import AboutTab from "./AboutTab";
import ServicesTab from "./ServicesTab";
import RatesTab from "./RatesTab";
import SafetyTips from "@/components/verification/SafetyTips";
import VerificationBadge from "@/components/verification/VerificationBadge";
import { useRole } from "@/hooks/useRole";
import { Shield, UserCheck, DollarSign, Info } from "lucide-react";

interface ProfileTabsProps {
  user: User;
  profile: UserProfile;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  user,
  profile,
  activeTab,
  onTabChange
}) => {
  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about">
        <div className="prose dark:prose-invert max-w-none">
          <h3>Bio</h3>
          <p>{profile.bio || "No bio information available."}</p>
          
          <h3>Contact Information</h3>
          <p>Phone: {profile.phone || "Not provided"}</p>
          <p>Website: {profile.website || "Not provided"}</p>
        </div>
      </TabsContent>
      
      <TabsContent value="photos">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(profile.avatarUrl || profile.avatar_url) ? (
            <div className="aspect-square bg-muted rounded-md overflow-hidden">
              <img 
                src={profile.avatarUrl || profile.avatar_url} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <p>No photos available.</p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="reviews">
        <p>No reviews yet.</p>
      </TabsContent>
      
      <TabsContent value="settings">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p>Manage your profile settings and preferences.</p>
          
          <div className="border p-4 rounded-md">
            <h4 className="font-medium mb-2">Personal Information</h4>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.roles?.[0] || user.role || 'User'}</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
