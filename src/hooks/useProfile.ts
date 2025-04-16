
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UserProfile, DatabaseGender } from '@/types/auth';

// Mock API call to get a user profile
const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  // Simulate API call latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data
  return {
    id: userId,
    username: 'userprofile123',
    full_name: 'Test User',
    avatar_url: 'https://i.pravatar.cc/150?u=userprofile123',
    email: 'user@example.com',
    bio: 'This is a mock user profile for development purposes.',
    location: 'San Francisco, CA',
    gender: DatabaseGender.OTHER,
    sexual_orientation: 'Heterosexual',
    profile_completeness: 80,
    is_boosted: false,
    created_at: new Date().toISOString(),
    is_verified: true
  };
};

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch user profile
  const fetchProfile = async (id: string) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const userProfile = await getUserProfile(id);
      setProfile(userProfile);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Failed to load profile data');
      toast({
        title: "Error",
        description: "Could not load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Update user profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    setLoading(true);
    
    try {
      // Simulate API call latency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Map string gender values to DatabaseGender enum values
      let genderValue = data.gender;
      if (data.gender === 'male') {
        genderValue = DatabaseGender.MALE;
      } else if (data.gender === 'female') {
        genderValue = DatabaseGender.FEMALE;
      } else if (data.gender === 'other' || data.gender === 'non-binary' || data.gender === 'trans') {
        genderValue = DatabaseGender.OTHER;
      }
      
      // Merge with existing profile
      const updatedProfile = {
        ...profile,
        ...data,
        gender: genderValue
      };
      
      setProfile(updatedProfile as UserProfile);
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      return updatedProfile;
    } catch (err) {
      console.error('Error updating user profile:', err);
      setError('Failed to update profile');
      toast({
        title: "Error",
        description: "Could not update profile data",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  // Load profile on component mount if userId is provided
  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [userId]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile
  };
}
