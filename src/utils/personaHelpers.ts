// Fix import case sensitivity
import { UberPersona } from '@/types/uberPersona';

// Added checks for the newly ensured properties in UberPersona

function getPersonaType(persona: UberPersona): string {
  return persona?.type ?? '';
}

function getPersonaName(persona: UberPersona): string {
  return persona?.displayName ?? 'Unknown Persona';
}

function getPersonaAvatar(persona: UberPersona): string {
  return persona?.avatarUrl ?? '/images/default-avatar.png';
}

function getPersonaLocation(persona: UberPersona): string {
  return persona?.location ?? 'Unknown Location';
}

function getPersonaTags(persona: UberPersona): string[] {
  return persona?.tags ?? [];
}

function isPersonaVerified(persona: UberPersona): boolean {
  return persona?.isVerified ?? false;
}

function isPersonaOnline(persona: UberPersona): boolean {
  return persona?.isOnline ?? false;
}

function getPersonaPrice(persona: UberPersona): number {
  if (typeof (persona as any).price === 'number') return (persona as any).price;
  if (persona?.monetization?.meetingPrice) return persona.monetization.meetingPrice;
  return 0;
}

function hasRealMeets(persona: UberPersona): boolean {
  return !!(persona as any)?.capabilities?.hasRealMeets;
}

function hasVirtualMeets(persona: UberPersona): boolean {
  return !!(persona as any)?.capabilities?.hasVirtualMeets;
}

function hasContent(persona: UberPersona): boolean {
  return !!(persona as any)?.capabilities?.hasContent;
}

export {
  getPersonaType,
  getPersonaName,
  getPersonaAvatar,
  getPersonaLocation,
  getPersonaTags,
  isPersonaVerified,
  isPersonaOnline,
  getPersonaPrice,
  hasRealMeets,
  hasVirtualMeets,
  hasContent,
};
