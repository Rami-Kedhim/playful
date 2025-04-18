
import { UberPersona } from '@/types/UberPersona';
import { UberCoreSettings } from '@/types/uber-ecosystem';
import { neuralServiceRegistry } from './registry/NeuralServiceRegistry';

export class UberCore {
  private initialized: boolean = false;
  private settings: UberCoreSettings = {
    boostingEnabled: true,
    boostingAlgorithm: 'OxumAlgorithm',
    orderByBoost: true,
    autonomyLevel: 75,
    resourceAllocation: 60,
    hilbertDimension: 4,
    aiEnhancementLevel: 3
  };

  // Check persona availability and status
  public isAvailable(persona: UberPersona): boolean {
    if (!persona) return false;
    
    // Optional chaining for safely accessing potential undefined properties
    const availability = persona.availability?.schedule;
    return persona.isActive === true && !!availability;
  }
  
  // Main initialization method
  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    try {
      // Initialize all registered neural services
      await neuralServiceRegistry.initializeAll();
      
      // Log initialization
      console.info('UberCore initialized with settings:', this.settings);
      
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize UberCore:', error);
      return false;
    }
  }
  
  // Update settings
  public updateSettings(newSettings: Partial<UberCoreSettings>): void {
    this.settings = {
      ...this.settings,
      ...newSettings
    };
    
    // Apply relevant settings to neural services
    if (typeof newSettings.resourceAllocation === 'number') {
      // Update resource allocation for all services
      neuralServiceRegistry.optimizeResourceAllocation();
    }
    
    console.info('UberCore settings updated:', this.settings);
  }
  
  // Get current settings
  public getSettings(): UberCoreSettings {
    return { ...this.settings };
  }
  
  // Shutdown method
  public async shutdown(): Promise<boolean> {
    if (!this.initialized) {
      return true;
    }
    
    try {
      // Shutdown all neural services
      await neuralServiceRegistry.shutdownAll();
      
      this.initialized = false;
      return true;
    } catch (error) {
      console.error('Error shutting down UberCore:', error);
      return false;
    }
  }
  
  // Process a persona through neural services
  public async processPersona(persona: UberPersona): Promise<UberPersona> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    try {
      // Clone persona to avoid mutations
      const processedPersona: UberPersona = { ...persona };
      
      // Add system metadata if not present
      if (!processedPersona.systemMetadata) {
        processedPersona.systemMetadata = {
          version: '1.0',
          lastUpdated: new Date().toISOString(),
          personalityIndex: Math.random()
        };
      }
      
      // Process based on persona type
      switch (processedPersona.type) {
        case 'escort':
          // Use escorts neural service
          break;
        case 'creator':
          // Use creators neural service
          break;
        case 'livecam':
          // Use livecams neural service
          break;
        case 'ai':
          // Use AI companion neural service
          break;
      }
      
      return processedPersona;
    } catch (error) {
      console.error('Error processing persona:', error);
      return persona;
    }
  }
  
  // Calculate persona status
  public getPersonaStatus(persona: UberPersona): {
    isLocked: boolean;
    isOnline: boolean;
    availability: string;
  } {
    return {
      isLocked: persona.isLocked || false,
      isOnline: persona.isOnline || false,
      availability: persona.availability?.nextAvailable || 'Unknown'
    };
  }
  
  // Calculate match score between two personas
  public calculateMatchScore(personaA: UberPersona, personaB: UberPersona): number {
    let score = 0;
    
    // Basic matching algorithm
    if (personaA.type === personaB.type) score += 10;
    if (personaA.location === personaB.location) score += 20;
    
    // Match tags
    if (personaA.tags && personaB.tags) {
      const sharedTags = personaA.tags.filter(tag => personaB.tags?.includes(tag));
      score += sharedTags.length * 5;
    }
    
    return Math.min(100, score);
  }
  
  // Check if persona is premium
  public isPremiumPersona(persona: UberPersona): boolean {
    return persona.isPremium === true;
  }
  
  // Check if persona requires neural boost
  public requiresNeuralBoost(persona: UberPersona): boolean {
    if (!this.settings.boostingEnabled) return false;
    
    // Check if persona has premium status
    const isPremium = persona.isPremium === true;
    
    // Check if persona has system metadata neural service flags
    const useNeural = persona.systemMetadata?.statusFlags?.needsModeration === true || 
                      persona.systemMetadata?.personalityIndex !== undefined;
    
    return isPremium || useNeural;
  }
}

// Export a singleton instance
export const uberCoreInstance = new UberCore();
