
import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface DateRangeFilterProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  onRefresh: () => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onDateChange,
  onRefresh
}) => {
  const [isStartDateOpen, setIsStartDateOpen] = React.useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = React.useState(false);

  const handleStartDateSelect = (date: Date | undefined) => {
    onDateChange(date, endDate);
    setIsStartDateOpen(false);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    onDateChange(startDate, date);
    setIsEndDateOpen(false);
  };

  const handleResetDates = () => {
    onDateChange(undefined, undefined);
    onRefresh();
  };

  const formatDisplayDate = (date: Date | undefined) => {
    return date ? format(date, 'MMM dd, yyyy') : 'Select date';
  };

  const isFilterActive = !!(startDate || endDate);

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex items-center gap-2 border rounded-md p-2 bg-card">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground mr-2">Date Range:</span>
        
        <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className={`h-8 ${startDate ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {formatDisplayDate(startDate)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={startDate}
              onSelect={handleStartDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <span className="text-muted-foreground">to</span>
        
        <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className={`h-8 ${endDate ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {formatDisplayDate(endDate)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={endDate}
              onSelect={handleEndDateSelect}
              initialFocus
              disabled={(date) => startDate ? date < startDate : false}
            />
          </PopoverContent>
        </Popover>
        
        {isFilterActive && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResetDates}
            className="h-8 px-2"
          >
            Reset
          </Button>
        )}
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onRefresh}
        className="h-8"
      >
        Refresh
      </Button>
    </div>
  );
};

export default DateRangeFilter;
