
import React, { useState } from 'react';
import ProfileTabs from '@/components/profile/ProfileTabs';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { Loader2 } from 'lucide-react';
import { User, UserProfile } from '@/types/user';

interface ProfilePageProps {
  user: User;
  profile: UserProfile;
  initialTab?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, profile, initialTab = 'about' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <ProfileHeader user={user} profile={profile} />
      
      <div className="mt-6">
        <ProfileTabs 
          user={user} 
          profile={profile} 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
      </div>
    </div>
  );
};

export default ProfilePage;
