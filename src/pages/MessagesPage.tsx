
import React from 'react';
import { MainLayout } from '@/layouts';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search, Plus, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

// Mock conversations for demonstration
const mockConversations = [
  {
    id: '1',
    avatarUrl: 'https://i.pravatar.cc/150?u=1',
    name: 'Jessica Smith',
    lastMessage: "Hi there! I just wanted to check in on our appointment.",
    timestamp: '2023-04-18T14:30:00Z',
    unread: true,
  },
  {
    id: '2',
    avatarUrl: 'https://i.pravatar.cc/150?u=2',
    name: 'Michael Johnson',
    lastMessage: "Thanks for your message. I will get back to you soon.",
    timestamp: '2023-04-16T09:15:00Z',
    unread: false,
  },
  {
    id: '3',
    avatarUrl: 'https://i.pravatar.cc/150?u=3',
    name: 'Sarah Williams',
    lastMessage: "Looking forward to meeting you tomorrow!",
    timestamp: '2023-04-17T18:45:00Z',
    unread: true,
  },
  {
    id: '4',
    avatarUrl: 'https://i.pravatar.cc/150?u=4',
    name: "David Brown",
    lastMessage: "I am available this weekend if you'd like to schedule something.",
    timestamp: '2023-04-15T11:20:00Z',
    unread: false,
  },
  {
    id: '5',
    avatarUrl: 'https://i.pravatar.cc/150?u=5',
    name: 'Emma Wilson',
    lastMessage: "Perfect! That works for me. Let me know if anything changes.",
    timestamp: '2023-04-14T16:05:00Z',
    unread: false,
  }
];

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();

  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return format(date, 'h:mm a');
    } else {
      return format(date, 'MMM d');
    }
  };

  const handleConversationClick = (id: string) => {
    navigate(`/messages/${id}`);
  };

  return (
    <MainLayout 
      title="Messages" 
      description="Your conversations"
      showBreadcrumbs
    >
      <div className="flex flex-col h-[calc(100vh-240px)] bg-card rounded-lg shadow-sm">
        {/* Search and New Message */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages" 
                className="pl-8"
              />
            </div>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {mockConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleConversationClick(conversation.id)}
                className="flex items-center p-4 gap-3 hover:bg-accent/50 cursor-pointer transition-colors"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.avatarUrl} alt={conversation.name} />
                  <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium truncate">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {formatMessageDate(conversation.timestamp)}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${conversation.unread ? 'font-medium' : 'text-muted-foreground'}`}>
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unread && (
                  <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Empty State */}
        {mockConversations.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Start a conversation with an escort or wait for someone to message you.
            </p>
            <Button onClick={() => navigate('/escorts')}>
              Browse Escorts
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MessagesPage;
