
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, UserProfile } from '@/types/user';

interface ProfileTabsProps {
  initialTab: string;
  user: User;
  profile: UserProfile;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  initialTab,
  user,
  profile
}) => {
  return (
    <Tabs defaultValue={initialTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Profile</h2>
          
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-3">About</h3>
            <p className="text-muted-foreground">
              {profile.bio || "No bio available"}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                <p>{profile.location || "Not specified"}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Member Since</h4>
                <p>{new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="settings">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Settings</h2>
          
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-3">Account Settings</h3>
            <p className="text-muted-foreground mb-4">
              Manage your account settings and preferences.
            </p>
            
            {/* Add settings content here */}
            <p>Settings content will go here</p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="activity">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Activity</h2>
          
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
            <p className="text-muted-foreground mb-4">
              View your recent activity and interactions.
            </p>
            
            {/* Add activity content here */}
            <p>Activity content will go here</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
