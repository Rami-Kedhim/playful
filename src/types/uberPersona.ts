
export interface UberPersona {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  metadata?: Record<string, any>;
  roleFlags?: number; // Added to fix type errors
  isActive?: boolean; // Added to fix type errors
}
