
import { Card, CardContent } from "@/components/ui/card";
import { LivecamModel } from "@/types/livecams";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface LivecamMainContentProps {
  model: LivecamModel;
}

const LivecamMainContent: React.FC<LivecamMainContentProps> = ({ model }) => {
  return (
    <div className="space-y-6">
      {/* Livecam stream container */}
      <Card className="bg-black relative">
        <div className="aspect-video relative">
          {model.isLive ? (
            <>
              <img 
                src={model.thumbnailUrl || "/placeholders/stream-placeholder.jpg"} 
                alt={`${model.name}'s livestream`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
                <Badge variant="secondary">{model.viewerCount || 0} viewers</Badge>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full flex-col text-center">
              <p className="text-xl text-white mb-2">{model.name} is currently offline</p>
              <p className="text-sm text-gray-400">Check back later or subscribe for notifications</p>
            </div>
          )}
        </div>
      </Card>

      {/* Model info and description */}
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">{model.name}</h1>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <span>{model.age} years</span>
            <span>•</span>
            <span>{model.country}</span>
          </div>
          
          <p className="text-gray-400">{model.description}</p>
          
          <Tabs defaultValue="about" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-4 space-y-4">
              <p>{model.bio || "No bio information available."}</p>
            </TabsContent>
            <TabsContent value="schedule" className="mt-4 space-y-4">
              <p>Upcoming shows schedule will appear here.</p>
            </TabsContent>
            <TabsContent value="photos" className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {model.gallery && model.gallery.length > 0 ? (
                  model.gallery.map((photo, index) => (
                    <img 
                      key={index} 
                      src={photo} 
                      alt={`${model.name} photo ${index+1}`} 
                      className="w-full aspect-square object-cover rounded-md" 
                    />
                  ))
                ) : (
                  <p>No photos available.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivecamMainContent;
