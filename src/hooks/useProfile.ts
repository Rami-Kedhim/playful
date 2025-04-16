import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, UserProfile, DatabaseGender } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useAuth();

  const loadProfile = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setProfile(data as UserProfile);
      } else {
        setProfile(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      loadProfile(user.id);
    }
  }, [user, loadProfile]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    setLoading(true);
    setError(null);

    try {
      // Make sure to convert string gender to enum value
      if (updates.gender) {
        if (updates.gender === 'male') {
          updates.gender = DatabaseGender.MALE;
        } else if (updates.gender === 'female') {
          updates.gender = DatabaseGender.FEMALE;
        } else if (updates.gender === 'other') {
          updates.gender = DatabaseGender.OTHER;
        } else if (updates.gender === 'non_binary') {
          updates.gender = DatabaseGender.NON_BINARY;
        } else if (updates.gender === 'trans') {
          updates.gender = DatabaseGender.TRANS;
        }
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setProfile(data as UserProfile);

        // Update user context if username or avatar_url is changed
        if (updates.username || updates.avatar_url) {
          setUser((prevUser: AuthUser | null) => {
            if (!prevUser) return prevUser;
            return {
              ...prevUser,
              username: updates.username || prevUser.username,
              avatarUrl: updates.avatar_url || prevUser.avatarUrl
            };
          });
        }

        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully.',
        });
      }
      
      return data as UserProfile;
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
      console.error('Error updating profile:', error);
      toast({
        title: 'Update failed',
        description: error.message || 'Failed to update profile.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    loadProfile,
    updateProfile
  };
};

export default useProfile;
