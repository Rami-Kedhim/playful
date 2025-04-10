
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface EscortProfileFieldsProps {
  values: {
    hourlyRate?: number;
    services?: string[];
    availability?: Record<string, any>;
    measurements?: Record<string, any>;
    languages?: string[];
  };
  onChange: (field: string, value: any) => void;
}

const EscortProfileFields: React.FC<EscortProfileFieldsProps> = ({ 
  values, 
  onChange 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Escort Profile Details</h3>
      <Separator />
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
          <Input 
            id="hourlyRate" 
            type="number" 
            value={values.hourlyRate || ''} 
            onChange={(e) => onChange('hourlyRate', parseFloat(e.target.value))} 
            placeholder="Your hourly rate"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="languages">Languages</Label>
          <Select 
            value={values.languages?.[0] || ''}
            onValueChange={(value) => onChange('languages', [value])}
          >
            <SelectTrigger id="languages" className="mt-1">
              <SelectValue placeholder="Select primary language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="russian">Russian</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            Additional languages can be added in settings
          </p>
        </div>
        
        <div>
          <Label htmlFor="availability">Availability</Label>
          <Textarea 
            id="availability" 
            value={JSON.stringify(values.availability || {}, null, 2)} 
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                onChange('availability', parsed);
              } catch (error) {
                // Handle parsing error silently
              }
            }} 
            placeholder="Enter your availability"
            className="mt-1 font-mono text-sm"
            rows={5}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter your availability in JSON format or use the calendar in settings
          </p>
        </div>
        
        <div>
          <Label htmlFor="services">Services Offered</Label>
          <Textarea 
            id="services" 
            value={values.services ? values.services.join(', ') : ''} 
            onChange={(e) => onChange('services', e.target.value.split(',').map(s => s.trim()))} 
            placeholder="Service 1, Service 2, etc."
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default EscortProfileFields;
