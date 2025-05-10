
export interface UberPersona {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  metadata?: Record<string, any>;
  roleFlags?: number;
  isActive?: boolean;
}
