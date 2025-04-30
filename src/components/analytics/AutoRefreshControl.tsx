
import React from 'react';
import { Timer, PauseCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AutoRefreshControlProps {
  isAutoRefreshEnabled: boolean;
  refreshInterval: number; // in seconds
  onToggleAutoRefresh: () => void;
  onChangeInterval: (interval: number) => void;
}

const AutoRefreshControl: React.FC<AutoRefreshControlProps> = ({
  isAutoRefreshEnabled,
  refreshInterval,
  onToggleAutoRefresh,
  onChangeInterval
}) => {
  const intervalOptions = [
    { value: 10, label: '10s' },
    { value: 30, label: '30s' },
    { value: 60, label: '1m' },
    { value: 300, label: '5m' },
    { value: 600, label: '10m' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2 border rounded-md p-2 bg-card">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleAutoRefresh}
          className="h-8"
        >
          {isAutoRefreshEnabled ? (
            <>
              <PauseCircle className="h-4 w-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Timer className="h-4 w-4 mr-2" />
              Auto-refresh
            </>
          )}
        </Button>

        {isAutoRefreshEnabled && (
          <Select
            value={String(refreshInterval)}
            onValueChange={(value) => onChangeInterval(Number(value))}
          >
            <SelectTrigger className="h-8 w-28">
              <SelectValue placeholder="Interval" />
            </SelectTrigger>
            <SelectContent>
              {intervalOptions.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default AutoRefreshControl;
