
import { UberPersona } from '@/types/uberPersona';

export function formatPersonaPrice(persona: UberPersona): string {
  if (!persona?.monetization) {
    return 'Price not available';
  }
  
  const { hourlyRate, minRate, maxRate, meetingPrice } = persona.monetization;
  
  if (hourlyRate) {
    return `$${hourlyRate}/hr`;
  }
  
  if (minRate && maxRate && minRate !== maxRate) {
    return `$${minRate}-${maxRate}/hr`;
  }
  
  if (minRate) {
    return `$${minRate}/hr`;
  }
  
  if (maxRate) {
    return `$${maxRate}/hr`;
  }

  if (meetingPrice) {
    return `$${meetingPrice}/meeting`;
  }
  
  return 'Price not available';
}

export function getPersonaAvatar(persona: UberPersona): string {
  if (persona.avatarUrl) {
    return persona.avatarUrl;
  }
  
  if (persona.imageUrl) {
    return persona.imageUrl;
  }
  
  if (persona.profileImageUrl) {
    return persona.profileImageUrl;
  }
  
  // Return default avatar based on persona type
  switch (persona.type) {
    case 'escort':
      return '/assets/default-escort-avatar.jpg';
    case 'creator':
      return '/assets/default-creator-avatar.jpg';
    case 'livecam':
      return '/assets/default-livecam-avatar.jpg';
    case 'ai':
      return '/assets/default-ai-avatar.jpg';
    default:
      return '/assets/default-avatar.jpg';
  }
}

export function isPersonaAvailable(persona: UberPersona): boolean {
  if (persona.isOnline) return true;
  
  if (!persona.availability) return false;
  
  if (Array.isArray(persona.availability)) {
    const now = new Date();
    return persona.availability.some(slot => {
      const startTime = new Date(slot.start);
      const endTime = new Date(slot.end);
      return now >= startTime && now <= endTime;
    });
  }
  
  if ('nextAvailable' in persona.availability) {
    const nextAvailable = new Date(persona.availability.nextAvailable);
    const now = new Date();
    return nextAvailable <= now;
  }
  
  return false;
}
