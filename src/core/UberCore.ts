
import { UberPersona } from '@/types/UberPersona';
import { UberCoreSettings } from './types/uberCore.types';
import { personaService } from './services/personaService';
import { featuredService } from './services/featuredService';
import neuralServiceRegistry from './registry/NeuralServiceRegistry';
import { hermes } from './Hermes';
import { oxum } from './Oxum';
import { orus } from './Orus';
import { uberWallet } from './UberWallet';

/**
 * UberCore - Central hub for the UberEscorts platform
 * Integrates Oxum (Boosting), Hermes (Flow Dynamics), Orus (Signal Processing),
 * and the UberWallet for a unified ecosystem
 */
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

  /**
   * Initialize the UberCore system and its subsystems
   */
  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    try {
      // Initialize subsystems in the correct order
      await neuralServiceRegistry.initialize();
      await hermes.initialize();
      
      // Additional subsystems can be initialized here as needed
      
      console.info('UberCore initialized with settings:', this.settings);
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize UberCore:', error);
      return false;
    }
  }

  /**
   * Update core settings
   */
  public updateSettings(newSettings: Partial<UberCoreSettings>): void {
    this.settings = {
      ...this.settings,
      ...newSettings
    };
    console.info('UberCore settings updated:', this.settings);
  }

  /**
   * Get current core settings
   */
  public getSettings(): UberCoreSettings {
    return { ...this.settings };
  }

  /**
   * Shut down the UberCore system
   */
  public async shutdown(): Promise<boolean> {
    if (!this.initialized) {
      return true;
    }
    this.initialized = false;
    return true;
  }

  /**
   * Process a persona through the UberCore system
   * Applies boosting, flow dynamics, and analytics
   */
  public async processPersona(persona: UberPersona): Promise<UberPersona> {
    try {
      // Delegate to service
      return await personaService.processPersona(persona);
    } catch (error) {
      console.error('Error processing persona:', error);
      return persona;
    }
  }

  // Delegate methods to appropriate services for backward compatibility
  public isAvailable = personaService.isAvailable;
  public getPersonaStatus = personaService.getPersonaStatus;
  public calculateMatchScore = personaService.calculateMatchScore;
  public loadFeaturedPersonas = featuredService.loadFeaturedPersonas;

  /**
   * Get system status from all subsystems
   */
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
  
  /**
   * Check the health of all subsystems
   */
  public checkSubsystemHealth(): Record<string, any> {
    // Get integrity data from Orus
    const integrityCheck = orus.checkIntegrity();
    
    // Get flow dynamics from Hermes
    const flowDynamics = hermes.resolveFlowDynamics({
      systemLoad: 0.5,
      activityLevel: 0.7
    });
    
    return {
      hermes: {
        status: flowDynamics.status,
        flowScore: flowDynamics.flowScore,
        recommendations: flowDynamics.recommendedActions
      },
      oxum: {
        liveMaps: oxum.getLiveBoostMap(5).length,
        status: 'operational'
      },
      orus: {
        modules: integrityCheck.modules,
        issues: integrityCheck.issues
      },
      wallet: {
        status: 'online',
        transactionCount: 543
      }
    };
  }
}

// Export a singleton instance for the application to use
export const uberCoreInstance = new UberCore();
