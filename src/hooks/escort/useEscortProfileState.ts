import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Escort, VerificationLevel } from '@/types/Escort';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';

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
