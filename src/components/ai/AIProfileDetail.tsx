
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AIProfile } from '@/types/ai-profile';
import { Send, Mic, MicOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useAIProfileStore from '@/store/aiProfileStore';
import { voiceService } from '@/services/voiceService';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface AIProfileDetailProps {
  profile: AIProfile;
}

const AIProfileDetail: React.FC<AIProfileDetailProps> = ({ profile }) => {
  const [messageInput, setMessageInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { activeConversations, sendMessage } = useAIProfileStore();

  const conversation = activeConversations.find(conv => conv.profileId === profile.id);
  const messages = conversation?.messages || [];

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    
    await sendMessage(profile.id, messageInput);
    setMessageInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleSpeech = (text: string) => {
    if (isSpeaking) {
      voiceService.stop();
      setIsSpeaking(false);
    } else {
      voiceService.speak(text, {
        voice: profile.personality?.responseStyle,
        rate: 1.0,
        pitch: 1.0
      });
      setIsSpeaking(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Profile sidebar */}
      <Card className="md:w-1/3 lg:w-1/4">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-2">
            <AvatarImage src={profile.avatar_url} alt={profile.name} />
            <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.age} • {profile.location}</p>
            <div className="flex justify-center mt-2">
              <Badge className="bg-primary/20 text-primary">
                {profile.personality?.type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">About me</h3>
            <p className="text-sm">{profile.bio}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests?.map((interest, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat area */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.avatar_url} alt={profile.name} />
                <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {profile.availability_status === 'online' ? 'Online now' : 'Active recently'}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-4 h-[400px]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center text-muted-foreground">
              <p>No messages yet</p>
              <p className="text-sm mt-2">Say hello to {profile.name}!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUserMessage ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUserMessage && (
                    <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                      <AvatarImage src={profile.avatar_url} alt={profile.name} />
                      <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="space-y-1 max-w-[80%]">
                    <div
                      className={`p-3 rounded-lg ${
                        message.isUserMessage
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                      {!message.isUserMessage && message.type === 'text' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-6 w-6 p-0 rounded-full"
                          onClick={() => toggleSpeech(message.content)}
                        >
                          {isSpeaking ? <MicOff size={12} /> : <Mic size={12} />}
                        </Button>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(message.timestamp), 'h:mm a')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder={`Message ${profile.name}...`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {profile.lucoin_chat_price} LC per message
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AIProfileDetail;
