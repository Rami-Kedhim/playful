
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
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
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel className="text-sm font-normal">
            I consent to the processing of my verification documents according to the privacy policy
          </FormLabel>
        </FormItem>
      )}
    />
  );
};

export default PrivacyConsentSection;
