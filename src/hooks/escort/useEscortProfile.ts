import { useState, useEffect, useCallback } from 'react';
import { Escort } from '@/types/escort';
import escortService from '@/services/escortService';
import { useAuth } from '@/hooks/auth/useAuthContext';

export const useEscortProfile = (escortId?: string) => {
  const [escort, setEscort] = useState<Escort | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProfile = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedEscort = await escortService.getEscortById(id);
      if (fetchedEscort) {
        setEscort(fetchedEscort);
      } else {
        setError('Escort profile not found');
      }
    } catch (e: any) {
      setError(e.message || 'Failed to fetch escort profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (escortId) {
      fetchProfile(escortId);
    }
  }, [escortId, fetchProfile]);

  const updateProfile = async (profileData: Partial<Escort>): Promise<boolean> => {
    if (!escort?.id) return false;
    try {
      const updatedEscort = await escortService.updateEscort(escort.id, profileData);
      if (updatedEscort) {
        setEscort(updatedEscort);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to update escort profile:', error);
      return false;
    }
  };

  return {
    escort,
    loading,
    error,
    fetchProfile,
    updateProfile,
    isOwnProfile: user?.id === escort?.id
  };
};

export default useEscortProfile;
