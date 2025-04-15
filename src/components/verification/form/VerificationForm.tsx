
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { verificationFormSchema, VerificationFormValues, DOCUMENT_TYPES } from '@/types/verification';
import DocumentTypeSelect from './DocumentTypeSelect';
import DocumentImageUpload from './DocumentImageUpload';
import SubmitButton from './SubmitButton';

interface VerificationFormProps {
  onSubmit: (data: VerificationFormValues) => void;
  loading?: boolean;
  serviceType: 'escort' | 'creator' | 'livecam';
  onSubmissionComplete?: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ 
  onSubmit, 
  loading = false,
  serviceType,
  onSubmissionComplete
}) => {
  const [documentType, setDocumentType] = useState<string>(DOCUMENT_TYPES.ID_CARD);
  
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      documentType: DOCUMENT_TYPES.ID_CARD,
    }
  });
  
  const needsBackImage = documentType === DOCUMENT_TYPES.ID_CARD || 
                        documentType === DOCUMENT_TYPES.DRIVERS_LICENSE;
                         
  const getServiceSpecificMessage = () => {
    switch (serviceType) {
      case 'escort':
        return "For escort verification, please ensure your ID clearly shows your age as 18+ and matches your profile information.";
      case 'creator':
        return "Content creators must verify their identity to ensure compliance with content policies and age verification requirements.";
      case 'livecam':
        return "Livecam performers need to be verified to ensure they are eligible to perform on our platform.";
      default:
        return "Please upload your documents for verification.";
    }
  };

  const handleFormSubmit = async (data: VerificationFormValues) => {
    await onSubmit(data);
    if (onSubmissionComplete) {
      onSubmissionComplete();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="text-sm text-muted-foreground mb-6">
          {getServiceSpecificMessage()}
        </div>
        
        <div className="space-y-4">
          <DocumentTypeSelect form={form} />

          <Card>
            <CardContent className="pt-6">
              <DocumentImageUpload
                form={form}
                fieldName="documentFrontImage"
                label="Front of ID Document"
                description="Upload a clear photo of the front of your ID document. Max 5MB."
              />
            </CardContent>
          </Card>
          
          {needsBackImage && (
            <Card>
              <CardContent className="pt-6">
                <DocumentImageUpload
                  form={form}
                  fieldName="documentBackImage"
                  label="Back of ID Document (Optional for Passport)"
                  description="Upload a clear photo of the back of your ID document. Required for ID cards and driver's licenses."
                  optional={true}
                />
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardContent className="pt-6">
              <DocumentImageUpload
                form={form}
                fieldName="selfieImage"
                label="Selfie with Document"
                description="Upload a selfie of yourself holding your ID document next to your face. Your face and the ID must be clearly visible."
              />
            </CardContent>
          </Card>
        </div>
        
        <SubmitButton 
          loading={loading} 
          text="Submit Verification"
          loadingText="Submitting verification..."
        />
      </form>
    </Form>
  );
};

export default VerificationForm;
