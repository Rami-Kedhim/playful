
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLivecamDetail } from '@/hooks/useLivecamDetail';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Heart, MessageCircle, AlertTriangle, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const EscortLiveStreamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [chatMessage, setChatMessage] = useState('');
  const [tipAmount, setTipAmount] = useState<number>(10);
  const [showTipPanel, setShowTipPanel] = useState(false);
  const { toast } = useToast();
  
  const {
    livecam,
    loading,
    error,
    viewerCount,
    isSubscribed,
    isFavorited,
    toggleFavorite,
    sendTip
  } = useLivecamDetail({ livecamId: id || '' });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // In a real app, this would send to an API
    console.log('Sending message:', chatMessage);
    toast({
      title: 'Message Sent',
      description: 'Your message has been sent to the model'
    });
    
    setChatMessage('');
  };

  const handleSendTip = async () => {
    if (tipAmount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid tip amount',
        variant: 'destructive'
      });
      return;
    }
    
    const success = await sendTip(tipAmount, '');
    if (success) {
      toast({
        title: 'Tip Sent!',
        description: `You sent a ${tipAmount} UBX tip to ${livecam?.name}`
      });
      setShowTipPanel(false);
    } else {
      toast({
        title: 'Error',
        description: 'Failed to send tip. Please try again.',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="w-full aspect-video rounded-lg" />
          </div>
          <div>
            <Skeleton className="w-full h-[400px] rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !livecam) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
              <h2 className="mt-4 text-xl font-semibold">Stream Not Found</h2>
              <p className="mt-2 text-muted-foreground">
                The live stream you're looking for doesn't exist or is no longer available.
              </p>
              <Button className="mt-6" variant="default" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player Area */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-lg overflow-hidden">
            {livecam.streamUrl ? (
              <div className="aspect-video bg-black flex items-center justify-center">
                <img 
                  src={livecam.imageUrl} 
                  alt={livecam.name} 
                  className="max-w-full max-h-full"
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="text-lg font-semibold">Live Stream Preview</p>
                    <p className="text-sm opacity-70">In a real app, this would be a video stream</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-white text-center">
                  <AlertTriangle className="mx-auto h-12 w-12" />
                  <p className="mt-2">Stream is currently offline</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Stream Info */}
          <div className="mt-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{livecam.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{livecam.language}</Badge>
                  <span className="text-muted-foreground text-sm flex items-center">
                    <Eye className="h-4 w-4 mr-1" /> {viewerCount.toLocaleString()} viewers
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => toggleFavorite()}
                  className={isFavorited ? "text-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowTipPanel(!showTipPanel)}
                >
                  <DollarSign className="h-5 w-5 mr-1" /> Tip
                </Button>
              </div>
            </div>
            
            {showTipPanel && (
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Send a Tip to {livecam.name}</h3>
                  <div className="flex gap-2 mb-4">
                    {[10, 25, 50, 100].map(amount => (
                      <Button 
                        key={amount}
                        variant={tipAmount === amount ? "default" : "outline"}
                        onClick={() => setTipAmount(amount)}
                        className="flex-1"
                      >
                        {amount} UBX
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowTipPanel(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendTip} className="flex-1">
                      Send Tip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Chat Area */}
        <div>
          <Card className="h-[600px] flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Live Chat</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-secondary/30 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">System</p>
                  <p className="text-sm">Welcome to {livecam.name}'s live chat! Please be respectful.</p>
                </div>
                
                {/* Sample chat messages */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-3 rounded-lg border">
                    <p className="text-xs font-medium mb-1">User{Math.floor(Math.random() * 1000)}</p>
                    <p className="text-sm">This is a sample chat message!</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  disabled={!isSubscribed}
                  className="flex-1"
                />
                <Button type="submit" disabled={!isSubscribed}>
                  <MessageCircle className="h-4 w-4 mr-1" /> Chat
                </Button>
              </form>
              {!isSubscribed && (
                <p className="text-xs text-muted-foreground mt-2">
                  You need to subscribe to chat with this model
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EscortLiveStreamDetail;
