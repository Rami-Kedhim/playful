interface CreatorAnalytics {
  someMetric?: number;
  // add id if needed
  id?: string;
}

export const defaultCreatorAnalytics: CreatorAnalytics = {
  someMetric: 0,
  id: 'default',
};

export async function fetchCreatorAnalytics(creatorId: string): Promise<CreatorAnalytics> {
  // Mock implementation
  return {
    someMetric: 42,
    id: creatorId,
  };
}
