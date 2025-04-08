
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TimeImpactCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Time-Based Impact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">78%</div>
          <Badge className="bg-green-500">Peak Time</Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Current time-of-day visibility multiplier
        </p>
        <div className="mt-4">
          <Label className="text-xs">Peak hours adjustment</Label>
          <Input type="time" className="mt-1" defaultValue="20:00" />
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeImpactCard;
