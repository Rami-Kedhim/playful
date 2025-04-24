
import React from 'react';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface PrivacyConsentSectionProps {
  form: UseFormReturn<any>;
}

const PrivacyConsentSection: React.FC<PrivacyConsentSectionProps> = ({ form }) => {
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
            <FormLabel>
              I consent to the storage and processing of my personal data for verification purposes
            </FormLabel>
            <p className="text-sm text-muted-foreground">
              By checking this box, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PrivacyConsentSection;
