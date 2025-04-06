
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loader2, Plus, Send, Image, Mic } from 'lucide-react';
import useAICompanion from '@/hooks/useAICompanion';
import AICompanionCard from '@/components/ai-companion/AICompanionCard';
import AICompanionChatMessage from '@/components/ai-companion/AICompanionChatMessage';
import AICompanionProfile from '@/components/ai-companion/AICompanionProfile';

/**
 * AI Companion Page
 */
const AICompanionPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  
  // For demo purposes, we'll use a mock user ID
  const mockUserId = 'user-123';
  
  const { 
    companions,
    presetCompanions,
    selectedCompanion,
    messages,
    loading,
    isLoadingMessages,
    selectCompanion,
    sendMessage,
    generateContent
  } = useAICompanion(mockUserId);
  
  const handleSendMessage = async () => {
    if (!message.trim() || !selectedCompanion) return;
    
    await sendMessage(message.trim());
    setMessage('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleGenerateImage = async () => {
    if (!selectedCompanion) return;
    
    await generateContent({
      prompt: "Generate a selfie image based on my profile",
      type: "image"
    });
  };
  
  const handleGenerateVoice = async () => {
    if (!selectedCompanion) return;
    
    await generateContent({
      prompt: "Record a greeting message for the user",
      type: "voice"
    });
  };
  
  return (
    <div className="container py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My AI Companion</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with AI companions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold mb-2">My Companions</h2>
          
          <Button variant="outline" className="w-full justify-start">
            <Plus className="h-4 w-4 mr-2" />
            Create New Companion
          </Button>
          
          <div className="space-y-4 mt-4">
            {loading ? (
              <Card className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </Card>
            ) : (
              <>
                {/* User's custom companions */}
                {companions.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">My Custom Companions</h3>
                    <div className="space-y-2">
                      {companions.map((companion) => (
                        <AICompanionCard 
                          key={companion.id}
                          companion={companion}
                          onSelect={selectCompanion}
                          isSelected={selectedCompanion?.id === companion.id}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Preset companions */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Preset Companions</h3>
                  <div className="space-y-2">
                    {presetCompanions.map((companion) => (
                      <AICompanionCard 
                        key={companion.id}
                        companion={companion}
                        onSelect={selectCompanion}
                        isSelected={selectedCompanion?.id === companion.id}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-3">
          {selectedCompanion ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
                <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
                <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="mt-4">
                {/* Chat messages */}
                <div className="flex flex-col h-[60vh] border rounded-md overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {isLoadingMessages ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <h3 className="text-lg font-medium mb-2">Start Chatting with {selectedCompanion.name}</h3>
                        <p className="text-muted-foreground">
                          Say hello and start your conversation with {selectedCompanion.name}.
                        </p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <AICompanionChatMessage
                          key={msg.id}
                          message={msg}
                          companionName={selectedCompanion.name}
                          companionAvatar={selectedCompanion.avatar_url}
                        />
                      ))
                    )}
                  </div>
                  
                  {/* Chat input */}
                  <div className="border-t p-3">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost"
                        size="icon"
                        onClick={handleGenerateImage}
                      >
                        <Image className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="ghost"
                        size="icon"
                        onClick={handleGenerateVoice}
                      >
                        <Mic className="h-5 w-5" />
                      </Button>
                      <Input
                        placeholder={`Message ${selectedCompanion.name}...`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="profile" className="mt-4">
                <AICompanionProfile companion={selectedCompanion} />
              </TabsContent>
              
              <TabsContent value="content" className="mt-4">
                <div className="grid gap-4">
                  <h2 className="text-xl font-semibold">Premium Content</h2>
                  <p className="text-muted-foreground">
                    Unlock exclusive images, voice messages, and more from {selectedCompanion.name}.
                    This feature is coming soon.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
              <h3 className="text-xl font-medium mb-4">Select a Companion</h3>
              <p className="text-muted-foreground mb-6">
                Choose an AI companion from the list to start chatting or view their profile.
              </p>
              <Button 
                variant="outline"
                className="mx-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your Own Companion
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AICompanionPage;
