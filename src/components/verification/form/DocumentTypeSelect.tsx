
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDocumentTypeLabel } from '@/utils/verification';

interface DocumentTypeSelectProps {
  form: any;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="documentType"
      rules={{ required: "Document type is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Document Type</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="id_card">{getDocumentTypeLabel('id_card')}</SelectItem>
              <SelectItem value="passport">{getDocumentTypeLabel('passport')}</SelectItem>
              <SelectItem value="drivers_license">{getDocumentTypeLabel('drivers_license')}</SelectItem>
              <SelectItem value="residence_permit">{getDocumentTypeLabel('residence_permit')}</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            Choose the type of identification document you wish to submit
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
