
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxGroupProps {
  title: string;
  items: string[];
  selectedItems: string[];
  toggleItem: (item: string) => void;
  idPrefix: string;
}

const CheckboxGroup = ({ 
  title, 
  items, 
  selectedItems, 
  toggleItem, 
  idPrefix 
}: CheckboxGroupProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{title}</label>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={`${idPrefix}-${item}`}
              checked={selectedItems.includes(item)}
              onCheckedChange={() => toggleItem(item)}
            />
            <label 
              htmlFor={`${idPrefix}-${item}`}
              className="text-sm capitalize cursor-pointer"
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
