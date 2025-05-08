import React, { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { UserProfile } from '@/types/pulse-boost';

const ProfileEdit = () => {
  const { user, profile, updateProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const initialFormData = {
    username: profile?.username || '',
    full_name: profile?.fullName || profile?.full_name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    website: profile?.website || '',
    sexual_orientation: profile?.sexual_orientation || ''
  };
  
  const [formData, setFormData] = useState(initialFormData);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError(null);
    
    try {
      // Prepare profile data for update
      const profileUpdate: Partial<UserProfile> = {
        username: formData.username,
        fullName: formData.full_name,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        sexual_orientation: formData.sexual_orientation
      };
      
      await updateProfile(profileUpdate);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating your profile');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 mb-6 rounded">
          Profile updated successfully!
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 mb-6 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Form fields would go here */}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
