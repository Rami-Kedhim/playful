
import React, { ReactNode } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { LivecamModel } from "@/types/livecams";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LivecamDetailLayoutProps {
  model: LivecamModel | null;
  loading: boolean;
  error: string | null;
  onGoBack: () => void;
  children?: ReactNode;
}

const LivecamDetailLayout: React.FC<LivecamDetailLayoutProps> = ({
  model,
  loading,
  error,
  onGoBack,
  children,
}) => {
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !model) {
    return (
      <MainLayout>
        <div className="text-center py-16">
          <Alert variant="destructive" className="mb-6 max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error || "Model not found"}
            </AlertDescription>
          </Alert>
          <p className="text-muted-foreground mb-6">
            The model you're looking for couldn't be found or there was an error loading the data.
          </p>
          <Button onClick={onGoBack}>
            Go Back to All Models
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Button 
        variant="ghost" 
        onClick={onGoBack} 
        className="mb-6"
      >
        ← Back to All Models
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {children}
      </div>
    </MainLayout>
  );
};

export default LivecamDetailLayout;
