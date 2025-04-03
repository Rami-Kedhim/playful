
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxGroupProps {
  title?: string;
  items?: string[];
  selectedItems?: string[];
  toggleItem?: (item: string) => void;
  idPrefix?: string;
  formatItem?: (item: string) => string;
  // For backward compatibility
  options?: string[];
  selectedOptions?: string[];
  toggleOption?: (item: string) => void;
  formatOption?: (option: string) => string;
}

const CheckboxGroup = ({ 
  title, 
  items = [], 
  selectedItems = [], 
  toggleItem = () => {}, 
  idPrefix = "checkbox", 
  formatItem = (item) => item,
  // For backward compatibility
  options = [],
  selectedOptions = [],
  toggleOption = () => {},
  formatOption = (option) => option
}: CheckboxGroupProps) => {
  // Use either items or options array
  const dataItems = items.length > 0 ? items : options.length > 0 ? options : [];
  // Use either selectedItems or selectedOptions array
  const selectedDataItems = selectedItems.length > 0 ? selectedItems : selectedOptions;
  // Use either toggleItem or toggleOption function
  const toggleFunction = toggleItem !== (() => {}) ? toggleItem : toggleOption;
  // Use either formatItem or formatOption function
  const formatFunction = formatItem !== ((item: string) => item) ? formatItem : formatOption;
  
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
              {formatFunction(item)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
