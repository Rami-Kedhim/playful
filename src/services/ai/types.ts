
export interface OxumLearningService {
  initialize: () => Promise<boolean>;
  processInput: (input: string, context?: any) => Promise<string>;
  getLearnedPatterns: () => Promise<string[]>;
  version: string;
  ready: boolean;
}
