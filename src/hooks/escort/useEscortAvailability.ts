import { useState, useEffect } from 'react';
import { Escort } from '@/types/escort';

interface AvailabilityData {
  day: string;
  slots: { start: string; end: string }[];
}

const useEscortAvailability = (escort: Escort | undefined) => {
  const [availability, setAvailability] = useState<AvailabilityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!escort) {
      setLoading(false);
      return;
    }

    const fetchAvailability = async () => {
      try {
        setLoading(true);
        // Simulate fetching availability data
        // Replace this with your actual data fetching logic
        const mockAvailability: AvailabilityData[] = [
          {
            day: 'Monday',
            slots: [{ start: '10:00', end: '12:00' }, { start: '14:00', end: '16:00' }],
          },
          {
            day: 'Wednesday',
            slots: [{ start: '11:00', end: '13:00' }],
          },
          {
            day: 'Friday',
            slots: [{ start: '16:00', end: '18:00' }, { start: '20:00', end: '22:00' }],
          },
        ];

        setAvailability(mockAvailability);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load availability');
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [escort]);

  return { availability, loading, error };
};

export default useEscortAvailability;
