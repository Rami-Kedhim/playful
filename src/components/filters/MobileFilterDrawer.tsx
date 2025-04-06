
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, X } from "lucide-react";

interface MobileFilterDrawerProps {
  title: string;
  children: React.ReactNode;
  onApply?: () => void;
  onClear?: () => void;
  trigger?: React.ReactNode;
}

export function MobileFilterDrawer({
  title,
  children,
  onApply,
  onClear,
  trigger,
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
          <Button variant="outline" size="sm" className="md:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>{title}</SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        
        <div className="py-4 overflow-auto flex-1">
          {children}
        </div>
        
        <div className="flex gap-2 pt-4 border-t">
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
