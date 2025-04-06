
import { useState } from 'react';
import { AIProfile } from '@/types/ai';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Star, Clock } from 'lucide-react';
import useAIProfileStore from '@/store/aiProfileStore';
import { Input } from '@/components/ui/input';

interface AIProfileDetailProps {
  profile: AIProfile;
}

const AIProfileDetail = ({ profile }: AIProfileDetailProps) => {
  const [message, setMessage] = useState('');
  const { sendMessage, activeConversations } = useAIProfileStore();
  
  const conversation = activeConversations.find(conv => conv.profileId === profile.id);
  const messages = conversation?.messages || [];
  
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(profile.id, message);
      setMessage('');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Info */}
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <div className="flex items-center space-x-2 text-sm">
              <span className={`h-2 w-2 rounded-full ${profile.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>{profile.status === 'online' ? 'Online Now' : 'Offline'}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">About Me</h3>
            <p className="text-sm text-muted-foreground">{profile.bio}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {profile.age && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Age:</span>
                  <span>{profile.age}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{profile.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Personality:</span>
                <span className="capitalize">{profile.personality.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{profile.popularity} popularity</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Interests</h3>
            <div className="flex flex-wrap gap-1">
              {profile.personality.interests.map((interest, index) => (
                <Badge key={index} variant="secondary">{interest}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Traits</h3>
            <div className="flex flex-wrap gap-1">
              {profile.personality.traits.map((trait, index) => (
                <Badge key={index} variant="outline">{trait}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Backstory</h3>
            <p className="text-sm text-muted-foreground">{profile.personality.backstory}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Like
          </Button>
          <Button variant="outline" size="sm">
            Share Profile
          </Button>
        </CardFooter>
      </Card>
      
      {/* Chat Section */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <h2 className="text-xl font-bold">Chat with {profile.name}</h2>
        </CardHeader>
        <CardContent className="h-[400px] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MessageCircle className="mx-auto h-12 w-12 mb-2 opacity-20" />
                  <p>Start a conversation with {profile.name}</p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isUserMessage ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.isUserMessage
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <div className="text-xs mt-1 opacity-70 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder={`Message ${profile.name}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIProfileDetail;
