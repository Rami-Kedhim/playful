
import React from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface PrivacyConsentSectionProps {
  form: any;
}

const PrivacyConsentSection: React.FC<PrivacyConsentSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="acceptTerms"
      rules={{ required: "You must accept the privacy terms to proceed" }}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <Checkbox
            id="acceptTerms"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <div className="space-y-1 leading-none">
            <FormLabel htmlFor="acceptTerms">
              I accept the privacy terms and conditions
            </FormLabel>
            <FormDescription>
              By checking this box, you acknowledge that your documents will be securely processed for
              verification purposes. Your data is encrypted and protected in accordance with our privacy policy.
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default PrivacyConsentSection;
