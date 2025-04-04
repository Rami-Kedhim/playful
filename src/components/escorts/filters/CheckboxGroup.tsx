
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CheckboxGroupProps {
  title?: string;
  items: string[];
  selectedItems: string[];
  toggleItem: (item: string) => void;
  formatItem?: (item: string) => string;
  maxHeight?: number;
  idPrefix: string;
}

const CheckboxGroup = ({
  title,
  items,
  selectedItems,
  toggleItem,
  formatItem = (item) => item,
  maxHeight = 200,
  idPrefix
}: CheckboxGroupProps) => {
  return (
    <div className="space-y-2">
      {title && <h4 className="text-sm font-medium">{title}</h4>}
      
      <ScrollArea className={`h-[${maxHeight}px] pr-4`}>
        <div className="space-y-2">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={`${idPrefix}-${item}`}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => toggleItem(item)}
                />
                <Label
                  htmlFor={`${idPrefix}-${item}`}
                  className="text-sm cursor-pointer"
                >
                  {formatItem(item)}
                </Label>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No items available</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CheckboxGroup;
