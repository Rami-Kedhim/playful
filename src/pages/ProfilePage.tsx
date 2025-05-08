
import React from 'react';
import Layout from '@/layouts/Layout';
import { useAuth } from '@/hooks/auth/useAuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  
  return (
    <Layout
      title="My Profile"
      description="Manage your profile settings and information"
      showBreadcrumbs
    >
      <div className="text-center py-20 text-muted-foreground">
        <h2 className="text-2xl mb-2">Profile Page</h2>
        <p>This page will display user profile information.</p>
      </div>
    </Layout>
  );
};

export default ProfilePage;
