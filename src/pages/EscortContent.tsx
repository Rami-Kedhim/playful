import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getEscortById } from "@/data/escortData";
import VirtualContentGrid from "@/components/creators/VirtualContentGrid";
import useVirtualCreatorContent from "@/hooks/useVirtualCreatorContent";

const EscortContent = () => {
  const { id } = useParams<{ id: string }>();
  const escort = id ? getEscortById(id) : undefined;
  const { toast } = useToast();
  
  const { content, loading, error, hasMore, loadMore } = 
    useVirtualCreatorContent(escort?.id || '', 8);
  
  if (!escort) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold mb-2">Escort Not Found</h2>
          <p className="text-gray-500 mb-4">The escort you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => window.history.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{escort.name}'s Virtual Content</h1>
            <p className="text-muted-foreground">
              Exclusive photos, videos, and other virtual experiences
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-8">
              <VirtualContentGrid 
                items={content}
                isLoading={loading}
                error={error}
                columns={2}
                emptyMessage="This escort hasn't uploaded any content yet."
              />
              
              {hasMore && (
                <div className="mt-6 text-center">
                  <Button onClick={loadMore} variant="outline">
                    Load More
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="sticky top-8 space-y-6">
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="font-medium text-lg mb-3">Subscription Options</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-muted/30">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Monthly</span>
                      <span className="font-bold">${escort.subscriptionPrice || 29.99}/mo</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Access to all photos and videos
                    </p>
                    <Button className="w-full">Subscribe</Button>
                  </div>
                  
                  <div className="p-4 border rounded-md border-primary/30 bg-primary/5">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Premium</span>
                      <span className="font-bold">${(escort.subscriptionPrice || 29.99) * 2}/mo</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Everything from Monthly + private messaging and live streams
                    </p>
                    <Button className="w-full" variant="default">Subscribe Premium</Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="font-medium text-lg mb-3">About {escort.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {escort.description || escort.bio || `Experience the virtual side of ${escort.name}. Enjoy exclusive content available only to subscribers.`}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Photos</span>
                    <span className="font-medium">{escort.contentStats?.photos || "50+"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Videos</span>
                    <span className="font-medium">{escort.contentStats?.videos || "12"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Live streams</span>
                    <span className="font-medium">{escort.contentStats?.streams || "Weekly"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EscortContent;
