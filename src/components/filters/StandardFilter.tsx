
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FilterBlock, FilterSection } from "@/components/ui/filter-block";
import { FilterBadge } from "./FilterBadge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface FilterOption {
  id: string;
  label: string;
  group?: string;
}

interface StandardFilterProps {
  title: string;
  description?: string;
  selectedOptions: string[];
  options: FilterOption[];
  onToggleOption: (id: string) => void;
  onClearAll: () => void;
  showClearButton?: boolean;
  renderExtraFields?: () => React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export function StandardFilter({
  title,
  description,
  selectedOptions,
  options,
  onToggleOption,
  onClearAll,
  showClearButton = true,
  renderExtraFields,
  className,
  collapsible = false,
  defaultCollapsed = false,
}: StandardFilterProps) {
  // Group options by their group property
  const groupedOptions = options.reduce((acc, option) => {
    const group = option.group || 'default';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {} as Record<string, FilterOption[]>);

  const hasSelectedOptions = selectedOptions.length > 0;

  const headerExtra = showClearButton && hasSelectedOptions ? (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClearAll}
      className="h-8 px-2 text-xs"
    >
      Clear
    </Button>
  ) : null;

  return (
    <FilterBlock 
      title={title} 
      description={description}
      className={className}
      headerClassName="flex flex-row items-start justify-between"
      headerExtra={headerExtra}
      collapsible={collapsible}
      defaultCollapsed={defaultCollapsed}
    >
      <div className="space-y-4">
        {Object.entries(groupedOptions).map(([group, groupOptions]) => (
          <FilterSection 
            key={group} 
            title={group !== 'default' ? group : ''}
            className={group !== 'default' ? 'mt-4' : 'mt-0'}
          >
            <div className="flex flex-wrap gap-2 mt-2">
              {groupOptions.map((option) => (
                <TooltipProvider key={option.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        key={option.id}
                        variant={selectedOptions.includes(option.id) ? "default" : "outline"}
                        className="cursor-pointer transition-colors hover:bg-accent"
                        onClick={() => onToggleOption(option.id)}
                      >
                        {option.label}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{selectedOptions.includes(option.id) ? "Remove" : "Add"} {option.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </FilterSection>
        ))}

        {renderExtraFields && (
          <div className="mt-4 pt-4 border-t border-border">
            {renderExtraFields()}
          </div>
        )}
      </div>
    </FilterBlock>
  );
}

export function AppliedFilterBadges({
  selectedOptions,
  options,
  onToggleOption,
  onClearAll,
  className,
}: {
  selectedOptions: string[];
  options: FilterOption[];
  onToggleOption: (id: string) => void;
  onClearAll: () => void;
  className?: string;
}) {
  if (selectedOptions.length === 0) return null;
  
  // Map selected option IDs to their labels
  const selectedLabels = options.reduce((acc, option) => {
    if (selectedOptions.includes(option.id)) {
      acc[option.id] = option.label;
    }
    return acc;
  }, {} as Record<string, string>);
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {selectedOptions.map(id => (
        <FilterBadge
          key={id}
          label={selectedLabels[id]}
          onRemove={() => onToggleOption(id)}
        />
      ))}
      
      {selectedOptions.length > 1 && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearAll}
          className="h-8 ml-auto text-xs"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
