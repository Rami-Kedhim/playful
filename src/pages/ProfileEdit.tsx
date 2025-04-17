import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { DatabaseGender } from '@/types/auth';

const ProfileEdit = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    avatar_url: '',
    bio: '',
    location: '',
    gender: '',
    sexual_orientation: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        full_name: profile.full_name || '',
        avatar_url: profile.avatar_url || '',
        bio: profile.bio || '',
        location: profile.location || '',
        gender: profile.gender || '',
        sexual_orientation: profile.sexual_orientation || ''
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const genderValue = formData.gender ? 
        (formData.gender === 'male' ? DatabaseGender.MALE :
         formData.gender === 'female' ? DatabaseGender.FEMALE :
         formData.gender === 'other' ? DatabaseGender.OTHER :
         formData.gender === 'non-binary' ? DatabaseGender.NON_BINARY :
         formData.gender === 'trans' ? DatabaseGender.TRANS : DatabaseGender.OTHER)
        : undefined;
      
      const updatedProfile = await updateProfile({
        id: user?.id as string,
        location: formData.location,
        username: formData.username,
        bio: formData.bio,
        gender: genderValue,
        avatar_url: formData.avatar_url,
        full_name: formData.full_name,
        sexual_orientation: formData.sexual_orientation
      });
      
      if (updatedProfile) {
        toast({
          title: 'Profile Updated',
          description: 'Your profile has been updated successfully.',
        });
        navigate('/profile');
      } else {
        toast({
          title: 'Update Failed',
          description: 'Failed to update profile. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <Input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700">
            Avatar URL
          </Label>
          <Input
            type="text"
            id="avatar_url"
            name="avatar_url"
            value={formData.avatar_url}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </Label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </Label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </Label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="non-binary">Non-binary</option>
            <option value="trans">Trans</option>
          </select>
        </div>
        <div className="mb-4">
          <Label htmlFor="sexual_orientation" className="block text-sm font-medium text-gray-700">
            Sexual Orientation
          </Label>
          <Input
            type="text"
            id="sexual_orientation"
            name="sexual_orientation"
            value={formData.sexual_orientation}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
};

export default ProfileEdit;
