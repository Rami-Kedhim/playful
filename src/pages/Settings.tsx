
import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AccountSettingsForm from '@/components/profile/AccountSettingsForm';
import { useAuth } from '@/hooks/auth';

const Settings = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="max-w-2xl mx-auto">
        <AccountSettingsForm user={user} />
      </div>
    </div>
  );
};

export default Settings;
