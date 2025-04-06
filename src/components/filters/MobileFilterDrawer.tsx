
import React, { ReactNode } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import FilterActions from './filters/FilterActions';

interface MobileFilterDrawerProps {
  title?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onApply?: () => void;
  onClear?: () => void;
}

export function MobileFilterDrawer({
  title = "Filters",
  children,
  open,
  onOpenChange,
  onApply,
  onClear
}: MobileFilterDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] sm:h-[70vh] pt-6">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {children}
          </div>
          
          {(onApply || onClear) && (
            <div className="border-t pt-4 pb-2 sticky bottom-0 bg-background mt-auto">
              <FilterActions
                clearFilters={onClear || (() => {})}
                applyFilters={onApply || (() => {})}
              />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileFilterDrawer;
