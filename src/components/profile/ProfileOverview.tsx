
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRole } from '@/hooks/auth/useRole';
import { useAuth } from '@/hooks/auth';
import RoleBasedContent from '@/components/auth/RoleBasedContent';
import LinkButton from '@/components/ui/link-button';

const ProfileOverview = () => {
  const { user } = useAuth();
  const { highestRole } = useRole();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Profile Overview</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.email}
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          Role: {highestRole}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RoleBasedContent allowedRoles={['admin']}>
          <Card>
            <CardHeader>
              <CardTitle>Admin Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <LinkButton to="/admin-dashboard" className="w-full">
                Admin Dashboard
              </LinkButton>
            </CardContent>
          </Card>
        </RoleBasedContent>

        <RoleBasedContent allowedRoles={['admin', 'moderator']}>
          <Card>
            <CardHeader>
              <CardTitle>Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <LinkButton to="/moderation" variant="outline" className="w-full">
                Moderation Panel
              </LinkButton>
            </CardContent>
          </Card>
        </RoleBasedContent>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <LinkButton to="/settings" variant="outline" className="w-full">
              Manage Settings
            </LinkButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileOverview;
