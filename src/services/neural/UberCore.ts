import { UberPersona } from '@/types/UberPersona';
import { UberCoreSettings } from '@/types/uber-ecosystem';
import neuralServiceRegistry from './registry/NeuralServiceRegistry';

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

  public isAvailable(persona: UberPersona): boolean {
    if (!persona) return false;
    
    const availability = persona.availability?.schedule;
    return persona.isActive === true && !!availability;
  }
  
  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    try {
      await neuralServiceRegistry.initialize();
      console.info('UberCore initialized with settings:', this.settings);
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize UberCore:', error);
      return false;
    }
  }
  
  public updateSettings(newSettings: Partial<UberCoreSettings>): void {
    this.settings = {
      ...this.settings,
      ...newSettings
    };

    if (typeof newSettings.resourceAllocation === 'number') {
      neuralServiceRegistry.optimizeResourceAllocation();
    }
    
    console.info('UberCore settings updated:', this.settings);
  }
  
  public getSettings(): UberCoreSettings {
    return { ...this.settings };
  }
  
  public async shutdown(): Promise<boolean> {
    if (!this.initialized) {
      return true;
    }
    
    try {
      await neuralServiceRegistry.shutdown();
      this.initialized = false;
      return true;
    } catch (error) {
      console.error('Error shutting down UberCore:', error);
      return false;
    }
  }
  
  public async processPersona(persona: UberPersona): Promise<UberPersona> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    try {
      const processedPersona: UberPersona = { ...persona };
      
      if (!processedPersona.systemMetadata) {
        processedPersona.systemMetadata = {
          version: '1.0',
          lastUpdated: new Date().toISOString(),
          personalityIndex: Math.random()
        };
      }
      
      switch (processedPersona.type) {
        case 'escort':
          break;
        case 'creator':
          break;
        case 'livecam':
          break;
        case 'ai':
          break;
      }
      
      return processedPersona;
    } catch (error) {
      console.error('Error processing persona:', error);
      return persona;
    }
  }
  
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
  
  public calculateMatchScore(personaA: UberPersona, personaB: UberPersona): number {
    let score = 0;
    
    if (personaA.type === personaB.type) score += 10;
    if (personaA.location === personaB.location) score += 20;
    
    if (personaA.tags && personaB.tags) {
      const sharedTags = personaA.tags.filter(tag => personaB.tags?.includes(tag));
      score += sharedTags.length * 5;
    }
    
    return Math.min(100, score);
  }
  
  public isPremiumPersona(persona: UberPersona): boolean {
    return persona.isPremium === true;
  }
  
  public requiresNeuralBoost(persona: UberPersona): boolean {
    if (!this.settings.boostingEnabled) return false;
    
    const isPremium = persona.isPremium === true;
    
    const useNeural = persona.systemMetadata?.statusFlags?.needsModeration === true || 
                      persona.systemMetadata?.personalityIndex !== undefined;
    
    return isPremium || useNeural;
  }
}

export const uberCoreInstance = new UberCore();
