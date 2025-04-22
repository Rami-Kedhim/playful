
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp } from "lucide-react";

export interface HermesBoostInfoProps {
  hermesStatus: {
    position: number;
    activeUsers: number;
    estimatedVisibility: number;
    lastUpdateTime: string;
  };
}

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ hermesStatus }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <Card>
          <CardContent className="pt-6">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">#{hermesStatus.position}</div>
            <p className="text-xs text-muted-foreground">Current Position</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{hermesStatus.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Badge className="mx-auto mb-2 bg-primary">
              {hermesStatus.estimatedVisibility}%
            </Badge>
            <div className="text-2xl font-bold">Visibility</div>
            <p className="text-xs text-muted-foreground">Estimated increase</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-xs text-center text-muted-foreground">
        <Clock className="inline h-3 w-3 mr-1" />
        Last updated: {new Date(hermesStatus.lastUpdateTime).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default HermesBoostInfo;
