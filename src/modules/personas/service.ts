
import { UberPersona } from '@/types/UberPersona';
import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { orus } from '@/core/Orus';

interface PersonaProcessingResult extends UberPersona {
  systemMetadata?: {
    source: string;
    lastSynced: Date;
    tagsGeneratedByAI: boolean;
    hilbertSpaceVector: number[];
    flowScore?: number;
  };
  boostScore?: number;
}

export class PersonaService {
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
      
      // Get flow dynamics with proper parameter structure
      const flowDynamics = hermes.resolveFlowDynamics({
        systemLoad: 0.5,
        activityLevel: processedPersona.isOnline ? 0.8 : 0.2,
        personaType: processedPersona.type
      });
      
      if (processedPersona.systemMetadata) {
        processedPersona.systemMetadata.flowScore = flowDynamics.flowScore;
      }

      return processedPersona;
    } catch (error) {
      console.error('Error processing persona:', error);
      return persona as PersonaProcessingResult;
    }
  }
}

export const personaService = new PersonaService();
