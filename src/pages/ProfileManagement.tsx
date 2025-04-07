
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/auth/useAuth';
import AccountSettings from '@/components/profile/AccountSettings';
import ProfileSettings from '@/components/profile/ProfileSettings';
import NotificationSettings from '@/components/profile/NotificationSettings';

interface ProfileManagementProps {
  initialTab?: string;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ initialTab = 'profile' }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab);

  // Mock profile
  const profile = {
    id: user?.id || 'mock-id',
    full_name: 'John Doe',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu justo ut nisi finibus feugiat.'
  };

  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const ProfileHeader = () => (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
            <AvatarFallback>{profile.full_name ? getInitials(profile.full_name) : "??"}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{profile.full_name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            {profile.bio && <p className="text-sm max-w-md">{profile.bio}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
      
      <ProfileHeader />
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>
        
        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileManagement;
