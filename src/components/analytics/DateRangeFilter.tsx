
import React from 'react';
import { Calendar as CalendarIcon, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateRangeFilterProps {
  startDate?: Date;
  endDate?: Date;
  onDateChange: (start: Date | undefined, end: Date | undefined) => void;
  onRefresh?: () => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ 
  startDate, 
  endDate, 
  onDateChange,
  onRefresh
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>(
    startDate && endDate ? { from: startDate, to: endDate } : undefined
  );

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range);
    onDateChange(range?.from, range?.to);
  };

  // Helper function to reset the date filter
  const resetDateFilter = () => {
    setDate(undefined);
    onDateChange(undefined, undefined);
  };

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={date ? "bg-muted/50" : ""}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM d")} - {format(date.to, "MMM d, yyyy")}
                </>
              ) : (
                format(date.from, "MMMM d, yyyy")
              )
            ) : (
              "Date Range"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            className="p-3 pointer-events-auto"
          />
          <div className="flex justify-end p-3 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetDateFilter}
              disabled={!date}
            >
              Reset
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      {onRefresh && (
        <Button onClick={onRefresh} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      )}
    </div>
  );
};

export default DateRangeFilter;
