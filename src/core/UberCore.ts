
// UberCore - Central integration point for all core services
// Combines: Lucie, Hermes, Oxum, Orus, UberWallet systems

import { UberPersona } from '@/types/UberPersona';
import { UberCoreSettings } from '@/services/neural/types/UberCoreService';
import neuralServiceRegistry from './registry/NeuralServiceRegistry';
import { hermes } from './Hermes';
import { oxum } from './Oxum';
import { orus } from './Orus';
import { uberWallet } from './UberWallet';

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
    return (persona.isOnline ?? false) && !!availability;
  }

  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    try {
      await neuralServiceRegistry.initialize();
      await hermes.initialize();
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

    console.info('UberCore settings updated:', this.settings);
  }

  public getSettings(): UberCoreSettings {
    return { ...this.settings };
  }

  public async shutdown(): Promise<boolean> {
    if (!this.initialized) {
      return true;
    }

    this.initialized = false;
    return true;
  }

  public async processPersona(persona: UberPersona): Promise<UberPersona> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const processedPersona: UberPersona = { ...persona };

      if (!processedPersona.systemMetadata) {
        processedPersona.systemMetadata = {
          source: 'manual',
          lastSynced: new Date(),
          tagsGeneratedByAI: false,
          hilbertSpaceVector: [],
          // safe to add optional custom properties separately
        };
      }

      // Check existence of optional nested properties using optional chaining and existence check
      const statusFlags = processedPersona.systemMetadata.statusFlags ?? undefined;
      const personalityIndex = processedPersona.systemMetadata.personalityIndex ?? undefined;

      // Process using Oxum's boost allocation if needed
      if (this.requiresNeuralBoost(processedPersona)) {
        // Apply Oxum boosting
        const boostMatrix = [
          [0.7, 0.3, 0.2],
          [0.3, 0.8, 0.1],
          [0.2, 0.1, 0.9]
        ];
        
        const boostValues = oxum.boostAllocationEigen(boostMatrix);
        processedPersona.boostScore = boostValues[0] * 100;
      }

      // Apply Hermes flow dynamics
      const flowDynamics = hermes.resolveFlowDynamics({
        personaType: processedPersona.type,
        activityLevel: processedPersona.isOnline ? 0.8 : 0.2,
        systemLoad: 0.5
      });
      
      processedPersona.systemMetadata.flowScore = flowDynamics.flowScore;

      // Log signal transformation with Orus
      orus.logSignalTransform('persona_process', {
        personaId: processedPersona.id,
        type: processedPersona.type,
        boostScore: processedPersona.boostScore
      });

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
      isLocked: persona.isLocked ?? false,
      isOnline: persona.isOnline ?? false,
      availability: persona.availability?.nextAvailable ?? 'Unknown',
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
  
  // Load featured personas - integrates with Lucie system
  public async loadFeaturedPersonas(count: number = 6): Promise<UberPersona[]> {
    try {
      // Simulate loading featured personas
      const personas = Array(count).fill(null).map((_, index) => ({
        id: `featured-${index}`,
        name: `Featured Persona ${index}`,
        type: index % 2 === 0 ? 'escort' : 'creator',
        isOnline: Math.random() > 0.3,
        isVerified: Math.random() > 0.2,
        isPremium: Math.random() > 0.7,
        location: ['New York', 'Los Angeles', 'Miami', 'Las Vegas'][Math.floor(Math.random() * 4)],
        tags: ['premium', 'featured', 'recommended'],
        boostScore: Math.random() * 100,
        availability: {
          nextAvailable: new Date(Date.now() + Math.random() * 1000000).toISOString(),
          schedule: {}
        },
        systemMetadata: {
          source: 'featured',
          lastSynced: new Date(),
          tagsGeneratedByAI: false,
          hilbertSpaceVector: []
        }
      } as UberPersona));
      
      return personas;
    } catch (error) {
      console.error('Error loading featured personas:', error);
      return [];
    }
  }
  
  // System status method for dashboard HUD
  public getSystemStatus(): Record<string, any> {
    return {
      coreStatus: this.initialized ? 'online' : 'offline',
      hermesStatus: 'operational',
      oxumStatus: 'operational',
      orusStatus: 'operational',
      walletStatus: 'synced',
      activeUsers: 1243,
      activePersonas: 876,
      boostPower: 87.3,
      systemLoad: 42.1,
      lastUpdated: new Date()
    };
  }
}

export const uberCoreInstance = new UberCore();
