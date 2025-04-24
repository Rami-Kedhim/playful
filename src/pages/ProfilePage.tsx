
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/auth';

const ProfilePage = () => {
  const { user } = useAuth();
  
  return (
    <MainLayout title="Profile" description="Manage your profile settings">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Profile Page</h1>
          {user ? (
            <p>Welcome, {user.name || user.email || 'User'}</p>
          ) : (
            <p>Please log in to view your profile.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
