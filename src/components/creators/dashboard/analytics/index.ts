
import { ReactNode } from 'react';

// Export interface needed by BoostAnalytics.tsx
export interface AnalyticsHeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export { default as AnalyticsHeader } from './AnalyticsHeader';
export { default as AnalyticsStats } from './AnalyticsStats';
export { default as AnalyticsCharts } from './AnalyticsCharts';
export { default as AnalyticsSummary } from './AnalyticsSummary';
