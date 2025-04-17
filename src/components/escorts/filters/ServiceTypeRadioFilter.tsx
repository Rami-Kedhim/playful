
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ServiceTypeFilter } from '@/types/escort';
import { MapPin, Laptop, Users } from 'lucide-react';

interface ServiceTypeRadioFilterProps {
  value: ServiceTypeFilter;
  onChange: (value: ServiceTypeFilter) => void;
}

const ServiceTypeRadioFilter: React.FC<ServiceTypeRadioFilterProps> = ({ value, onChange }) => {
  return (
    <RadioGroup value={value} onValueChange={onChange as any} className="grid grid-cols-3 gap-2">
      <div className="flex flex-col items-center space-y-1 border rounded-md p-2 cursor-pointer hover:bg-secondary/20 transition-colors">
        <RadioGroupItem value="in-person" id="in-person" className="sr-only" />
        <Label htmlFor="in-person" className="cursor-pointer text-center flex flex-col items-center gap-1">
          <MapPin className="h-5 w-5 text-blue-500" />
          <span>In Person</span>
        </Label>
      </div>
      
      <div className="flex flex-col items-center space-y-1 border rounded-md p-2 cursor-pointer hover:bg-secondary/20 transition-colors">
        <RadioGroupItem value="virtual" id="virtual" className="sr-only" />
        <Label htmlFor="virtual" className="cursor-pointer text-center flex flex-col items-center gap-1">
          <Laptop className="h-5 w-5 text-purple-500" />
          <span>Virtual</span>
        </Label>
      </div>
      
      <div className="flex flex-col items-center space-y-1 border rounded-md p-2 cursor-pointer hover:bg-secondary/20 transition-colors">
        <RadioGroupItem value="both" id="both" className="sr-only" />
        <Label htmlFor="both" className="cursor-pointer text-center flex flex-col items-center gap-1">
          <Users className="h-5 w-5 text-green-500" />
          <span>Both</span>
        </Label>
      </div>
    </RadioGroup>
  );
};

export default ServiceTypeRadioFilter;
