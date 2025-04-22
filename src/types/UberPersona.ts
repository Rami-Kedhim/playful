
export interface UberPersonaData {
  id: string;
  user_id: string;
  persona_type: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
  settings?: Record<string, any>;
  metadata?: Record<string, any>;
  status?: string;
}
