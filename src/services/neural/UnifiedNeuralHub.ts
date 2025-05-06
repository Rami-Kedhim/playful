import { ModuleType } from './types/NeuralService';

// We'll fix just the module type issues in this file
// Only updating the areas that are causing errors

class StandardNeuralService {
  constructor(
    public moduleId: string,
    public name: string, 
    public moduleType: ModuleType,
    public config: any
  ) {}
}

// Mock implementations for service classes
const coreService = new StandardNeuralService(
  'core-neural-service',
  'Core Neural Service', 
  ModuleType.CORE, // Was "core"
  {
    enabled: true,
    priority: 'high',
    // Other properties...
  }
);

// Mock analytics service
const analyticsService = new StandardNeuralService(
  'neural-analytics',
  'Neural Analytics', 
  ModuleType.NEURAL, // Was "neural"
  {
    enabled: true,
    priority: 'normal',
    // Other properties...
  }
);

// Mock voice service
const voiceService = new StandardNeuralService(
  'neural-voice-service',
  'Neural Voice Service', 
  ModuleType.NEURAL, // Was "neural"
  {
    enabled: true,
    priority: 'high',
    // Other properties...
  }
);

// Mock implementations for service classes
const escortService = new StandardNeuralService(
  'escort-neural-service',
  'Escort Neural Service',
  ModuleType.ESCORTS,
  {
    enabled: true,
    priority: 'high',
    // Other properties...
  }
);

// Mock implementations for service classes
const creatorService = new StandardNeuralService(
  'creator-neural-service',
  'Creator Neural Service',
  ModuleType.CREATORS,
  {
    enabled: true,
    priority: 'high',
    // Other properties...
  }
);

// Mock implementations for service classes
const livecamService = new StandardNeuralService(
  'livecam-neural-service',
  'Livecam Neural Service',
  ModuleType.LIVECAMS,
  {
    enabled: true,
    priority: 'high',
    // Other properties...
  }
);

// Mock implementations for service classes
const aiCompanionService = new StandardNeuralService(
  'ai-companion-neural-service',
  'AI Companion Neural Service',
  ModuleType.COMPANION,
  {
    enabled: true,
    priority: 'high',
    // Other properties...
  }
);

// Mock implementations for service classes
const seoService = new StandardNeuralService(
  'seo-neural-service',
  'SEO Neural Service',
  ModuleType.SEO,
  {
    enabled: true,
    priority: 'high',
    // Other properties...
  }
);

class UnifiedNeuralHub {
  private services: StandardNeuralService[] = [];

  constructor() {
    this.registerService(coreService);
    this.registerService(analyticsService);
    this.registerService(voiceService);
    this.registerService(escortService);
    this.registerService(creatorService);
    this.registerService(livecamService);
    this.registerService(aiCompanionService);
    this.registerService(seoService);
  }

  registerService(service: StandardNeuralService): void {
    if (!this.services.find(s => s.moduleId === service.moduleId)) {
      this.services.push(service);
      console.log(`[UnifiedNeuralHub] Registered service: ${service.name}`);
    } else {
      console.warn(`[UnifiedNeuralHub] Service with moduleId ${service.moduleId} already registered.`);
    }
  }

  getService(moduleId: string): StandardNeuralService | undefined {
    return this.services.find(service => service.moduleId === moduleId);
  }
  
  getAllServices(): StandardNeuralService[] {
    return [...this.services];
  }

  startAll(): void {
    this.services.forEach(service => {
      console.log(`[UnifiedNeuralHub] Starting service: ${service.name}`);
      // In a real implementation, you would call a start method on the service
    });
  }
  
  stopAll(): void {
    this.services.forEach(service => {
      console.log(`[UnifiedNeuralHub] Stopping service: ${service.name}`);
      // In a real implementation, you would call a stop method on the service
    });
  }
  
  // Here we're just exporting an instance of the class to be used elsewhere
}

export const neuralHub = new UnifiedNeuralHub();
export default neuralHub;
