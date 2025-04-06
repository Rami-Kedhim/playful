
import React, { useState } from 'react';
import ProfileLayout from '@/components/layout/ProfileLayout';
import UserDashboardOverview from '@/components/dashboard/UserDashboardOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/auth/useAuth';
import { Shield, User, CreditCard, Settings } from 'lucide-react';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import AccountSettings from '@/components/profile/AccountSettings';

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <ProfileLayout
      title="My Profile"
      subtitle={`Welcome back, ${user?.username || 'User'}`}
      backLink="/"
    >
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="bg-background/50 border border-white/10 p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Personal Information
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Account Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <UserDashboardOverview />
        </TabsContent>

        <TabsContent value="personal" className="space-y-6">
          <PersonalInfoForm />
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </ProfileLayout>
  );
};

export default ProfilePage;
