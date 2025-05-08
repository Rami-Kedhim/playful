/**
 * Core Systems Types - Shared types for core platform functionalities
 */

export interface RecommendedAction {
  id: string;
  title: string;
  description?: string;
  priority: number;
  action: string | (() => void);
  type?: string;
  dismissible?: boolean;
  expiresAt?: Date;
}

// Add AnalyticsData type for boostService
export interface AnalyticsData {
  impressions: number;
  clicks: number;
  conversion: number;
  position: number;
  additionalViews?: number;
}
