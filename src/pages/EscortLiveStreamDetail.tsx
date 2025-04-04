import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { escorts } from "@/data/escortData";
import { getEscortById } from "@/data/escortData";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MessageSquare, 
  Heart, 
  Gift, 
  Send, 
  Users, 
  ChevronDown,
  Coins,
  Video,
  VideoOff 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const EscortLiveStreamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const escort = id ? getEscortById(escorts, id) : undefined;
  const { toast } = useToast();
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{
    id: string;
    sender: string;
    message: string;
    isEscort: boolean;
  }[]>([
    { id: "1", sender: "System", message: "Welcome to the live stream! Please be respectful.", isEscort: false },
    { id: "2", sender: escort?.name || "Escort", message: "Hi everyone! Thanks for joining me today!", isEscort: true },
  ]);
  
  const connectToStream = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast({
        title: "Connected to stream",
        description: `You are now connected to ${escort?.name}'s live stream.`
      });
    }, 2000);
  };
  
  const sendMessage = () => {
    if (!message.trim()) return;
    
    setChatMessages(prev => [
      ...prev,
      { id: Date.now().toString(), sender: "You", message, isEscort: false }
    ]);
    setMessage("");
    
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          id: (Date.now() + 1).toString(), 
          sender: escort?.name || "Escort", 
          message: "Thank you for your message! I appreciate you being here.", 
          isEscort: true 
        }
      ]);
    }, 3000);
  };
  
  if (!escort) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold mb-2">Escort Not Found</h2>
          <p className="text-gray-500 mb-4">The escort you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/escorts')}>Back to Escorts</Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black mb-4">
              {isConnected ? (
                <video 
                  src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                ></video>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <img 
                    src={escort.imageUrl} 
                    alt={escort.name} 
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Badge variant="outline" className="mb-4 bg-red-500/30 border-red-500/60 text-white">LIVE</Badge>
                    <h2 className="text-2xl font-bold mb-2 text-white">{escort.name}'s Live Stream</h2>
                    <p className="text-gray-200 mb-6 max-w-md text-center">
                      Join {escort.name} for an interactive live stream experience. Connect now to chat and interact.
                    </p>
                    <Button 
                      size="lg" 
                      onClick={connectToStream} 
                      disabled={isConnecting}
                    >
                      {isConnecting ? (
                        <>Connecting...</>
                      ) : (
                        <>
                          <Video className="mr-2 h-5 w-5" />
                          Connect to Stream
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
              
              {isConnected && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button size="sm" variant="outline" className="bg-black/70 hover:bg-black/90">
                    <Coins className="mr-2 h-4 w-4" />
                    Send Tip
                  </Button>
                  <Button size="sm" variant="outline" className="bg-black/70 hover:bg-black/90">
                    <VideoOff className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage src={escort.imageUrl} alt={escort.name} />
                  <AvatarFallback>{escort.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold">{escort.name}</h2>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{Math.floor(Math.random() * 200) + 20} viewers</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Follow
                </Button>
                <Button variant="outline" size="sm">
                  <Gift className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 overflow-y-auto mb-4 p-4 rounded-md bg-muted/50">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className={`mb-3 ${msg.isEscort ? "pl-2 border-l-2 border-primary" : ""}`}>
                      <span className={`font-semibold ${msg.isEscort ? "text-primary" : ""}`}>
                        {msg.sender}:
                      </span>
                      <span className="ml-2">{msg.message}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{escort.name}'s Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <img 
                    src={escort.imageUrl} 
                    alt={escort.name} 
                    className="rounded-md w-full aspect-square object-cover mb-2"
                  />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age:</span>
                      <span>{escort.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{escort.location}</span>
                    </div>
                    {escort.languages && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Languages:</span>
                        <span>{escort.languages.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-medium mb-2">About Me</h4>
                    <p className="text-sm text-muted-foreground">
                      {escort.description || `Hi, I'm ${escort.name}. Join my live streams for an intimate and personalized experience. I love connecting with my viewers and creating special moments.`}
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-medium mb-2">Stream Schedule</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Monday, Wednesday, Friday</span>
                        <span>8 PM - 11 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weekends</span>
                        <span>Varies</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button className="w-full" variant="outline">
                    <Heart className="mr-2 h-4 w-4" />
                    Add to Favorites
                  </Button>
                  <Button className="w-full">
                    View Full Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Support {escort.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 rounded-md p-3 border border-primary/20">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Basic Tip</span>
                    <span>50 LuCoins</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Show your appreciation with a basic tip
                  </p>
                  <Button size="sm" variant="outline" className="w-full">Send Tip</Button>
                </div>
                
                <div className="bg-primary/20 rounded-md p-3 border border-primary/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Premium Tip</span>
                    <span>200 LuCoins</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Get a personal shoutout during the stream
                  </p>
                  <Button size="sm" className="w-full">Send Premium Tip</Button>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Coins className="mr-2 h-4 w-4" />
                    Buy LuCoins
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EscortLiveStreamDetail;
