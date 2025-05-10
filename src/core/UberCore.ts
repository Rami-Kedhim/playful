
import { UberCoreSystem, HermesSystem, LucieAISystem, OxumSystem } from '@/types/core-systems';
import { Hermes, LucieAI, Oxum } from '@/core';

export class UberCore implements UberCoreSystem {
  // Change from private to public to match interface
  public lucieAI: LucieAISystem;
  public hermesSystem: HermesSystem;
  public oxumSystem: OxumSystem;

  constructor() {
    this.lucieAI = new LucieAI();
    this.hermesSystem = new Hermes();
    this.oxumSystem = new Oxum();
  }

  async initialize() {
    await this.hermesSystem.initialize();
    await this.oxumSystem.initialize();
    // Any other initialization
  }
}

export default UberCore;
