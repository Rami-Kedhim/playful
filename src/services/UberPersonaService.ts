
// Fix use of properties to match Escort type case and remove invalid ones

import { generateRandomEscort } from "@/data/mock/profileGenerator";
import { Escort } from '@/types/Escort';

export const uberPersonaService = {
    generateRandomPersona: async () => {
        const profile = generateRandomEscort();
        return profile;
    },
    getPersonaById: async (id: string) => {
        // Mock implementation
        const profile = generateRandomEscort();
        profile.id = id;
        return profile;
    },
    
    // Add missing methods
    escortToUberPersona: async (escort: Escort) => {
        return {
            ...escort,
            profileType: escort.isAI ? 'ai' : escort.isVerified ? 'verified' : 'scraped',
            persona_type: 'escort'
        };
    },
    
    creatorToUberPersona: async (creator: any) => {
        return {
            ...creator,
            profileType: 'creator',
            persona_type: 'creator'
        };
    },
    
    livecamToUberPersona: async (livecam: any) => {
        return {
            ...livecam,
            profileType: 'livecam',
            persona_type: 'livecam'
        };
    },
    
    registerWithVisibilitySystem: async (id: string, type: string) => {
        console.log(`Registering ${id} of type ${type} with visibility system`);
        return { success: true, id, registered: Date.now() };
    }
};

export const generatePersonaProfile = async (name: string, desc: string, type: "scraped" | "manual" | "ai_enhanced", location?: string) => {
    try {
        const profileImageUrl = `https://picsum.photos/seed/${name}/800/1200`;
        const avatar_url = `https://picsum.photos/seed/${name}/150/150`;
        return {
            name,
            bio: desc,
            location: location || 'Virtual',
            imageUrl: profileImageUrl,
            avatar_url,
            profileImage: profileImageUrl,
            profileType: type === "ai_enhanced" ? "ai" : type,
            isAI: type === "ai_enhanced"
        };
    } catch (error) {
        console.error("Error generating persona profile:", error);
        return {
            name: "Error generating profile"
        };
    }
};

export const updatePersonaProfile = async (id: string, updates: any) => {
    try {
        // Mock implementation
        const profile = generateRandomEscort();
        profile.id = id;
        return {
            ...profile,
            ...updates
        };
    } catch (error) {
        console.error("Error updating persona profile:", error);
        return generateRandomEscort();
    }
};

