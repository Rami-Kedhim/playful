
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';

interface PrivacyConsentSectionProps {
  form: any;
}

const PrivacyConsentSection: React.FC<PrivacyConsentSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="acceptTerms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox 
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-sm font-medium">
              I agree to the verification terms and privacy policy
            </FormLabel>
            <p className="text-xs text-muted-foreground">
              I consent to sharing my identification documents for verification purposes.
              I understand that my personal information will be processed in accordance with the Privacy Policy.
            </p>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default PrivacyConsentSection;
