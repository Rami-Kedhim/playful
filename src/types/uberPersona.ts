
export interface UberPersona {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  language: string;
  location?: string;
  isOnline?: boolean;
  lastActive?: Date;
  bio?: string;
  rating?: number;
  popularity?: number;
  gender?: string;
  age?: number;
  roleFlags?: {
    isEscort?: boolean;
    isCreator?: boolean;
    isLivecam?: boolean;
  };
  tags?: string[];
  price?: number;
  systemMetadata?: {
    source?: string;
    internalId?: string;
    sourceDetail?: string;
    syncTimestamp?: Date;
  };
}
