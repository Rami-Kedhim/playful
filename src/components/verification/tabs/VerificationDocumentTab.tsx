
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Trash, Upload, FileCheck, AlertCircle } from 'lucide-react';

interface VerificationDocumentTabProps {
  userId: string;
}

const VerificationDocumentTab: React.FC<VerificationDocumentTabProps> = ({ userId }) => {
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [selfieDocument, setSelfieDocument] = useState<File | null>(null);
  const [additionalDocument, setAdditionalDocument] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = (setFile: (file: File | null) => void) => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idDocument || !selfieDocument) {
      toast({
        title: "Required documents missing",
        description: "Please upload your ID and selfie with ID to continue.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // In a real app, you would upload these files to your backend
      // For demo purpose, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Documents uploaded successfully",
        description: "Your verification documents have been submitted for review.",
      });
      
      // Reset form
      setIdDocument(null);
      setSelfieDocument(null);
      setAdditionalDocument(null);
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your documents. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Identity Verification Documents</CardTitle>
            <CardDescription>
              Upload the required documents to verify your identity. All documents must be clear and legible.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idDocument" className="font-medium">Government-issued ID (Required)</Label>
              <div className="flex items-center justify-between p-3 border border-dashed rounded-lg">
                <input
                  type="file"
                  id="idDocument"
                  className="hidden"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => handleFileChange(e, setIdDocument)}
                />
                
                {idDocument ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <FileCheck className="w-5 h-5 text-primary mr-2" />
                      <span className="text-sm truncate max-w-[200px]">{idDocument.name}</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveFile(setIdDocument)}
                    >
                      <Trash className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ) : (
                  <label 
                    htmlFor="idDocument" 
                    className="flex items-center justify-center w-full py-2 cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Upload ID (passport, driver's license)</span>
                  </label>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="selfieDocument" className="font-medium">Selfie with ID (Required)</Label>
              <div className="flex items-center justify-between p-3 border border-dashed rounded-lg">
                <input
                  type="file"
                  id="selfieDocument"
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={(e) => handleFileChange(e, setSelfieDocument)}
                />
                
                {selfieDocument ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <FileCheck className="w-5 h-5 text-primary mr-2" />
                      <span className="text-sm truncate max-w-[200px]">{selfieDocument.name}</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveFile(setSelfieDocument)}
                    >
                      <Trash className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ) : (
                  <label 
                    htmlFor="selfieDocument" 
                    className="flex items-center justify-center w-full py-2 cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Upload selfie holding your ID</span>
                  </label>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalDocument" className="font-medium">Additional Document (Optional)</Label>
              <div className="flex items-center justify-between p-3 border border-dashed rounded-lg">
                <input
                  type="file"
                  id="additionalDocument"
                  className="hidden"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => handleFileChange(e, setAdditionalDocument)}
                />
                
                {additionalDocument ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <FileCheck className="w-5 h-5 text-primary mr-2" />
                      <span className="text-sm truncate max-w-[200px]">{additionalDocument.name}</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveFile(setAdditionalDocument)}
                    >
                      <Trash className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ) : (
                  <label 
                    htmlFor="additionalDocument" 
                    className="flex items-center justify-center w-full py-2 cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Upload additional supporting document</span>
                  </label>
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex-col space-y-2">
            <div className="flex items-start text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>Your documents are securely stored and only used for verification purposes. They will be deleted after verification is complete.</p>
            </div>
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Submit Documents"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default VerificationDocumentTab;
