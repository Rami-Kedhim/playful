
// Added missing helper functions hasRealMeets, hasVirtualMeets, hasContent to fix imports and typings

import { UberPersona } from '@/types/UberPersona';

function getPersonaType(persona: UberPersona): string {
  return persona?.type ?? '';
}

function getPersonaName(persona: UberPersona): string {
  return persona?.displayName ?? persona?.name ?? 'Unknown Persona';
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
  return persona?.price ?? 0;
}

// New helpers added

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
