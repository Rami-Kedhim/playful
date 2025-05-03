
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

const ProfilePage = () => {
  return (
    <MainLayout
      title="My Profile"
      description="Manage your personal information"
      showBreadcrumbs
    >
      <div className="py-8">
        <div className="bg-card rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-medium mb-4">Your Profile</h2>
          <p className="text-muted-foreground">
            Manage your account settings, profile information, and preferences
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
