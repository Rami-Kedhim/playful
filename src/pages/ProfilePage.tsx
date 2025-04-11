
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth/useAuthContext';
import AccountSettings from '@/components/profile/AccountSettings';

const ProfilePage = () => {
  const { user, logout, profile } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    {user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user?.username || 'User'}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <AccountSettings 
            initialTab="general" 
            user={user} 
            profile={profile} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
