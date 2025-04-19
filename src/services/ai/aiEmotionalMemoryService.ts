import { EmotionalState } from "@/types/ai-personality";

interface EmotionalMemoryService {
  getEmotionalState(characterId: string): Promise<EmotionalState>;
  updateEmotionalState(characterId: string, newState: Partial<EmotionalState>): Promise<void>;
  resetEmotionalState(characterId: string): Promise<void>;
}

class InMemoryEmotionalMemoryService implements EmotionalMemoryService {
  private memory: { [characterId: string]: EmotionalState } = {};

  async getEmotionalState(characterId: string): Promise<EmotionalState> {
    if (!this.memory[characterId]) {
      this.memory[characterId] = {
        primary: "neutral",
        joy: 0.0,
        interest: 0.0,
        surprise: 0.0,
        sadness: 0.0,
        anger: 0.0,
        fear: 0.0,
        trust: 0.0,
        anticipation: 0.0,
        dominantEmotion: "neutral",
        intensity: 0.0,
        intensityLevel: 0,
        lastUpdated: new Date().toISOString(),
      };
    }
    return this.memory[characterId];
  }

  async updateEmotionalState(characterId: string, newState: Partial<EmotionalState>): Promise<void> {
    const currentState = await this.getEmotionalState(characterId);
    this.memory[characterId] = {
      ...currentState,
      ...newState,
      lastUpdated: new Date().toISOString(),
    };
  }

  async resetEmotionalState(characterId: string): Promise<void> {
    delete this.memory[characterId];
  }
}

// Example usage
async function example() {
  const memoryService = new InMemoryEmotionalMemoryService();

  // Get initial emotional state
  const initialState = await memoryService.getEmotionalState("character123");
  console.log("Initial State:", initialState);

  // Update emotional state
  await memoryService.updateEmotionalState("character123", {
    joy: 0.8,
    dominantEmotion: "joy",
    intensityLevel: 3,
  });

  // Get updated emotional state
  const updatedState = await memoryService.getEmotionalState("character123");
  console.log("Updated State:", updatedState);

  // Reset emotional state
  await memoryService.resetEmotionalState("character123");
  const resetState = await memoryService.getEmotionalState("character123");
  console.log("Reset State:", resetState);
}
