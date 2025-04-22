
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserProfile from '@/components/user/UserProfile';
import { Loader2 } from 'lucide-react';
import ProfileLayout from '@/components/layout/ProfileLayout';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');
  const { user, isLoading } = useAuth();

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

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">Please sign in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ProfileLayout 
      title="My Profile" 
      subtitle="Manage your account and preferences"
      backLink="/"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserProfile />
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Information</h3>
                    <p className="text-muted-foreground">
                      Your account was created on {new Date(user.created_at).toLocaleDateString()}.
                    </p>
                    <div className="text-muted-foreground pt-4">
                      Username: {user.user_metadata?.username || user.email?.split('@')[0]}
                    </div>
                    <div className="text-muted-foreground">
                      Email: {user.email}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="preferences">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">User Preferences</h3>
                    <p className="text-muted-foreground">
                      Preference settings will be available soon.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="security">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security Settings</h3>
                    <p className="text-muted-foreground">
                      Security settings will be available soon.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
