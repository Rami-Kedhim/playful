
import MainLayout from "@/components/layout/MainLayout";
import { escorts } from "@/data/escortData";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LivecamModel } from "@/types/livecams";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const EscortLiveStreams = () => {
  const [filter, setFilter] = useState<string>("all");
  
  // Let's filter escorts who offer livestreams
  const escortsWithLiveStreams = escorts.map(escort => ({
    id: escort.id,
    username: escort.name.toLowerCase().replace(/\s+/g, '_'),
    displayName: escort.name,
    imageUrl: escort.imageUrl,
    thumbnailUrl: escort.imageUrl,
    isLive: Math.random() > 0.7, // Simulating some online, some offline
    viewerCount: Math.floor(Math.random() * 200) + 10,
    country: escort.location,
    categories: escort.tags,
    age: escort.age,
    description: escort.description || `Join ${escort.name}'s live stream for an intimate experience`,
    streamUrl: `/escort/${escort.id}/live`,
  }));
  
  const liveEscorts = escortsWithLiveStreams.filter(e => e.isLive);
  const offlineEscorts = escortsWithLiveStreams.filter(e => !e.isLive);
  
  const displayedEscorts = filter === "live" 
    ? liveEscorts 
    : filter === "offline" 
      ? offlineEscorts 
      : escortsWithLiveStreams;
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Live Escort Streams</h1>
            <p className="text-muted-foreground max-w-2xl">
              Connect with escorts through live video streams. Experience real-time interaction 
              from the comfort of your home.
            </p>
          </div>
          
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">All Streams</TabsTrigger>
              <TabsTrigger value="live">
                Live Now <Badge variant="outline" className="ml-1 bg-red-500/20 text-red-500 border-red-500/30">{liveEscorts.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="offline">Offline</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedEscorts.map(escort => (
            <StreamCard key={escort.id} stream={escort} />
          ))}
          
          {displayedEscorts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">No streams found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

const StreamCard = ({ stream }: { stream: LivecamModel }) => {
  return (
    <Link to={stream.streamUrl}>
      <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="relative aspect-video">
          <img 
            src={stream.thumbnailUrl} 
            alt={stream.displayName} 
            className="w-full h-full object-cover"
          />
          {stream.isLive && (
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="bg-red-500/80 text-white border-red-500/30 flex items-center gap-1 px-2 py-0.5">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
              </Badge>
            </div>
          )}
          
          <div className="absolute bottom-2 right-2">
            <Badge variant="outline" className="bg-black/60 border-white/20 flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {stream.viewerCount}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between mb-1">
            <h3 className="font-medium truncate">{stream.displayName}</h3>
            <Badge variant="outline" className="bg-primary/10 border-primary/30">
              {stream.age}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Users className="h-3 w-3 mr-1" />
            <span>{stream.country}</span>
            
            <div className="ml-auto flex items-center">
              <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
              <span>{(Math.random() * 2 + 3).toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {stream.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EscortLiveStreams;
