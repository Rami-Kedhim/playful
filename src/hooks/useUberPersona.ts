import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { UberPersona } from '@/types/uberPersona'; // Correct casing
import { lucie } from '@/core/Lucie';

export const useUberPersona = (userId: string | undefined) => {
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchPersona = async () => {
      setLoading(true);
      try {
        const mockPersona: UberPersona = {
          id: userId,
          name: 'Demo User',
          displayName: 'Demo User',
          type: 'user',
          tags: ['new'],
          isVerified: true,
          isOnline: true,
          roleFlags: {
            isEscort: false,
            isCreator: false,
            isLivecam: false,
            isAI: false,
            isVerified: true,
            isFeatured: false,
          },
          capabilities: {
            hasPhotos: false,
            hasVideos: false,
            hasStories: false,
            hasChat: true,
            hasBooking: false,
            hasLiveStream: false,
            hasExclusiveContent: false,
            hasContent: false,
            hasRealMeets: false,
            hasVirtualMeets: false,
          },
          systemMetadata: {
            source: 'mock',
            lastSynced: new Date(),
            tagsGeneratedByAI: false,
            hilbertSpaceVector: [],
            statusFlags: {}
          },
          monetization: {
            meetingPrice: 50
          }
        };
        setPersona(mockPersona);
      } catch (err: any) {
        setError(err.message);
        toast({
          title: "Error fetching persona",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPersona();
  }, [userId]);

  return { persona, loading, error };
};

