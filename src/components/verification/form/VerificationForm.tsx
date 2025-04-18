
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/hooks/auth/useAuth';
import { canSubmitVerification, submitVerificationRequest } from '@/utils/verification';
import { VerificationFormValues, verificationFormSchema, ID_CARD } from '@/types/verification';
import DocumentTypeSelect from './DocumentTypeSelect';
import DocumentUploadHandler from './DocumentUploadHandler';
import SubmitButton from './SubmitButton';
import SubmissionAlert from './SubmissionAlert';
import SuccessCard from './SuccessCard';

interface VerificationFormProps {
  onSubmit?: (data: VerificationFormValues) => void;
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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [submitMessage, setSubmitMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [documentType, setDocumentType] = useState(ID_CARD);

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      documentType: ID_CARD,
      documentFile: undefined as unknown as File,
      selfieFile: undefined as unknown as File,
      consentChecked: false,
      documentFrontImage: { file: undefined as unknown as File, preview: '' },
      documentBackImage: { file: undefined as unknown as File, preview: '' },
      selfieImage: { file: undefined as unknown as File, preview: '' },
    },
  });

  useEffect(() => {
    if (user) {
      const checkSubmitEligibility = async () => {
        const result = await canSubmitVerification(user.id);
        setCanSubmit(result.canSubmit);
        
        if (!result.canSubmit) {
          setSubmitMessage({
            success: false,
            message: result.reason || "You cannot submit a verification request at this time"
          });
        }
      };
      
      checkSubmitEligibility();
    }
  }, [user]);

  const handleDocumentTypeChange = (type: string) => {
    setDocumentType(type);
  };

  const onSubmit = async (data: VerificationFormValues) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const result = await submitVerificationRequest(
        user.id,
        data.documentType,
        data.documentFile,
        data.selfieFile || null,
        data.documentFile // Use the primary document as selfie for this example
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
        {!canSubmit && submitMessage && (
          <SubmissionAlert 
            type="error" 
            title="Cannot Submit" 
            message={submitMessage.message} 
          />
        )}

        {submitMessage && submitMessage.success === false && canSubmit && (
          <SubmissionAlert 
            type="error" 
            message={submitMessage.message} 
          />
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DocumentTypeSelect 
              form={form}
              onTypeChange={handleDocumentTypeChange}
            />
            
            <DocumentUploadHandler
              label="Front of ID Document"
              onFileSelect={(file) => {
                form.setValue('documentFile', file);
                form.setValue('documentFrontImage', { file, preview: URL.createObjectURL(file) });
              }}
              error={form.formState.errors.documentFile?.message?.toString()}
            />
            
            <DocumentUploadHandler
              label="Selfie with ID"
              onFileSelect={(file) => {
                form.setValue('selfieFile', file);
                form.setValue('selfieImage', { file, preview: URL.createObjectURL(file) });
              }}
              error={form.formState.errors.selfieFile?.message?.toString()}
            />

            <SubmitButton 
              loading={loading || externalLoading} 
              disabled={!canSubmit} 
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
