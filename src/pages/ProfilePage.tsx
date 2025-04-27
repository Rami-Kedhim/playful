
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileOverview from '@/components/profile/ProfileOverview';
import RequireAuth from '@/components/auth/RequireAuth';

const ProfilePage = () => {
  return (
    <RequireAuth>
      <MainLayout>
        <ProfileOverview />
      </MainLayout>
    </RequireAuth>
  );
};

export default ProfilePage;
