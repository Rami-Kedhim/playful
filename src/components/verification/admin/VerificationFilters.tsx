
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';

interface VerificationFiltersProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export function VerificationFilters({
  onSearchChange,
  onStatusChange,
  onLevelChange,
  onDateRangeChange,
}: VerificationFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by username or email..."
            className="pl-9"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onLevelChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="enhanced">Enhanced</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DatePickerWithRange 
        onChange={onDateRangeChange}
      />
    </div>
  );
}
