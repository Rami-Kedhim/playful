
export interface ModerateContentParams {
  content: string;
  contentType: string;
  context: Record<string, any>;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: number;
  action: string | (() => void);
}
