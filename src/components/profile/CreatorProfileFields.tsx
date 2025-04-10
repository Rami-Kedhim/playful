
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface CreatorProfileFieldsProps {
  values: {
    subscriptionPrice?: number;
    contentCategories?: string[];
    socialLinks?: Record<string, string>;
    ppvEnabled?: boolean;
  };
  onChange: (field: string, value: any) => void;
}

const CreatorProfileFields: React.FC<CreatorProfileFieldsProps> = ({ 
  values, 
  onChange 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Creator Profile Details</h3>
      <Separator />
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="subscriptionPrice">Subscription Price ($)</Label>
          <Input 
            id="subscriptionPrice" 
            type="number" 
            value={values.subscriptionPrice || ''} 
            onChange={(e) => onChange('subscriptionPrice', parseFloat(e.target.value))} 
            placeholder="Monthly subscription price"
            className="mt-1"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="ppvEnabled" 
            checked={values.ppvEnabled || false}
            onCheckedChange={(checked) => onChange('ppvEnabled', checked)}
          />
          <Label htmlFor="ppvEnabled">Enable Pay-per-view Content</Label>
        </div>
        
        <div>
          <Label htmlFor="contentCategories">Content Categories</Label>
          <Select 
            value={values.contentCategories?.[0] || ''}
            onValueChange={(value) => onChange('contentCategories', [value])}
          >
            <SelectTrigger id="contentCategories" className="mt-1">
              <SelectValue placeholder="Select primary content category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="photos">Photos</SelectItem>
              <SelectItem value="videos">Videos</SelectItem>
              <SelectItem value="livestreams">Live Streams</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="texting">Text Chat</SelectItem>
              <SelectItem value="videocalls">Video Calls</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            Additional categories can be added in settings
          </p>
        </div>
        
        <div>
          <Label htmlFor="socialLinks">Social Media Links</Label>
          <div className="grid grid-cols-1 gap-4 mt-2">
            <div className="space-y-1">
              <Label htmlFor="instagram" className="text-xs">Instagram</Label>
              <Input 
                id="instagram" 
                value={values.socialLinks?.instagram || ''} 
                onChange={(e) => onChange('socialLinks', {
                  ...values.socialLinks,
                  instagram: e.target.value
                })} 
                placeholder="Instagram username"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="twitter" className="text-xs">Twitter</Label>
              <Input 
                id="twitter" 
                value={values.socialLinks?.twitter || ''} 
                onChange={(e) => onChange('socialLinks', {
                  ...values.socialLinks,
                  twitter: e.target.value
                })} 
                placeholder="Twitter username"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="onlyfans" className="text-xs">OnlyFans</Label>
              <Input 
                id="onlyfans" 
                value={values.socialLinks?.onlyfans || ''} 
                onChange={(e) => onChange('socialLinks', {
                  ...values.socialLinks,
                  onlyfans: e.target.value
                })} 
                placeholder="OnlyFans username"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfileFields;
