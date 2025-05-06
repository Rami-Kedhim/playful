
import React from 'react';
import HermesSeoNavigation from '@/components/seo/HermesSeoNavigation';
import ProfileOptimizer from '@/components/seo/ProfileOptimizer';

const ProfileOptimizationPage: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="w-64 h-full">
        <HermesSeoNavigation />
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Profile Optimization</h1>
        <ProfileOptimizer />
      </div>
    </div>
  );
};

export default ProfileOptimizationPage;
