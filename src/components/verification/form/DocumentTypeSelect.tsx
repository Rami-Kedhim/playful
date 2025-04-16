
import React from 'react';
import { Controller } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { VerificationFormValues, DOCUMENT_TYPES } from '@/types/verification';

interface DocumentTypeSelectProps {
  form: UseFormReturn<VerificationFormValues>;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ form }) => {
  return (
    <div>
      <Label>Document Type</Label>
      <Controller
        name="documentType"
        control={form.control}
        render={({ field }) => (
          <RadioGroup 
            value={field.value} 
            onValueChange={field.onChange}
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="id_card" id="id_card" />
              <Label htmlFor="id_card">ID Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="passport" id="passport" />
              <Label htmlFor="passport">Passport</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="driving_license" id="drivers_license" />
              <Label htmlFor="drivers_license">Driver's License</Label>
            </div>
          </RadioGroup>
        )}
      />
      {form.formState.errors.documentType && (
        <p className="text-red-500 text-xs mt-1">{form.formState.errors.documentType.message}</p>
      )}
    </div>
  );
};

export default DocumentTypeSelect;
