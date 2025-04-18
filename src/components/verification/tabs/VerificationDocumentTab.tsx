
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FilePlus, FileCheck } from 'lucide-react';

interface VerificationDocumentTabProps {
  userId: string;
  currentLevel: 'basic' | 'advanced' | 'premium';
  onUpload?: (files: FileList) => Promise<boolean>;
  isSubmitting: boolean;
}

const VerificationDocumentTab: React.FC<VerificationDocumentTabProps> = ({ 
  userId, 
  currentLevel,
  onUpload,
  isSubmitting
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      setUploadSuccess(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles && onUpload) {
      const success = await onUpload(selectedFiles);
      if (success) {
        setUploadSuccess(true);
        setSelectedFiles(null);
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Upload Verification Documents</h3>
      
      <p className="text-sm text-muted-foreground">
        Please upload clear, high-quality images of your identification documents to process your verification.
      </p>
      
      <form onSubmit={handleSubmit}>
        <Card className="border-dashed border-2 bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <input
              type="file"
              id="document-upload"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf"
              disabled={isSubmitting}
            />
            
            <label htmlFor="document-upload" className="cursor-pointer block">
              {selectedFiles ? (
                <div className="flex flex-col items-center">
                  <FileCheck className="h-12 w-12 text-primary mb-2" />
                  <p className="font-medium">{selectedFiles.length} file(s) selected</p>
                  <p className="text-sm text-muted-foreground">Click to change</p>
                </div>
              ) : uploadSuccess ? (
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-green-100 p-3 mb-2">
                    <FileCheck className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="font-medium text-green-600">Documents uploaded successfully</p>
                  <p className="text-sm text-muted-foreground">Click to upload more</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FilePlus className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="font-medium">Drop files here or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload ID card, passport, or driver's license
                  </p>
                </div>
              )}
            </label>
          </CardContent>
        </Card>
        
        {selectedFiles && (
          <Button 
            type="submit" 
            className="mt-4 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Documents
              </>
            )}
          </Button>
        )}
      </form>
      
      <div className="bg-muted p-4 rounded-md text-sm">
        <h4 className="font-medium">Document Requirements:</h4>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Government-issued identification (passport, driver's license, ID card)</li>
          <li>Image must be clear and not blurry</li>
          <li>All corners of the document must be visible</li>
          <li>File size must be under 5MB</li>
          <li>Acceptable formats: JPG, PNG, PDF</li>
        </ul>
      </div>
    </div>
  );
};

export default VerificationDocumentTab;
