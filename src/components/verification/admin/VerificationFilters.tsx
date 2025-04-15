
import React from 'react';
import { Search, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';

interface VerificationFiltersProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string | null) => void;
  onLevelChange: (value: string | null) => void;
  onDateRangeChange: (range: { from: Date | null; to: Date | null }) => void;
}

const VerificationFilters = ({
  onSearchChange,
  onStatusChange,
  onLevelChange,
  onDateRangeChange
}: VerificationFiltersProps) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by user ID..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Select onValueChange={(value) => onStatusChange(value || null)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onLevelChange(value || null)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Levels</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
          </SelectContent>
        </Select>

        <DatePickerWithRange
          onChange={onDateRangeChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default VerificationFilters;
