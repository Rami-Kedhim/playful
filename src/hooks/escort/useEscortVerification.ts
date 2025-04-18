
import { useState, useEffect } from 'react';
import { toDate } from '@/utils/dateUtils';

interface VerificationData {
  isVerified: boolean;
  verificationDate: Date | null;
  expiryDate: Date | null;
  verificationLevel: string;
  documents: Array<{
    id: string;
    type: string;
    status: string;
    uploadedAt: Date;
  }>;
}

export function useEscortVerification(escortId: string | undefined) {
  const [data, setData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerificationData = async () => {
      if (!escortId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // This would be an API call in a real app
      setTimeout(() => {
        // Mock data
        setData({
          isVerified: true,
          verificationDate: toDate('2023-01-15T10:30:00Z'),
          expiryDate: toDate('2024-01-15T10:30:00Z'),
          verificationLevel: 'PREMIUM',
          documents: [
            {
              id: 'doc1',
              type: 'ID_CARD',
              status: 'APPROVED',
              uploadedAt: new Date(2023, 0, 10)
            }
          ]
        });
        setLoading(false);
      }, 1000);
    };

    fetchVerificationData();
  }, [escortId]);

  return { data, loading, error };
}
