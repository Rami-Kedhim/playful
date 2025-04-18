
export interface OxumLearningService {
  initialize: () => Promise<boolean>;
  processInput: (input: string, options?: any) => Promise<any>;
  getLearnedPatterns: () => Promise<any[]>;
}
