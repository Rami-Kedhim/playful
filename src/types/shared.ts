
// Shared type definitions used across modules

export type ID = string;

export interface BasePersona {
  id: ID;
  displayName: string;
  avatarUrl?: string;
  location?: string;
  [key: string]: any;
}
