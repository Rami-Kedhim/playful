
// Update the UberPersona interface to include all properties used in components

export interface UberPersona {
    id: string;
    name: string;
    displayName?: string;
    username?: string;
    type: string;
    personality?: string;
    traits?: string[];
    interests?: string[];
    mood?: string;
    energyLevel?: number;
    rating?: number;
    avatarUrl?: string;
    imageUrl?: string;
    bio?: string;
    description?: string;
    location?: string;
    age?: number;
    ethnicity?: string;
    isVerified?: boolean;
    verificationLevel?: 'basic' | 'verified' | 'premium';
    isActive?: boolean;
    isAI?: boolean;
    isPremium?: boolean;
    isLocked?: boolean;
    isOnline?: boolean;
    tags?: string[];
    featured?: boolean;
    languages?: string[];
    services?: string[];
    availability?: {
        schedule?: {
            [day: string]: {
                available: boolean;
                slots?: { start: string; end: string }[];
            };
        };
        nextAvailable?: string;
    };
    systemMetadata?: {
        version?: string;
        lastUpdated?: string;
        lastSynced?: Date;
        personalityIndex?: number;
        statusFlags?: {
            needsModeration?: boolean;
            hasPendingUpdates?: boolean;
            isPremiumExpiring?: boolean;
        };
        source?: string;
        tagsGeneratedByAI?: boolean;
        hilbertSpaceVector?: number[];
    };
    roleFlags?: {
        isEscort?: boolean;
        isCreator?: boolean;
        isLivecam?: boolean;
        isAI?: boolean;
        isVerified?: boolean;
        isFeatured?: boolean;
    };
    capabilities?: {
        hasPhotos?: boolean;
        hasVideos?: boolean;
        hasStories?: boolean;
        hasChat?: boolean;
        hasVoice?: boolean;
        hasBooking?: boolean;
        hasLiveStream?: boolean;
        hasExclusiveContent?: boolean;
        hasContent?: boolean;
        hasRealMeets?: boolean;
        hasVirtualMeets?: boolean;
    };
    monetization?: {
        acceptsLucoin?: boolean;
        acceptsTips?: boolean;
        subscriptionPrice?: number;
        unlockingPrice?: number;
        boostingActive?: boolean;
        meetingPrice?: number;
    };
    price?: number;
    stats?: {
        rating?: number;
        reviewCount?: number;
        viewCount?: number;
        favoriteCount?: number;
        bookingCount?: number;
        responseTime?: number;
    };
    neuralModel?: NeuralModel;
    boost_status?: {
        isActive: boolean;
        tier: string;
        remainingTime: string;
    };
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface NeuralModel {
    id: string;
    name: string;
    version: string;
    type: string;
    capabilities: string[];
    specialization: string | string[];
    size?: number;
    precision?: number;
    parameters?: {
        [key: string]: any;
    };
}

export interface UberCompanion extends UberPersona {
    relationship: string;
    affection: number;
    lastInteraction?: Date;
}

export interface UberAssistant extends UberPersona {
    expertise: string[];
    efficiency: number;
    taskCompletion: number;
}

export type PersonaType = 'escort' | 'creator' | 'livecam' | 'ai';

export interface PersonaFilters {
    location?: string;
    minAge?: number;
    maxAge?: number;
    services?: string[];
    type?: PersonaType[];
    priceRange?: [number, number];
    rating?: number;
    verified?: boolean;
}

// Add compatibility with other type references
export type UberPersonaData = UberPersona;
