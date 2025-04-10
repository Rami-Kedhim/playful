
import React from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useRole } from '@/hooks/auth/useRole';
import ProfileManager from '@/components/profile/ProfileManager';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const ProfilePage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="flex flex-col items-center py-10">
            <h1 className="text-2xl font-bold mb-6">Authentication Required</h1>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to view and edit your profile.
            </p>
            <Button onClick={() => navigate('/auth')}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <ProfileManager />
      </div>
    </Layout>
  );
};

export default ProfilePage;
