
import { LucieAI } from '@/core/Lucie';
import { Hermes } from '@/core/Hermes';
import { Oxum } from '@/core/Oxum';
import { Orus } from '@/core/Orus';

export interface LucieAISystem extends LucieAI {}
export interface HermesSystem extends Hermes {}
export interface OxumSystem extends Oxum {}
export interface OrusSystem extends Orus {}

export interface UberCoreSystem {
  lucieAI: LucieAISystem;
  hermesSystem: HermesSystem;
  oxumSystem: OxumSystem;
  initialize(): Promise<void>;
  checkSubsystemHealth(): Array<{
    name: string;
    status: string;
    health: number;
  }>;
  initializeAutomaticSeo(): {
    success: boolean;
    message: string;
  };
}

export interface GenerateContentParams {
  prompt: string;
  options?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  };
}
