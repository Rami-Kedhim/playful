
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxGroupProps {
  title?: string;
  options?: string[];
  items?: string[];
  selectedOptions?: string[];
  selectedItems?: string[];
  toggleOption?: (item: string) => void;
  toggleItem?: (item: string) => void;
  idPrefix?: string;
  formatOption?: (option: string) => string;
}

const CheckboxGroup = ({ 
  title, 
  options = [], 
  items = [], 
  selectedOptions = [], 
  selectedItems = [], 
  toggleOption = () => {}, 
  toggleItem = () => {}, 
  idPrefix = "checkbox", 
  formatOption = (option) => option
}: CheckboxGroupProps) => {
  // Use either options or items array
  const dataItems = options.length > 0 ? options : items;
  // Use either selectedOptions or selectedItems array
  const selectedDataItems = selectedOptions.length > 0 ? selectedOptions : selectedItems;
  // Use either toggleOption or toggleItem function
  const toggleFunction = toggleOption || toggleItem;
  
  return (
    <div className="space-y-2">
      {title && <label className="text-sm font-medium">{title}</label>}
      <div className="grid grid-cols-2 gap-2">
        {dataItems.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={`${idPrefix}-${item}`}
              checked={selectedDataItems.includes(item)}
              onCheckedChange={() => toggleFunction(item)}
            />
            <label 
              htmlFor={`${idPrefix}-${item}`}
              className="text-sm capitalize cursor-pointer"
            >
              {formatOption(item)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
