
import { Escort as EscortType } from '@/types/Escort';
import { Escort as EscortTypeLower } from '@/types/escort';
import { AvailabilityDay } from '@/types/availability';

// Normalize the video objects to ensure compatible types
export const normalizeVideoType = (video: any): { id?: string; url: string; thumbnail?: string; title?: string; duration?: number } => {
  return {
    id: video.id,
    url: video.url || '',
    thumbnail: video.thumbnail || video.thumbnailUrl,
    title: video.title,
    duration: video.duration
  };
};

export const convertEscortType = (escort: any): EscortTypeLower => {
  // Create a normalized escort object that works with both types
  const normalizedEscort: EscortTypeLower = {
    ...escort,
    id: escort.id || '',
    name: escort.name || '',
    gender: escort.gender || 'female', // Provide a default gender
  };

  // Normalize videos array if it exists
  if (escort.videos && Array.isArray(escort.videos)) {
    normalizedEscort.videos = escort.videos.map(normalizeVideoType);
  }

  return normalizedEscort;
};

// Add the missing function
export const ensureCompatibleAvailabilityDays = (days: AvailabilityDay[] | undefined): AvailabilityDay[] => {
  if (!days || !Array.isArray(days)) {
    return [];
  }
  
  return days.map(day => ({
    day: day.day,
    available: day.available,
    startTime: day.startTime || "09:00",
    endTime: day.endTime || "17:00"
  }));
};
