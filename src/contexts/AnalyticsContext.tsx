
import React, { createContext, useContext, ReactNode } from 'react';

interface AnalyticsContextType {
  trackPageView: (page: string) => void;
  trackEvent: (category: string, action: string, label?: string, value?: number) => void;
  trackConversion: (type: string, value: number) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const analyticsValue: AnalyticsContextType = {
    trackPageView: (page) => {
      console.log(`Analytics: Page view - ${page}`);
    },
    trackEvent: (category, action, label, value) => {
      console.log(`Analytics: Event - ${category} / ${action} / ${label || ''} / ${value || ''}`);
    },
    trackConversion: (type, value) => {
      console.log(`Analytics: Conversion - ${type} / ${value}`);
    }
  };

  return (
    <AnalyticsContext.Provider value={analyticsValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}
