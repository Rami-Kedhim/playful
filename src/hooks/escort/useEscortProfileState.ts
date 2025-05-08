
import { useState } from 'react';
import { Escort } from '@/types/Escort';

/**
 * Custom hook to manage escort profile state
 */
export const useEscortProfileState = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [escort, setEscort] = useState<Escort | null>(null);
  const [error, setError] = useState<string | null>(null);

  return {
    escort,
    setEscort,
    loading,
    setLoading,
    saving,
    setSaving,
    error,
    setError
  };
};
