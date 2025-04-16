
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/auth/useAuth';
import useProfile from '@/hooks/useProfile';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileEditForm from '@/components/profile/ProfileEditForm';
import VerificationForm from '@/components/verification/VerificationForm';
import AccountSettingsForm from '@/components/profile/AccountSettingsForm';
import escortService from '@/services/escortService';

const ProfileManagement = () => {
  const { user } = useAuth();
  const { profile, loading, error } = useProfile();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState('edit-profile');
  
  useEffect(() => {
    if (pathname.includes('verification')) {
      setActiveTab('verification');
    } else if (pathname.includes('settings')) {
      setActiveTab('settings');
    } else {
      setActiveTab('edit-profile');
    }
  }, [pathname]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[300px]">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Authorized</AlertTitle>
          <AlertDescription>
            You must be logged in to view this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <ProfileHeader title="Profile Management" />
      
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <CardContent className="pt-6">
            <TabsContent value="edit-profile">
              <ProfileEditForm 
                userId={user.id}
                initialData={profile}
              />
            </TabsContent>
            
            <TabsContent value="verification">
              <VerificationForm />
            </TabsContent>
            
            <TabsContent value="settings">
              <AccountSettingsForm
                user={user}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProfileManagement;
