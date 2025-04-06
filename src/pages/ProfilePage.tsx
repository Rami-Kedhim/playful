
import React from 'react';
import ProfileManager from '@/components/profile/ProfileManager';
import EnhancedAppLayout from '@/components/layout/EnhancedAppLayout';

const ProfilePage: React.FC = () => {
  return (
    <EnhancedAppLayout>
      <ProfileManager />
    </EnhancedAppLayout>
  );
};

export default ProfilePage;
