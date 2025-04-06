
import React from "react";
import { Button } from "@/components/ui/button";
import { FilterBadge } from "./FilterBadge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface FilterItem {
  id: string;
  label: string;
  group?: string;
}

interface AppliedFiltersProps {
  filters: FilterItem[];
  onRemoveFilter: (id: string) => void;
  onClearAll: () => void;
  className?: string;
  showClearButton?: boolean;
}

export function AppliedFilters({
  filters,
  onRemoveFilter,
  onClearAll,
  className,
  showClearButton = true
}: AppliedFiltersProps) {
  if (filters.length === 0) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex flex-wrap gap-2 items-center py-2", className)}
    >
      <AnimatePresence>
        {filters.map((filter) => (
          <motion.div
            key={filter.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <FilterBadge
              label={filter.label}
              onRemove={() => onRemoveFilter(filter.id)}
            />
          </motion.div>
        ))}
        
        {showClearButton && filters.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearAll}
              className="h-8 text-xs ml-auto whitespace-nowrap"
            >
              Clear all
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
