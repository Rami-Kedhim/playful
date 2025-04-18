
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import ProfileEditForm from '@/components/profile/ProfileEditForm';
import SecuritySettingsForm from '@/components/profile/SecuritySettingsForm';
import { User, UserProfile } from '@/types/user';

interface ProfileEditFormProps {
  initialData: UserProfile;
  onSubmit: (data: Partial<UserProfile>) => Promise<boolean>;
}

interface ProfileManagementProps {
  user: User;
  profile: UserProfile;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ user, profile }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const handleUpdateProfile = async (data: Partial<UserProfile>) => {
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update successful
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleUpdateSecurity = async (data: any) => {
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update successful
      setMessage({ type: 'success', text: 'Security settings updated successfully!' });
      return true;
    } catch (error) {
      console.error('Error updating security settings:', error);
      setMessage({ type: 'error', text: 'Failed to update security settings. Please try again.' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
      
      {message && (
        <div className={`p-4 mb-6 rounded-md ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
        </TabsList>
        
        <Card>
          <TabsContent value="profile">
            <ProfileEditForm 
              initialData={profile}
              onSubmit={handleUpdateProfile}
            />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettingsForm 
              user={user}
              onSubmit={handleUpdateSecurity}
            />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default ProfileManagement;
