export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
  price: number;
  imageUrl: string;
  gallery?: string[];
  videos?: string[];
  rating: number;
  reviews: number;
  tags: string[];
  description?: string;
  verified: boolean;
  gender?: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: string;
  responseRate?: number;
  languages?: string[];
  height?: string;
  weight?: string;
  measurements?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  availability?: {
    days: string[];
    hours: string;
  };
  services?: string[];
  rates?: {
    hourly: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  
  // Verification information
  verificationLevel: "none" | "basic" | "enhanced" | "premium";
  verificationDate?: string;
  
  // Content creator capabilities
  hasVirtualContent: boolean;
  virtualUsername?: string;
  
  // Service type flags
  providesInPersonServices: boolean;
  providesVirtualContent: boolean;
  providesLiveStreams?: boolean;
  isAIGenerated?: boolean;
  
  // Content information
  contentStats?: {
    photos: number;
    videos: number;
    streams: number;
  };
  
  // Subscription information
  subscriptionPrice?: number;
  subscriptionLevels?: {
    name: string;
    price: number;
    benefits: string[];
  }[];
  
  // Multi-escort account management
  agencyId?: string;
  isAgency?: boolean;
  managedEscorts?: string[];
  
  // Boost score (0-100) for ranking in search results
  boostScore?: number;
}

export type ServiceType = 
  | "massage" 
  | "escort" 
  | "companionship" 
  | "dinner date" 
  | "travel companion" 
  | "overnight" 
  | "virtual" 
  | "gfe" 
  | "fetish"
  | "bdsm"
  | "roleplay"
  | "couples"
  | "bachelor party";

export type VerificationStatus = "pending" | "verified" | "rejected" | "expired";

export interface VerificationRequest {
  id: string;
  userId: string;
  documentType: "passport" | "id_card" | "driver_license" | "other";
  documentFrontImage: string;
  documentBackImage?: string;
  selfieImage: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  expiresAt?: string;
  rejectionReason?: string;
}

export interface EscortAvailability {
  escortId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isRecurring: boolean;
  recurringDays?: string[]; // ["monday", "wednesday", "friday"]
}

export interface EscortReview {
  id: string;
  escortId: string;
  clientId: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean; // Only verified bookings can leave reviews
  response?: {
    comment: string;
    date: string;
  };
}

export interface EscortBooking {
  id: string;
  escortId: string;
  clientId: string;
  clientName: string; // Can be anonymous/nickname
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in hours
  service: ServiceType;
  location: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  price: number;
  isPaid: boolean;
  paymentMethod: "lucoin" | "cash" | "other";
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}
