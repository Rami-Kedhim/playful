import React, { useState, useEffect } from 'react';
import { lucieAI } from '@/core/Lucie';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LucieAIAssistantProps {
  className?: string;
}

const LucieAIAssistant: React.FC<LucieAIAssistantProps> = ({ className }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModerated, setIsModerated] = useState(true);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const initializeLucie = async () => {
      try {
        const initResult = await lucieAI.initialize();
        if (initResult) {
          console.log("Lucie AI Initialized Successfully");
        } else {
          console.error("Lucie AI Initialization Failed");
        }
      } catch (error) {
        console.error("Error initializing Lucie AI:", error);
      }
    };

    initializeLucie();
  }, []);

  const handleGenerateText = async () => {
    setIsLoading(true);
    try {
      const moderated = await lucieAI.moderateContent(prompt);
      setIsModerated(moderated);

      if (moderated) {
        const generatedText = await lucieAI.generateText(prompt);
        setResponse(generatedText);
        setChatHistory([...chatHistory, `You: ${prompt}`, `Lucie: ${generatedText}`]);
      } else {
        setResponse("Your prompt was flagged and could not be processed.");
        setChatHistory([...chatHistory, `You: ${prompt}`, `Lucie: Your prompt was flagged and could not be processed.`]);
      }
    } catch (error) {
      console.error("Error generating text:", error);
      setResponse("An error occurred while generating the text.");
      setChatHistory([...chatHistory, `You: ${prompt}`, `Lucie: An error occurred while generating the text.`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(response)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          description: "The AI response has been copied to your clipboard.",
        });
      })
      .catch(err => {
        toast({
          title: "Copy failed",
          description: "Failed to copy the AI response to your clipboard.",
          variant: "destructive",
        });
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Lucie AI Assistant</CardTitle>
          <CardDescription>
            Interact with Lucie AI to generate text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <Button onClick={handleGenerateText} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Text"
            )}
          </Button>
        </CardContent>
        {response && (
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Generated Response</h4>
              <Button variant="secondary" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <div className="relative rounded-md border">
              <ScrollArea className="h-[200px] rounded-md pr-2">
                <div className="p-4 whitespace-pre-line break-words">
                  {response}
                </div>
              </ScrollArea>
            </div>
            {!isModerated && (
              <Badge variant="destructive">
                Flagged Content
              </Badge>
            )}
          </CardFooter>
        )}
      </Card>

      {chatHistory.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Chat History</CardTitle>
            <CardDescription>
              Previous interactions with Lucie AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] rounded-md">
              <div className="flex flex-col space-y-4 p-4">
                {chatHistory.map((message, index) => (
                  <div key={index} className="flex items-start">
                    {message.startsWith("You:") ? (
                      <>
                        <Avatar className="mr-3 h-8 w-8">
                          <AvatarImage src="https://github.com/shadcn.png" alt="Your Avatar" />
                          <AvatarFallback>UE</AvatarFallback>
                        </Avatar>
                        <div className="text-sm text-muted-foreground">{message}</div>
                      </>
                    ) : (
                      <>
                        <Avatar className="mr-3 h-8 w-8">
                          <AvatarImage src="/images/lucie-avatar.png" alt="Lucie Avatar" />
                          <AvatarFallback>LA</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">{message}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LucieAIAssistant;
