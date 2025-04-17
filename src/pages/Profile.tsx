import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/profile/Avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { VerifiedMark } from "@/components/shared/VerifiedMark";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ScrollRevealGroup } from "@/components/ui/scroll-reveal-group";
import { Loader2 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const Profile = () => {
  const { user, profile, isLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to view your profile.</p>
        <Button onClick={() => navigate('/auth')}>Sign In</Button>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-16">
        <ScrollRevealGroup animation="fade-up">
          <Card className="border-border/50 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate('/profile/edit')}>
                Edit Profile
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScrollReveal animation="fade-in" delay={0.2}>
                  <Avatar
                    src={profile?.avatar_url || user?.avatarUrl}
                    username={user?.username}
                    email={user?.email}
                    size="xl"
                    border
                  />
                </ScrollReveal>
                <div className="flex-1 space-y-2">
                  <div className="text-2xl font-semibold flex items-center gap-2">
                    {user?.full_name || user?.username || user?.email}
                    {profile?.is_verified && <VerifiedMark />}
                  </div>
                  <p className="text-muted-foreground">
                    {user?.email}
                  </p>
                  <p className="text-muted-foreground">
                    Role: {user?.roles?.join(', ') || 'User'}
                  </p>
                  {profile?.bio && (
                    <div className="mt-4">
                      <CardDescription>
                        {profile?.bio}
                      </CardDescription>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollRevealGroup>
        
        <ScrollRevealGroup animation="fade-up" className="mt-8">
          <Card className="border-border/50 shadow-md">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
                  <p>
                    <strong>Username:</strong> {user?.username || 'N/A'}
                    <br />
                    <strong>Full Name:</strong> {user?.full_name || 'N/A'}
                    <br />
                    <strong>Email:</strong> {user?.email}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
                  <p>
                    <strong>Location:</strong> {profile?.location || 'N/A'}
                    <br />
                    <strong>Bio:</strong> {profile?.bio || 'N/A'}
                  </p>
                </div>
              </div>
              <Button onClick={() => navigate('/profile/management')}>
                Manage Account
              </Button>
            </CardContent>
          </Card>
        </ScrollRevealGroup>
      </div>
    </AppLayout>
  );
};

export default Profile;
