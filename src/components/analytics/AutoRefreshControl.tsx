
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Pause } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AutoRefreshControlProps {
  isPaused?: boolean;
  onPauseToggle?: () => void;
  interval: number;
  onIntervalChange: (interval: number) => void;
  onRefresh?: () => void;
  isEnabled?: boolean;
  toggleAutoRefresh?: () => void;
  refreshInterval?: number;
  onToggle?: () => void;
  onChangeInterval?: (interval: number) => void;
}

const AutoRefreshControl: React.FC<AutoRefreshControlProps> = ({
  interval,
  onIntervalChange,
  onRefresh,
  isPaused = false, 
  onPauseToggle,
  isEnabled, // Added for compatibility
  refreshInterval, // Added for compatibility
  onToggle, // Added for compatibility
  onChangeInterval // Added for compatibility
}) => {
  // Use either the new or old prop names, preferring the new ones
  const actualInterval = refreshInterval || interval;
  const actualOnToggle = onToggle || onPauseToggle;
  const actualIsPaused = isPaused !== undefined ? isPaused : !isEnabled;
  const actualOnIntervalChange = onChangeInterval || onIntervalChange;
  
  const [countdown, setCountdown] = useState(actualInterval / 1000);
  
  // Handle interval changes
  useEffect(() => {
    setCountdown(actualInterval / 1000);
  }, [actualInterval]);
  
  // Countdown timer
  useEffect(() => {
    if (actualIsPaused) return;
    
    let timer: number;
    if (countdown > 0) {
      timer = window.setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setCountdown(actualInterval / 1000);
      if (onRefresh) {
        onRefresh();
      }
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, actualInterval, actualIsPaused, onRefresh]);
  
  const handleManualRefresh = () => {
    setCountdown(actualInterval / 1000);
    if (onRefresh) {
      onRefresh();
    }
  };
  
  const togglePause = () => {
    if (actualOnToggle) {
      actualOnToggle();
    }
  };
  
  return (
    <div className="flex items-center space-x-2 bg-muted/30 rounded-md px-2 py-1">
      <Select
        value={actualInterval.toString()}
        onValueChange={(value) => actualOnIntervalChange(parseInt(value))}
      >
        <SelectTrigger className="w-[130px] h-8">
          <SelectValue placeholder="Refresh Rate" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5000">5 seconds</SelectItem>
          <SelectItem value="15000">15 seconds</SelectItem>
          <SelectItem value="30000">30 seconds</SelectItem>
          <SelectItem value="60000">1 minute</SelectItem>
          <SelectItem value="300000">5 minutes</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="text-xs text-muted-foreground">
        {actualIsPaused ? 'Paused' : `Refreshing in ${countdown}s`}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePause}
        className="h-8 w-8"
      >
        {actualIsPaused ? <RefreshCcw className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={handleManualRefresh}
        className="h-8 w-8"
      >
        <RefreshCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AutoRefreshControl;
