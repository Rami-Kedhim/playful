import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useSpeechSynthesis } from 'react-speech-kit';
import { lucieAI, lucieOrchestrator } from '@/core';
import { GenerateContentParams } from '@/types/core-systems';

const LucieAIAssistant: React.FC = () => {
  const [userMessage, setUserMessage] = useState('');
  const [assistantMessage, setAssistantMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { speak, speaking, cancel } = useSpeechSynthesis();
  const { toast } = useToast();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Initialize Lucie or perform other setup tasks
    console.log('LucieAIAssistant is ready.');
  }, []);

  const speakText = (text: string) => {
    if (!isMuted) {
      speak({ text });
    }
  };

  const stopSpeaking = () => {
    cancel();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && speaking) {
      stopSpeaking();
    }
  };

  const sendMessageToLucie = async (message: string) => {
    if (!message.trim()) return;
    
    try {
      setIsProcessing(true);
      
      // Check content safety if available
      if (lucieOrchestrator && typeof lucieOrchestrator.isSafeContent === 'function') {
        const safeCheck = await lucieOrchestrator.isSafeContent(message);
        if (!safeCheck.safe) {
          toast({
            title: "Content Warning",
            description: "Your message was flagged as potentially unsafe. Please revise.",
            variant: "destructive",
          });
          return;
        }
      }

      // Generate AI response
      const params = {
        prompt: message,
        options: {
          maxTokens: 500,
          temperature: 0.7
        }
      };
      
      const response = await lucieAI.generateContent(params);
      const responseContent: string = response.text || response.content || "I'm not sure how to respond to that.";
      
      setAssistantMessage(responseContent);
      speakText(responseContent);
      
      setUserMessage('');
    } catch (error) {
      toast({
        title: "AI Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      });
      console.error("Lucie AI error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lucie AI Assistant</CardTitle>
        <CardDescription>
          Get assistance from Lucie, your AI companion.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/images/avatars/lucie.png" alt="Lucie AI" />
            <AvatarFallback>LA</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">Lucie</h4>
            <p className="text-sm text-muted-foreground">
              Your AI assistant
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Input
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            disabled={isProcessing}
          />
          <Button
            onClick={() => sendMessageToLucie(userMessage)}
            disabled={isProcessing || !userMessage.trim()}
            className="w-full"
          >
            {isProcessing ? 'Processing...' : 'Send'}
          </Button>
        </div>

        {assistantMessage && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Lucie's Response:</p>
            <div className="p-3 rounded-md bg-muted">
              {assistantMessage}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LucieAIAssistant;
