
import React, { ReactNode } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterDrawerProps {
  title?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onApply?: () => void;
  onClear?: () => void;
}

export function FilterDrawer({
  title = "Filters",
  children,
  open,
  onOpenChange,
  onApply,
  onClear
}: FilterDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] pt-10 flex flex-col">
        <SheetHeader className="mb-6 flex items-start justify-between">
          <SheetTitle>{title}</SheetTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {children}
          </div>
          
          {(onApply || onClear) && (
            <div className="border-t pt-4 pb-2 sticky bottom-0 bg-background mt-auto">
              <div className="flex gap-2">
                {onClear && (
                  <Button 
                    variant="outline" 
                    onClick={onClear}
                    className="w-full"
                  >
                    Clear
                  </Button>
                )}
                
                {onApply && (
                  <Button 
                    onClick={onApply}
                    className="w-full"
                  >
                    Apply
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default FilterDrawer;
