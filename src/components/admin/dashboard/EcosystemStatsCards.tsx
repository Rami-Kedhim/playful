
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const EcosystemStatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Total AI Models
          </CardTitle>
          <CardDescription>Active profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,854</div>
          <p className="text-xs text-muted-foreground">
            +12% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Verified Escorts
          </CardTitle>
          <CardDescription>Active profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">743</div>
          <p className="text-xs text-muted-foreground">
            +5% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Conversion Rate
          </CardTitle>
          <CardDescription>AI to real bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">14.3%</div>
          <p className="text-xs text-muted-foreground">
            +2.5% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Monthly Revenue
          </CardTitle>
          <CardDescription>Combined ecosystem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$421,354</div>
          <p className="text-xs text-muted-foreground">
            +18% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EcosystemStatsCards;
