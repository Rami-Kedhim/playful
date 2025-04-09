
import React, { ReactNode } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="right-0 left-auto h-full max-w-[300px] sm:max-w-[350px] p-0"
        hideCloseButton
      >
        <DialogHeader className="px-6 pt-10 flex items-start justify-between">
          <DialogTitle>{title}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4 px-6">
            {children}
          </div>
          
          {(onApply || onClear) && (
            <div className="border-t pt-4 pb-2 px-6 sticky bottom-0 bg-background mt-auto">
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
      </DialogContent>
    </Dialog>
  );
}

export default FilterDrawer;
