
import React from 'react';
import { FormField, FormItem, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface PrivacyConsentSectionProps {
  form: any;
}

const PrivacyConsentSection: React.FC<PrivacyConsentSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="acceptTerms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormDescription>
              I agree that my personal data will be processed for verification purposes in accordance with the{' '}
              <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{' '}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default PrivacyConsentSection;
