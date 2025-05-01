import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import DocumentTypeSelect from './form/DocumentTypeSelect';
import DocumentUploadSection from './form/DocumentUploadSection';
import PrivacyConsentSection from './form/PrivacyConsentSection';
import SubmitButton from './form/SubmitButton';
import SubmissionAlert from './form/SubmissionAlert';
import SuccessCard from './form/SuccessCard';
import { useAuth } from '@/hooks/auth';
import { uploadDocumentFile, validateFile } from '@/utils/verification/documentUpload';
import { submitVerificationRequest } from '@/utils/verification';
import { toast } from '@/components/ui/use-toast';

interface VerificationFormProps {
  onSubmissionComplete?: () => void;
  serviceType?: 'escort' | 'client' | 'general';
  loading?: boolean;
  onSubmit?: (data: any) => Promise<boolean> | void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  onSubmissionComplete,
  serviceType = 'general',
  loading: externalLoading = false,
  onSubmit
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  const form = useForm({
    defaultValues: {
      documentType: '',
      frontFile: undefined as unknown as File,
      backFile: undefined as unknown as File,
      selfieFile: undefined as unknown as File,
      acceptTerms: false,
    },
  });

  const handleSubmit = async (data: any) => {
    if (!user?.id) {
      setSubmissionError('You must be logged in to submit verification documents');
      return;
    }

    setLoading(true);
    setSubmissionError(null);

    try {
      // If an external onSubmit handler is provided, use it
      if (onSubmit) {
        const result = await onSubmit(data);
        if (result === false) {
          throw new Error('Submission failed');
        }
        
        setSubmitted(true);
        if (onSubmissionComplete) onSubmissionComplete();
        return;
      }
      
      // Otherwise, use the default submission logic
      // Validate files first
      const frontValidation = validateFile(data.frontFile);
      if (!frontValidation.valid) {
        setSubmissionError(frontValidation.error || 'Invalid front document');
        setLoading(false);
        return;
      }

      if (data.backFile) {
        const backValidation = validateFile(data.backFile);
        if (!backValidation.valid) {
          setSubmissionError(backValidation.error || 'Invalid back document');
          setLoading(false);
          return;
        }
      }

      const selfieValidation = validateFile(data.selfieFile);
      if (!selfieValidation.valid) {
        setSubmissionError(selfieValidation.error || 'Invalid selfie');
        setLoading(false);
        return;
      }

      // Submit verification request
      const result = await submitVerificationRequest(
        user.id,
        data.documentType,
        data.frontFile,
        data.backFile || null,
        data.selfieFile
      );

      if (!result.success) {
        setSubmissionError(result.message || 'Failed to submit verification');
        toast({
          title: "Verification submission failed",
          description: result.message || "There was an error submitting your verification request.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Verification submitted successfully",
        description: "Your verification documents have been submitted for review.",
      });
      
      setSubmitted(true);
      if (onSubmissionComplete) onSubmissionComplete();
    } catch (error: any) {
      console.error('Verification submission error:', error);
      setSubmissionError(error.message || 'An unexpected error occurred');
      toast({
        title: "Verification submission failed",
        description: error.message || "There was an error submitting your verification request.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <SuccessCard />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Verification</CardTitle>
        <CardDescription>
          Submit your identification documents to verify your identity. All documents are processed securely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submissionError && (
          <SubmissionAlert type="error" message={submissionError} />
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <DocumentTypeSelect form={form} />
            
            <DocumentUploadSection form={form} />
            
            <PrivacyConsentSection form={form} />
            
            <div className="pt-4">
              <SubmitButton 
                loading={loading || externalLoading}
                disabled={!form.formState.isValid}
                text="Submit Verification"
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VerificationForm;
