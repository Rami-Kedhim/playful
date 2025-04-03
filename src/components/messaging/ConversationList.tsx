
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Conversation } from "@/services/messaging";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  loading: boolean;
}

export function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
  loading
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter(conversation => 
    conversation.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Conversations</CardTitle>
        <CardDescription>Your recent conversations</CardDescription>
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-2"
        />
      </CardHeader>
      <CardContent className="px-2">
        {loading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : filteredConversations.length > 0 ? (
          <div className="space-y-1">
            {filteredConversations.map(conversation => (
              <ConversationItem 
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversation?.id === conversation.id}
                onSelect={() => onSelectConversation(conversation)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-4 text-muted-foreground">
            {searchQuery ? "No matching conversations found" : "No conversations yet"}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
}

function ConversationItem({ conversation, isSelected, onSelect }: ConversationItemProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center p-3 rounded-md hover:bg-muted text-left ${
        isSelected ? 'bg-muted' : ''
      }`}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={conversation.participant.avatar_url || undefined} />
          <AvatarFallback>
            {conversation.participant.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {conversation.unread_count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {conversation.unread_count > 9 ? '9+' : conversation.unread_count}
          </span>
        )}
      </div>
      
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between">
          <p className="font-medium truncate">{conversation.participant.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(conversation.last_message_time), { addSuffix: true })}
          </p>
        </div>
        <p className="text-sm text-muted-foreground truncate">{conversation.last_message}</p>
      </div>
    </button>
  );
}
