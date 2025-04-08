
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface BoostQueueCardProps {
  isFairRotationEnabled: boolean;
  setIsFairRotationEnabled: (value: boolean) => void;
}

const BoostQueueCard: React.FC<BoostQueueCardProps> = ({ 
  isFairRotationEnabled, 
  setIsFairRotationEnabled 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Boost Queue Size
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">243</div>
          <Badge variant="outline">Active</Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          96 AI models, 147 real escorts in queue
        </p>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="fair-rotation" 
              checked={isFairRotationEnabled} 
              onCheckedChange={setIsFairRotationEnabled} 
            />
            <Label htmlFor="fair-rotation">Fair rotation enabled</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostQueueCard;
