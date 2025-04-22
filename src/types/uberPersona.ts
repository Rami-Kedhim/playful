
export interface UberPersona {
    id: string;
    name: string;
    type: string;
    personality: string;
    traits: string[];
    interests: string[];
    mood: string;
    energyLevel: number;
    rating?: number;
}

export interface UberCompanion extends UberPersona {
    relationship: string;
    affection: number;
    lastInteraction?: Date;
}

export interface UberAssistant extends UberPersona {
    expertise: string[];
    efficiency: number;
    taskCompletion: number;
}
