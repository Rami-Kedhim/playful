
import React, { ReactNode } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { LivecamModel } from "@/types/livecams";
import { Button } from "@/components/ui/button";

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
          <h2 className="text-2xl font-semibold text-red-500 mb-2">
            {error || "Model not found"}
          </h2>
          <p className="text-muted-foreground">
            The model you're looking for couldn't be found.
          </p>
          <Button className="mt-4" onClick={onGoBack}>
            Go Back
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {children}
      </div>
    </MainLayout>
  );
};

export default LivecamDetailLayout;
