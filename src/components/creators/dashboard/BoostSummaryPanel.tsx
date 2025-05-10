
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBoostStatus } from '@/hooks/boost';

interface BoostSummaryPanelProps {
  profileId: string;
}

const BoostSummaryPanel: React.FC<BoostSummaryPanelProps> = ({ profileId }) => {
  const { boostStatus, loading, error, fetchBoostStatus, applyBoost } = useBoostStatus(profileId);

  const formatRemainingTime = (timeString?: string) => {
    if (!timeString) return "N/A";
    
    // Simple formatting, could be enhanced
    return timeString;
  };

  // Added placeholder for hermesStatus since it doesn't exist in useBoostStatus
  const hermesStatus = {
    score: 0,
    position: 0,
    estimatedVisibility: 0,
    recommendations: []
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Boost Status</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : boostStatus?.isActive ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium text-green-500">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Package:</span>
              <span className="font-medium">{boostStatus.packageName || 'Standard Boost'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expires in:</span>
              <span className="font-medium">{formatRemainingTime(boostStatus.timeRemaining)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Visibility Score:</span>
              <span className="font-medium">{hermesStatus.score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${boostStatus.progress || 0}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="mb-2">No active boost</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostSummaryPanel;
