
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, XCircle } from 'lucide-react';
import { useBoostManager } from '@/hooks/boost';
import { formatDistanceToNow } from 'date-fns';
import { useBoostContext } from '@/hooks/boost/useBoostContext';

interface BoostSummaryPanelProps {
  profileId: string;
  onBoost?: () => void;
  onCancel?: () => void;
}

const BoostSummaryPanel: React.FC<BoostSummaryPanelProps> = ({ profileId, onBoost, onCancel }) => {
  const {
    boostStatus,
    hermesStatus,
    loading
  } = useBoostManager(profileId);
  
  // Get the boost context for accessing packages
  const boostContext = useBoostContext();
  
  const [remainingTime, setRemainingTime] = useState<string>('');
  
  useEffect(() => {
    if (boostStatus.isActive && boostStatus.expiresAt) {
      const expiresAt = new Date(boostStatus.expiresAt);
      
      const updateRemainingTime = () => {
        const now = new Date();
        if (expiresAt > now) {
          setRemainingTime(formatDistanceToNow(expiresAt, { addSuffix: true }));
        } else {
          setRemainingTime('Expired');
        }
      };
      
      updateRemainingTime();
      const interval = setInterval(updateRemainingTime, 60000);
      
      return () => clearInterval(interval);
    }
  }, [boostStatus.isActive, boostStatus.expiresAt]);
  
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-2">
            <div className="h-5 bg-muted-foreground/20 rounded w-1/3"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-2/3"></div>
            <div className="h-8 bg-muted-foreground/20 rounded w-full mt-4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (boostStatus.isActive) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 text-amber-500 mr-2" />
                Active Boost
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {boostStatus.packageName || 'Profile Boost'}
              </p>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span>{boostStatus.progress || 0}%</span>
              </div>
              <Progress value={boostStatus.progress || 0} className="h-2" />
            </div>
            
            {/* Time remaining */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Time Remaining:</span>
              </div>
              <span className="font-medium">
                {boostStatus.remainingTime || remainingTime}
              </span>
            </div>
            
            {/* Visibility stats */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-secondary/20 p-3 rounded-md text-center">
                <div className="text-sm text-muted-foreground">Position</div>
                <div className="text-xl font-semibold">#{hermesStatus.position}</div>
              </div>
              <div className="bg-secondary/20 p-3 rounded-md text-center">
                <div className="text-sm text-muted-foreground">Visibility</div>
                <div className="text-xl font-semibold">{hermesStatus.estimatedVisibility}%</div>
              </div>
            </div>
            
            {/* Cancel button */}
            <Button variant="outline" className="w-full" onClick={onCancel}>
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Boost
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Get available packages
  const packages = boostContext.packages || [];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Profile Visibility</CardTitle>
        <p className="text-sm text-muted-foreground">
          Boost your visibility in search results
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <div className="font-medium">Current Position</div>
              <div className="text-muted-foreground">Based on organic ranking</div>
            </div>
            <Badge variant="outline" className="text-lg font-bold px-3">
              #{hermesStatus.position || '—'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <div className="font-medium">Visibility Score</div>
              <div className="text-muted-foreground">Current search visibility</div>
            </div>
            <div className="text-lg font-bold">
              {hermesStatus.estimatedVisibility || 0}%
            </div>
          </div>
          
          <Button className="w-full" onClick={onBoost}>
            <Zap className="mr-2 h-4 w-4" />
            Boost Now
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            {packages.length > 0 ? 
              `${packages.length} boost packages available` : 
              'Boost packages will increase your visibility'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostSummaryPanel;
