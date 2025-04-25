
import { UberPersona } from '@/types/UberPersona';
import { UberCoreSettings } from './types/uberCore.types';
import { personaService } from './services/personaService';
import { featuredService } from './services/featuredService';
import neuralServiceRegistry from './registry/NeuralServiceRegistry';
import { hermes } from './Hermes';

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

  // Delegate to persona service
  public isAvailable = personaService.isAvailable;
  public processPersona = personaService.processPersona;
  public getPersonaStatus = personaService.getPersonaStatus;
  public calculateMatchScore = personaService.calculateMatchScore;
  
  // Delegate to featured service
  public loadFeaturedPersonas = featuredService.loadFeaturedPersonas;
  
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
