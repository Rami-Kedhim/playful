
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/hooks/auth';
import { DocumentType } from '@/types/verification';
import { useVerificationForm } from '../hooks/useVerificationForm';
import DocumentTypeSelect from './DocumentTypeSelect';
import DocumentUploadHandler from './DocumentUploadHandler';
import SubmitButton from './SubmitButton';
import SubmissionAlert from './SubmissionAlert';
import SuccessCard from './SuccessCard';
import { submitVerificationRequest } from '@/utils/verification';

export interface VerificationFormProps {
  onSubmit?: (data: any) => void;
  loading?: boolean;
  serviceType?: string;
  onSubmissionComplete?: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  onSubmit: externalSubmit,
  loading: externalLoading = false,
  serviceType = 'escort',
  onSubmissionComplete
}) => {
  const { user } = useAuth();
  const {
    form,
    loading,
    setLoading,
    submitted,
    setSubmitted,
    submitMessage,
    setSubmitMessage
  } = useVerificationForm();

  const onSubmit = async (data: any) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const result = await submitVerificationRequest(
        user.id,
        data.documentType,
        data.documentFile,
        data.selfieFile || null,
        data.documentFile
      );
      
      setSubmitMessage({
        success: result.success,
        message: result.message
      });
      
      if (result.success) {
        setSubmitted(true);
        form.reset();
        if (onSubmissionComplete) {
          onSubmissionComplete();
        }
      }
    } catch (error) {
      console.error("Verification submission error:", error);
      setSubmitMessage({
        success: false,
        message: "An unexpected error occurred. Please try again later."
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
          To ensure platform safety, we require identity verification for all users offering services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitMessage && !submitMessage.success && (
          <SubmissionAlert 
            type="error" 
            message={submitMessage.message} 
          />
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DocumentTypeSelect 
              form={form}
              onTypeChange={() => {}}
            />
            
            <DocumentUploadHandler
              label="Front of ID Document"
              onFileSelect={(file) => {
                form.setValue('documentFile', file);
              }}
              error={form.formState.errors.documentFile?.message?.toString()}
            />
            
            <DocumentUploadHandler
              label="Selfie with ID"
              onFileSelect={(file) => {
                form.setValue('selfieFile', file);
              }}
              error={form.formState.errors.selfieFile?.message?.toString()}
            />

            <SubmitButton 
              loading={loading || externalLoading} 
              disabled={false} 
              text="Submit Verification"
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-sm text-muted-foreground">
          Your verification information is encrypted and only used for identity verification purposes.
          We follow strict privacy guidelines and never share your personal information.
        </p>
      </CardFooter>
    </Card>
  );
};

export default VerificationForm;

