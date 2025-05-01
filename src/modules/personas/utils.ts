
import { UberPersona } from '@/types/uberPersona';

export function getDisplayImage(persona: UberPersona): string {
  // Use avatarUrl, imageUrl, profileImageUrl in that order of preference
  return persona.avatarUrl || persona.imageUrl || persona.profileImageUrl || '/placeholder-avatar.png';
}

export function getDisplayName(persona: UberPersona): string {
  return persona.displayName || persona.name || 'Anonymous';
}

export function getPersonaTypeLabel(persona: UberPersona): string {
  if (!persona.type) return 'Unknown';
  
  // Capitalize first letter
  return persona.type.charAt(0).toUpperCase() + persona.type.slice(1);
}

export function formatLastActive(lastActive: Date | string | undefined): string {
  if (!lastActive) return 'Never';
  
  const date = typeof lastActive === 'string' ? new Date(lastActive) : lastActive;
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffSeconds < 60) return 'Just now';
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
  
  return date.toLocaleDateString();
}

export function isVerifiedPersona(persona: UberPersona): boolean {
  return !!persona.isVerified;
}
