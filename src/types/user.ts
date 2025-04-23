
import { VerificationLevel } from './verification';

export interface User {
  id: string;
  email?: string;
  created_at: string;
  user_metadata?: {
    verification_status?: string;
    verification_submitted?: boolean;
    verification_level?: VerificationLevel;
    verification_documents?: {
      submittedAt: string;
      documentUrls: string[];
    };
  };
}
