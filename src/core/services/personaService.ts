
import { UberPersona } from '@/types/UberPersona';
import { hermes } from '../Hermes';
import { oxum } from '../Oxum';
import { orus } from '../Orus';
import { PersonaProcessingResult } from '../types/uberCore.types';

export class PersonaService {
  public isAvailable(persona: UberPersona): boolean {
    if (!persona) return false;
    const availability = persona.availability?.schedule;
    return (persona.isOnline ?? false) && !!availability;
  }

  public async processPersona(persona: UberPersona): Promise<PersonaProcessingResult> {
    try {
      const processedPersona = { ...persona } as PersonaProcessingResult;

      if (!processedPersona.systemMetadata) {
        processedPersona.systemMetadata = {
          source: 'manual',
          lastSynced: new Date(),
          tagsGeneratedByAI: false,
          hilbertSpaceVector: [],
        };
      }

      if (this.requiresNeuralBoost(processedPersona)) {
        const boostMatrix = [
          [0.7, 0.3, 0.2],
          [0.3, 0.8, 0.1],
          [0.2, 0.1, 0.9]
        ];
        
        const boostValues = oxum.boostAllocationEigen(boostMatrix);
        processedPersona.boostScore = boostValues[0] * 100;
      }

      const flowDynamics = hermes.resolveFlowDynamics({
        personaType: processedPersona.type,
        activityLevel: processedPersona.isOnline ? 0.8 : 0.2,
        systemLoad: 0.5
      });
      
      if (processedPersona.systemMetadata) {
        processedPersona.systemMetadata.flowScore = flowDynamics.flowScore;
      }

      orus.logSignalTransform('persona_process', {
        personaId: processedPersona.id,
        type: processedPersona.type,
        boostScore: processedPersona.boostScore || 0
      });

      return processedPersona;
    } catch (error) {
      console.error('Error processing persona:', error);
      return persona as PersonaProcessingResult;
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

  private requiresNeuralBoost(persona: UberPersona): boolean {
    if (!persona) return false;
    const isPremium = persona.isPremium === true;
    const useNeural = persona.systemMetadata?.statusFlags?.needsModeration === true ||
                    persona.systemMetadata?.personalityIndex !== undefined;
    return isPremium || useNeural;
  }
}

export const personaService = new PersonaService();
