import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface AnalyticsHeaderProps {
  title?: string;
  description?: string;
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ 
  title = 'Analytics', 
  description = 'View your performance metrics'
}) => {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

export const AnalyticsStats: React.FC<any> = ({ children }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
};

export const AnalyticsCharts: React.FC<any> = ({ children }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {children}
    </div>
  );
};

export const AnalyticsSummary: React.FC<any> = ({ children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        <CardDescription>Overview of your key metrics</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
