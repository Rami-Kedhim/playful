
import React from 'react';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';

interface PrivacyConsentSectionProps {
  form: UseFormReturn<any>;
}

const PrivacyConsentSection = ({ form }: PrivacyConsentSectionProps) => {
  return (
    <FormField
      control={form.control}
      name="consentChecked"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <p className="text-sm text-muted-foreground">
              I consent to the processing of my personal data for identity verification purposes. 
              I understand that my data will be handled securely according to applicable privacy laws.
            </p>
          </div>
        </FormItem>
      )}
    />
  );
};

export default PrivacyConsentSection;
