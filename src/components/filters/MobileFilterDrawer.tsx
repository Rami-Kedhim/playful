
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MobileFilterDrawerProps {
  title: string;
  children: React.ReactNode;
  onApply?: () => void;
  onClear?: () => void;
  trigger?: React.ReactNode;
  filterCount?: number;
}

export function MobileFilterDrawer({
  title,
  children,
  onApply,
  onClear,
  trigger,
  filterCount = 0,
}: MobileFilterDrawerProps) {
  const [open, setOpen] = React.useState(false);
  
  const handleApply = () => {
    if (onApply) onApply();
    setOpen(false);
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden relative">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {filterCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {filterCount}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Open filter options</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] overflow-hidden flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>{title}</SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        
        <div className="py-4 overflow-auto flex-1">
          {children}
        </div>
        
        <div className="flex gap-2 pt-4 border-t sticky bottom-0 bg-background">
          {onClear && (
            <Button variant="outline" className="flex-1" onClick={onClear}>
              Clear All
            </Button>
          )}
          <Button className="flex-1" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
