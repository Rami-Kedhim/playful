
import React, { ReactNode } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import FilterActions from '@/components/escorts/filters/FilterActions';

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bottom-0 top-auto h-[80vh] sm:h-[70vh] p-0 sm:max-w-full">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4 px-6">
            {children}
          </div>
          
          {(onApply || onClear) && (
            <div className="border-t pt-4 pb-2 px-6 sticky bottom-0 bg-background mt-auto">
              <FilterActions
                clearFilters={onClear || (() => {})}
                applyFilters={onApply || (() => {})}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MobileFilterDrawer;
