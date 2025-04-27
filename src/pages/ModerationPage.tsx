
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ModerationDashboard from '@/components/moderation/ModerationDashboard';
import RoleBasedRoute from '@/components/auth/RoleBasedRoute';

const ModerationPage = () => {
  return (
    <RoleBasedRoute allowedRoles={['admin', 'moderator']}>
      <MainLayout>
        <ModerationDashboard />
      </MainLayout>
    </RoleBasedRoute>
  );
};

export default ModerationPage;
