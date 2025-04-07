
import React from "react";
import { LivecamsFilter } from "@/types/livecams";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LivecamFiltersProps {
  filters: LivecamsFilter;
  onFilterChange: (filters: Partial<LivecamsFilter>) => void;
}

const COUNTRIES = [
  { value: "all", label: "All Countries" }, // Changed from empty string to "all"
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "UK", label: "United Kingdom" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "ES", label: "Spain" },
  { value: "IT", label: "Italy" },
  { value: "AU", label: "Australia" },
  { value: "BR", label: "Brazil" },
  { value: "CO", label: "Colombia" },
];

const CATEGORIES = [
  { value: "all", label: "All Categories" }, // Changed from empty string to "all"
  { value: "chat", label: "Chat" },
  { value: "dance", label: "Dance" },
  { value: "games", label: "Games" },
  { value: "music", label: "Music" },
];

const LIMITS = [
  { value: "24", label: "24 per page" },
  { value: "36", label: "36 per page" },
  { value: "48", label: "48 per page" },
];

const LivecamFilters: React.FC<LivecamFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Select
            value={filters.country || "all"} // Changed from empty string to "all"
            onValueChange={(value) => onFilterChange({ country: value === "all" ? undefined : value })}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={filters.category || "all"} // Changed from empty string to "all"
            onValueChange={(value) => onFilterChange({ category: value === "all" ? undefined : value })}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="limit">Show</Label>
          <Select
            value={String(filters.limit || 24)}
            onValueChange={(value) => onFilterChange({ limit: parseInt(value) })}
          >
            <SelectTrigger id="limit">
              <SelectValue placeholder="24 per page" />
            </SelectTrigger>
            <SelectContent>
              {LIMITS.map((limit) => (
                <SelectItem key={limit.value} value={limit.value}>
                  {limit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default LivecamFilters;
