
import React from 'react';
import { useBoostManager } from '@/hooks/boost';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BoostSummaryPanelProps {
  profileId: string;
  onManageBoost: () => void;
}

const BoostSummaryPanel: React.FC<BoostSummaryPanelProps> = ({ 
  profileId,
  onManageBoost
}) => {
  const boostManager = useBoostManager(profileId);
  
  // Destructure values from the hook
  const { boostStatus, hermesStatus, loading } = boostManager;
  
  // Function to format remaining time - fixed to handle string or number
  const formatRemainingTime = (timeValue?: string | number): string => {
    if (!timeValue) return '0h 0m';
    
    // Convert to seconds if it's a string that can be parsed to a number
    let seconds: number;
    if (typeof timeValue === 'string') {
      // Try to parse as a number first
      const parsedValue = parseInt(timeValue, 10);
      if (!isNaN(parsedValue)) {
        seconds = parsedValue;
      } else {
        // If it's a formatted string like "1h 30m", just return it
        return timeValue;
      }
    } else {
      seconds = timeValue;
    }
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Profile Boost
        </CardTitle>
        {boostStatus?.isActive && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-16">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          </div>
        ) : boostStatus?.isActive ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                <span className="font-medium">{boostStatus?.packageName || 'Boost'}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                  {formatRemainingTime(boostStatus?.remainingTime)}
                </span>
              </div>
            </div>
            
            <div className="text-sm">
              <p className="text-muted-foreground">
                Your profile is boosted and receiving enhanced visibility.
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={onManageBoost} 
              className="w-full"
              size="sm"
            >
              Manage Boost
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Your profile is currently not boosted. Increase visibility with a boost!
            </p>
            
            <Button 
              onClick={onManageBoost}
              className="w-full"
              size="sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Boost Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostSummaryPanel;
