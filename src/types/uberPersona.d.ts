
export interface UberPersona {
  id: string;
  name: string;
  type: string;
  personality?: string;
  traits?: string[];
  interests?: string[];
  rating?: number;
  mood?: string;
  energyLevel?: number;
  lastModified?: Date | string;
  createdAt?: Date | string;
}
