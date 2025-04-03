
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { LivecamModel } from "@/types/livecams";
import { fetchLivecams } from "@/services/livecamsService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleUser, Heart, MessageSquare, Share2, Users } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LivecamDetail: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [model, setModel] = useState<LivecamModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real implementation, we would fetch the specific model
        // For now, we'll fetch all models and find the one we need
        const response = await fetchLivecams({ limit: 100 });
        const foundModel = response.models.find(m => m.username === username);
        
        if (foundModel) {
          setModel(foundModel);
        } else {
          setError("Model not found");
        }
      } catch (err: any) {
        console.error("Error loading model:", err);
        setError(err.message || "Failed to load model");
      } finally {
        setLoading(false);
      }
    };
    
    if (username) {
      loadModel();
    }
  }, [username]);

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
          <Button className="mt-4" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative">
              <AspectRatio ratio={16/9}>
                {model.isLive ? (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    {/* In a real implementation, this would be a video player */}
                    <div className="text-center p-6">
                      <h3 className="text-xl font-semibold mb-2">Live Stream</h3>
                      <p className="text-gray-400">
                        The video player would appear here in the production version.
                      </p>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={model.imageUrl} 
                    alt={model.displayName} 
                    className="object-cover w-full h-full"
                  />
                )}
              </AspectRatio>
              
              {model.isLive && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500 text-white">
                    <Users size={14} className="mr-1" />
                    {model.viewerCount || 0} watching
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold">{model.displayName}</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart size={18} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <CircleUser size={18} className="mr-2" />
                <span className="text-muted-foreground">@{model.username}</span>
                {model.age && (
                  <Badge variant="outline" className="ml-2">
                    {model.age}
                  </Badge>
                )}
                {model.country && (
                  <Badge variant="outline" className="ml-2">
                    {model.country}
                  </Badge>
                )}
              </div>
              
              {model.description && (
                <p className="text-muted-foreground mb-4">{model.description}</p>
              )}
              
              {model.categories && model.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {model.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2 mt-6">
                <Button className="flex-1">
                  <MessageSquare size={18} className="mr-2" />
                  Start Chat
                </Button>
                {!model.isLive && (
                  <Button variant="outline" className="flex-1">
                    <Heart size={18} className="mr-2" />
                    Follow
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Model Info</h2>
              
              <div className="space-y-4">
                {model.language && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Language</h3>
                    <p>{model.language}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Status</h3>
                  <p className={model.isLive ? "text-green-500" : "text-gray-500"}>
                    {model.isLive ? "Live Now" : "Offline"}
                  </p>
                </div>
                
                {model.viewerCount !== undefined && model.isLive && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Viewers</h3>
                    <p>{model.viewerCount}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {model.categories ? (
                    model.categories.map((category, index) => (
                      <Badge key={index} variant="outline">
                        {category}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500">No tags available</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default LivecamDetail;
