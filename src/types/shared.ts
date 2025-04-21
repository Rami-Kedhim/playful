
// Merged types for common usage:

export type ID = string;

export interface BasePersona {
  id: ID;
  displayName: string;
  avatarUrl?: string;
  location?: string;
  [key: string]: any;
}

// Add other common shared types here as needed...
