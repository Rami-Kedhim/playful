
import { UberPersona, mapEscortToUberPersona } from '@/types/uberPersona';
import { Escort } from '@/types/escort';
import { ContentCreator } from '@/types/creator';
import { LivecamModel } from '@/types/livecams';
import { visibilitySystem } from '@/services/visibility/VisibilitySystem';

export class UberPersonaService {
  private static instance: UberPersonaService;

  private constructor() {}

  public static getInstance(): UberPersonaService {
    if (!UberPersonaService.instance) {
      UberPersonaService.instance = new UberPersonaService();
    }
    return UberPersonaService.instance;
  }

  /**
   * Convert an escort to an UberPersona
   */
  public escortToUberPersona(escort: Escort): UberPersona {
    return mapEscortToUberPersona(escort);
  }

  /**
   * Convert a creator to an UberPersona
   */
  public creatorToUberPersona(creator: ContentCreator): UberPersona {
    return {
      id: creator.id,
      username: creator.username || `creator_${creator.id.substring(0, 8)}`,
      displayName: creator.name || 'Unnamed Creator',
      avatarUrl: creator.avatarUrl || creator.profileImage || '',
      location: creator.location || '',
      language: creator.languages?.[0] || 'English',
      bio: creator.bio || creator.description || '',
      age: creator.age || 0,
      ethnicity: creator.ethnicity || '',
      tags: creator.tags || [],
      createdAt: creator.createdAt ? new Date(creator.createdAt) : new Date(),
      updatedAt: creator.updatedAt ? new Date(creator.updatedAt) : new Date(),
      
      roleFlags: {
        isEscort: false,
        isCreator: true,
        isLivecam: false,
        isAI: creator.isAI || false,
        isVerified: creator.isVerified || false,
        isFeatured: creator.isFeatured || false
      },
      
      capabilities: {
        hasPhotos: !!creator.contentCount?.photos,
        hasVideos: !!creator.contentCount?.videos,
        hasStories: !!creator.contentCount?.stories,
        hasChat: true,
        hasVoice: false,
        hasBooking: false,
        hasLiveStream: !!creator.hasLiveStream,
        hasExclusiveContent: true
      },
      
      monetization: {
        acceptsLucoin: true,
        acceptsTips: true,
        subscriptionPrice: creator.subscriptionPrice,
        unlockingPrice: undefined,
        boostingActive: false
      },
      
      systemMetadata: {
        source: creator.isScraped ? 'scraped' : creator.isAI ? 'ai_generated' : 'manual',
        lastSynced: creator.lastSynced ? new Date(creator.lastSynced) : undefined,
        aiPersonality: creator.isAI ? 'creative' : undefined,
        aiMood: creator.isAI ? 'inspired' : undefined,
        aiEngine: creator.isAI ? 'GPT' : undefined,
        tagsGeneratedByAI: creator.isAI || creator.isScraped || false
      }
    };
  }

  /**
   * Convert a livecam model to an UberPersona
   */
  public livecamToUberPersona(livecam: LivecamModel): UberPersona {
    return {
      id: livecam.id,
      username: livecam.username || `cam_${livecam.id.substring(0, 8)}`,
      displayName: livecam.displayName || livecam.name || 'Unnamed Performer',
      avatarUrl: livecam.thumbnailUrl || livecam.imageUrl || '',
      location: livecam.location || '',
      language: livecam.language || 'English',
      bio: livecam.description || '',
      age: livecam.age || 0,
      ethnicity: livecam.ethnicity || '',
      tags: livecam.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      
      roleFlags: {
        isEscort: false,
        isCreator: false,
        isLivecam: true,
        isAI: false,
        isVerified: livecam.isVerified || false,
        isFeatured: livecam.isFeatured || false
      },
      
      capabilities: {
        hasPhotos: false,
        hasVideos: false,
        hasStories: false,
        hasChat: true,
        hasVoice: true,
        hasBooking: false,
        hasLiveStream: true,
        hasExclusiveContent: false
      },
      
      monetization: {
        acceptsLucoin: true,
        acceptsTips: true,
        subscriptionPrice: undefined,
        unlockingPrice: livecam.price || undefined,
        boostingActive: false
      },
      
      systemMetadata: {
        source: 'scraped',
        lastSynced: new Date(),
        tagsGeneratedByAI: false
      }
    };
  }

  /**
   * Register a persona with the visibility system
   */
  public registerWithVisibilitySystem(persona: UberPersona): void {
    let type = 'escort';
    if (persona.roleFlags.isCreator) type = 'creator';
    if (persona.roleFlags.isLivecam) type = 'livecam';

    visibilitySystem.registerItem({
      id: persona.id,
      type: type as any,
      score: this.calculateVisibilityScore(persona),
      region: persona.location,
      language: persona.language,
      metadata: {
        roleFlags: persona.roleFlags,
        capabilities: persona.capabilities
      }
    });
  }

  /**
   * Calculate a visibility score for a persona
   */
  private calculateVisibilityScore(persona: UberPersona): number {
    // Base score starts at 50
    let score = 50;
    
    // Add points for completeness
    if (persona.bio && persona.bio.length > 30) score += 5;
    if (persona.avatarUrl) score += 10;
    
    // Add points for capabilities
    if (persona.capabilities.hasPhotos) score += 5;
    if (persona.capabilities.hasVideos) score += 5;
    if (persona.capabilities.hasLiveStream) score += 10;
    
    // Add points for roles
    if (persona.roleFlags.isVerified) score += 15;
    if (persona.roleFlags.isFeatured) score += 20;
    
    // Cap at 100
    return Math.min(100, score);
  }
}

export const uberPersonaService = UberPersonaService.getInstance();
export default uberPersonaService;
