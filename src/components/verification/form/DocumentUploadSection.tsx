
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getRequiredFiles } from '../utils/documentTypeHelper';
import { Upload, FileCheck } from 'lucide-react';

interface DocumentUploadSectionProps {
  form: any;
  documentType: string;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({ form, documentType }) => {
  const requiredFiles = documentType ? getRequiredFiles(documentType) : [];

  const renderFileUpload = (fieldName: string, label: string, accept = "image/*,application/pdf") => (
    <FormField
      key={fieldName}
      control={form.control}
      name={fieldName}
      render={({ field: { onChange, value, ...fieldProps } }) => {
        // Check if we have a file selected
        const hasFile = form.getValues(fieldName) instanceof File;

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Card className={`relative ${hasFile ? 'border-green-500 bg-green-50' : ''}`}>
                <CardContent className="p-2 flex items-center justify-center">
                  <div className="w-full h-32 flex flex-col items-center justify-center cursor-pointer relative">
                    {hasFile ? (
                      <>
                        <FileCheck className="h-10 w-10 text-green-500 mb-2" />
                        <p className="text-sm text-green-700">File selected</p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Upload {label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          JPEG, PNG or PDF (max 5MB)
                        </p>
                      </>
                    )}
                    <Input
                      type="file"
                      accept={accept}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        onChange(file);
                      }}
                      {...fieldProps}
                    />
                  </div>
                </CardContent>
              </Card>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );

  if (!documentType || requiredFiles.length === 0) {
    return <p className="text-sm text-muted-foreground">Please select a document type first</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Required Documents</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        {requiredFiles.includes('front') && 
          renderFileUpload('documentFile', 'Front of Document')}
          
        {requiredFiles.includes('back') && 
          renderFileUpload('backFile', 'Back of Document')}
          
        {requiredFiles.includes('data_page') && 
          renderFileUpload('documentFile', 'Passport Data Page')}
          
        {requiredFiles.includes('selfie') && 
          renderFileUpload('selfieFile', 'Selfie with Document')}
      </div>
    </div>
  );
};

export default DocumentUploadSection;
