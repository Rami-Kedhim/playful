
import React from 'react';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verificationFormSchema, VerificationFormValues } from '../utils/formUtils';
import { useVerification } from '@/hooks/verification/useVerification';
import VerificationCardWrapper from './VerificationCardWrapper';
import DocumentRequirements from './DocumentRequirements';
import FileUploadInstructions from './FileUploadInstructions';
import DocumentTypeSelect from './DocumentTypeSelect';
import DocumentImageUpload from './DocumentImageUpload';
import SubmitButton from './SubmitButton';
import SuccessCard from './SuccessCard';
import FormError from './FormError';

interface VerificationFormProps {
  onSubmissionComplete?: () => void;
}

const VerificationForm = ({ onSubmissionComplete }: VerificationFormProps) => {
  const { submitVerification, isSubmitting, verificationStatus } = useVerification();
  const [submitted, setSubmitted] = React.useState(false);
  const [formError, setFormError] = React.useState<string>("");
  
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      documentType: 'id_card',
      documentFrontImage: undefined,
      documentBackImage: undefined,
      selfieImage: undefined
    },
  });
  
  const onSubmit = async (data: VerificationFormValues) => {
    try {
      setFormError("");
      
      const success = await submitVerification({
        type: data.documentType,
        frontImage: data.documentFrontImage.file,
        backImage: data.documentBackImage?.file,
        selfieImage: data.selfieImage.file
      });
      
      if (success) {
        setSubmitted(true);
        if (onSubmissionComplete) {
          onSubmissionComplete();
        }
      }
    } catch (error) {
      setFormError("There was an error submitting your verification. Please try again.");
      console.error("Verification submission error:", error);
    }
  };
  
  if (submitted) {
    return <SuccessCard />;
  }
  
  return (
    <VerificationCardWrapper
      title="Identity Verification"
      description="Please upload clear photos of your government-issued ID and a selfie for verification"
    >
      <DocumentRequirements />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <DocumentTypeSelect form={form} />
          
          <DocumentImageUpload 
            form={form} 
            fieldName="documentFrontImage"
            label="Front of ID"
            description="Upload a clear photo of the front of your ID"
          />
          
          <DocumentImageUpload 
            form={form} 
            fieldName="documentBackImage"
            label="Back of ID (Optional for Passport)"
            description="Upload a clear photo of the back of your ID if applicable"
            optional
          />
          
          <DocumentImageUpload 
            form={form} 
            fieldName="selfieImage"
            label="Selfie with ID"
            description="Take a selfie holding your ID next to your face"
          />
          
          <FileUploadInstructions />
          
          <FormError message={formError} />
          
          <Separator />
          
          <div className="pt-2">
            <SubmitButton 
              loading={isSubmitting} 
              loadingText={verificationStatus === 'uploading' ? 'Uploading...' : 'Processing...'}
              text="Submit for Verification"
            />
            <p className="text-xs text-center text-muted-foreground mt-3">
              By submitting, you agree to our verification process and privacy policy
            </p>
          </div>
        </form>
      </Form>
    </VerificationCardWrapper>
  );
};

export default VerificationForm;
