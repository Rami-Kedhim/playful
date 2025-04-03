
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConversations } from '@/services/messaging/conversationService';
import { Conversation } from '@/types/messaging';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const ConversationList: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);
        const data = await getConversations();
        setConversations(data);
      } catch (error) {
        console.error('Error loading conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No conversations yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => {
        const profile = conversation.otherParticipant;
        const lastMessage = conversation.messages && conversation.messages.length > 0 
          ? conversation.messages[conversation.messages.length - 1] 
          : null;

        return (
          <Link 
            key={conversation.id} 
            to={`/messages/${conversation.id}`}
            className="block"
          >
            <Card className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url || ''} alt={profile?.username || 'User'} />
                  <AvatarFallback>
                    {profile?.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium truncate">
                      {profile?.full_name || profile?.username || 'Unknown User'}
                    </h3>
                    {conversation.updated_at && (
                      <span className="text-xs text-muted-foreground ml-2">
                        {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                      </span>
                    )}
                  </div>
                  {lastMessage && (
                    <p className="text-sm text-muted-foreground truncate">
                      {lastMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ConversationList;
