
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, Check, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const verificationSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  idNumber: z.string().min(2, 'ID number is required'),
  dateOfBirth: z.string().refine(value => {
    const date = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 18 && !isNaN(date.getTime());
  }, 'You must be at least 18 years old'),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

const VerificationPage = () => {
  const { user, refreshProfile } = useAuth();
  const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
  const [idBackFile, setIdBackFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      fullName: '',
      idNumber: '',
      dateOfBirth: '',
    },
  });

  const handleIdFrontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFrontFile(e.target.files[0]);
    }
  };

  const handleIdBackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdBackFile(e.target.files[0]);
    }
  };

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelfieFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const fileName = `${user!.id}_${Date.now()}_${file.name}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError, data } = await supabase
      .storage
      .from('verification')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Error uploading file: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase
      .storage
      .from('verification')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const onSubmit = async (data: VerificationFormData) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to submit verification',
        variant: 'destructive',
      });
      return;
    }

    if (!idFrontFile || !selfieFile) {
      toast({
        title: 'Missing documents',
        description: 'Please upload your ID (front) and a selfie',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      // Upload documents
      const idFrontUrl = await uploadFile(idFrontFile, 'id_documents');
      const idBackUrl = idBackFile ? await uploadFile(idBackFile, 'id_documents') : null;
      const selfieUrl = await uploadFile(selfieFile, 'selfies');

      // Create verification request
      const { error } = await supabase
        .from('verification_requests')
        .insert({
          user_id: user.id,
          status: 'pending',
          requested_level: 'basic',
          documents: {
            id_front: idFrontUrl,
            id_back: idBackUrl,
            selfie: selfieUrl,
          }
        });

      if (error) throw error;

      // Save verification details
      const { error: detailsError } = await supabase
        .from('verification_details')
        .insert({
          user_id: user.id,
          verification_id: null, // Will be updated when verification is processed
          verified_name: data.fullName,
          id_number: data.idNumber,
          date_of_birth: data.dateOfBirth,
          id_type: 'government_id'
        });

      if (detailsError) throw detailsError;

      // Update profile verification status
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          verification_submitted: true,
          last_verification_request: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Refresh profile
      await refreshProfile();

      toast({
        title: 'Verification submitted',
        description: 'Your verification request has been submitted and is under review.',
      });

      navigate('/profile');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred during submission',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please sign in to access verification.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate('/auth')}>Go to Login</Button>
            </CardFooter>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              Identity Verification
            </CardTitle>
            <CardDescription>
              To ensure platform safety, we need to verify your identity. This information is stored
              securely and is never shared with other users.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full legal name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Number</FormLabel>
                          <FormControl>
                            <Input placeholder="ID number from your document" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Document Upload</h3>
                  <p className="text-sm text-muted-foreground">
                    Please upload a government-issued photo ID and a clear selfie of yourself.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FormLabel>ID Document (Front)</FormLabel>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
                        {idFrontFile ? (
                          <div className="flex flex-col items-center gap-2">
                            <Check className="h-8 w-8 text-green-500" />
                            <span className="text-sm text-green-500 font-medium">
                              {idFrontFile.name}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setIdFrontFile(null)}
                            >
                              Change
                            </Button>
                          </div>
                        ) : (
                          <label className="cursor-pointer text-center">
                            <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                            <span className="mt-2 block text-sm font-medium">
                              Click to upload
                            </span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                              PNG, JPG, or PDF (max 5MB)
                            </span>
                            <Input 
                              type="file"
                              accept="image/*, application/pdf"
                              className="hidden"
                              onChange={handleIdFrontUpload}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>ID Document (Back) <span className="text-muted-foreground">(Optional)</span></FormLabel>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
                        {idBackFile ? (
                          <div className="flex flex-col items-center gap-2">
                            <Check className="h-8 w-8 text-green-500" />
                            <span className="text-sm text-green-500 font-medium">
                              {idBackFile.name}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setIdBackFile(null)}
                            >
                              Change
                            </Button>
                          </div>
                        ) : (
                          <label className="cursor-pointer text-center">
                            <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                            <span className="mt-2 block text-sm font-medium">
                              Click to upload
                            </span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                              PNG, JPG, or PDF (max 5MB)
                            </span>
                            <Input 
                              type="file"
                              accept="image/*, application/pdf"
                              className="hidden"
                              onChange={handleIdBackUpload}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel>Selfie with ID</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
                      {selfieFile ? (
                        <div className="flex flex-col items-center gap-2">
                          <Check className="h-8 w-8 text-green-500" />
                          <span className="text-sm text-green-500 font-medium">
                            {selfieFile.name}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelfieFile(null)}
                          >
                            Change
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer text-center">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                          <span className="mt-2 block text-sm font-medium">
                            Click to upload a selfie holding your ID
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            PNG, JPG (max 5MB)
                          </span>
                          <Input 
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleSelfieUpload}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4 rounded-md flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                    <div className="text-sm text-amber-800 dark:text-amber-300">
                      <p className="font-medium">Important</p>
                      <p>Ensure all document details are clearly visible. Your verification may be rejected if the documents are blurry or information is obscured.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={uploading} className="min-w-[150px]">
                    {uploading ? 'Submitting...' : 'Submit Verification'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default VerificationPage;
