
// Fix personaHelpers.ts to align with UberPersona props

import { UberPersona } from '@/types/UberPersona';

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
  return persona?.roleFlags?.isVerified ?? false;
}

function isPersonaOnline(persona: UberPersona): boolean {
  return persona?.isOnline ?? false;
}

function getPersonaPrice(persona: UberPersona): number {
  // price is not part of UberPersona in types, fallback to monetization.meetingPrice if available
  if (typeof (persona as any).price === 'number') return (persona as any).price;
  if (persona?.monetization?.meetingPrice) return persona.monetization.meetingPrice;
  return 0;
}

function hasRealMeets(persona: UberPersona): boolean {
  return !!persona?.capabilities?.hasRealMeets;
}

function hasVirtualMeets(persona: UberPersona): boolean {
  return !!persona?.capabilities?.hasVirtualMeets;
}

function hasContent(persona: UberPersona): boolean {
  return !!persona?.capabilities?.hasContent;
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
