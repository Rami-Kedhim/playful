
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import EnhancedAIMediaGenerator from '@/components/ai/EnhancedAIMediaGenerator';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const EnhancedAIPage: React.FC = () => {
  return (
    <UnifiedLayout
      title="Enhanced AI Studio"
      description="Generate high-quality AI content with DeepSeek and other advanced models"
    >
      <div className="container mx-auto py-6 max-w-7xl">
        <Alert variant="warning" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            This feature requires a Hugging Face API key with proper authentication. Please ensure 
            your API key is set in your Supabase Edge Function secrets.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="generator">
          <TabsList className="mb-6">
            <TabsTrigger value="generator">AI Generation Studio</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator">
            <EnhancedAIMediaGenerator />
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Available Models</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">DeepSeek Models</h4>
                    <p className="text-muted-foreground text-sm">State-of-the-art AI models for various tasks</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                      <li>DeepSeek-VL 7B: Vision-language model for image understanding and generation</li>
                      <li>DeepSeek-Coder 33B: Specialized for code generation and programming tasks</li>
                      <li>DeepSeek-LLM 67B: Large language model for text generation</li>
                      <li>DeepSeek-Math 7B: Model optimized for mathematical reasoning</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Stable Diffusion Models</h4>
                    <p className="text-muted-foreground text-sm">High-quality image generation</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                      <li>Realistic Vision V5: Photorealistic images with high detail</li>
                      <li>Stable Diffusion XL: Higher resolution and more detailed images</li>
                      <li>DreamShaper 8: Creative and artistic image generation</li>
                      <li>Waifu Diffusion: Anime and manga style images</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Video Generation</h4>
                    <p className="text-muted-foreground text-sm">Models for generating videos</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                      <li>ZeroScope V2: Video generation from text prompts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="about">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">About Enhanced AI Generation</h3>
                <p className="text-muted-foreground">
                  This module uses advanced AI models to generate high-quality images, videos, and text content.
                  It leverages cutting-edge models from DeepSeek and other providers through the Hugging Face API.
                </p>
                
                <h4 className="font-medium mt-4 mb-2">How it works</h4>
                <p className="text-sm text-muted-foreground">
                  Your prompts are sent securely to our backend which forwards them to the appropriate AI model.
                  We use Supabase Edge Functions to handle the API calls, ensuring your API keys remain secure.
                  Generated content is returned directly to your browser and is never stored on our servers.
                </p>
                
                <h4 className="font-medium mt-4 mb-2">Usage Guidelines</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Be specific in your prompts to get better results</li>
                  <li>Use negative prompts to avoid unwanted elements in generated images</li>
                  <li>Higher guidance scales result in images that more closely follow your prompt</li>
                  <li>More steps generally produce higher quality but take longer to generate</li>
                  <li>Use advanced options to fine-tune your generations</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UnifiedLayout>
  );
};

export default EnhancedAIPage;
