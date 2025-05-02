
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Check, Key, RefreshCcw } from 'lucide-react';
import { apiIntegration } from '@/services/apis/ApiIntegrations';

const ApiConfigurationPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('huggingface');
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    huggingface: '',
    elevenlabs: '',
    openai: '',
    geolocation: '',
  });
  const [status, setStatus] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load API status when component mounts
  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = () => {
    const providers = ['huggingface', 'elevenlabs', 'openai', 'geolocation', 'moderation', 'translation'];
    
    const newStatus: Record<string, boolean> = {};
    providers.forEach(provider => {
      newStatus[provider] = apiIntegration.isApiAvailable(provider);
    });
    
    setStatus(newStatus);
  };

  const handleInputChange = (provider: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: value }));
  };

  const handleSave = async (provider: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // In a real app, this would securely save the API key
      // For now, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccess(`${provider} API key saved successfully!`);
      
      // Refresh status
      checkApiStatus();
    } catch (err: any) {
      setError(err.message || 'Failed to save API key');
    } finally {
      setLoading(false);
    }
    
    // Clear success message after a delay
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">API Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert variant="default" className="mb-4 bg-green-50 border-green-200 text-green-800">
            <Check className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="huggingface">Hugging Face</TabsTrigger>
            <TabsTrigger value="elevenlabs">ElevenLabs</TabsTrigger>
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="other">Other APIs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="huggingface" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Hugging Face API</h3>
              <div className={`px-2 py-1 rounded-full text-xs flex items-center ${
                status.huggingface ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {status.huggingface ? 'Configured' : 'Not Configured'}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Hugging Face offers thousands of free AI models for text generation, image creation, and more.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="huggingface-key">API Key</Label>
              <div className="flex space-x-2">
                <Input
                  id="huggingface-key"
                  type="password"
                  placeholder="Enter Hugging Face API key"
                  value={apiKeys.huggingface}
                  onChange={(e) => handleInputChange('huggingface', e.target.value)}
                />
                <Button 
                  onClick={() => handleSave('huggingface')}
                  disabled={loading || !apiKeys.huggingface}
                >
                  {loading ? <RefreshCcw className="h-4 w-4 animate-spin mr-2" /> : <Key className="h-4 w-4 mr-2" />}
                  Save
                </Button>
              </div>
            </div>
            
            <Alert className="mt-4 bg-blue-50 border-blue-100">
              <AlertDescription>
                <p className="font-medium">Recommended Models:</p>
                <ul className="list-disc pl-5 mt-1 text-sm">
                  <li>Text Generation: gpt2</li>
                  <li>Image Generation: stabilityai/stable-diffusion-xl-base-1.0</li>
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="elevenlabs" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">ElevenLabs API</h3>
              <div className={`px-2 py-1 rounded-full text-xs flex items-center ${
                status.elevenlabs ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {status.elevenlabs ? 'Configured' : 'Not Configured'}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              ElevenLabs provides natural-sounding text-to-speech with 10,000 characters free monthly.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="elevenlabs-key">API Key</Label>
              <div className="flex space-x-2">
                <Input
                  id="elevenlabs-key"
                  type="password"
                  placeholder="Enter ElevenLabs API key"
                  value={apiKeys.elevenlabs}
                  onChange={(e) => handleInputChange('elevenlabs', e.target.value)}
                />
                <Button 
                  onClick={() => handleSave('elevenlabs')}
                  disabled={loading || !apiKeys.elevenlabs}
                >
                  {loading ? <RefreshCcw className="h-4 w-4 animate-spin mr-2" /> : <Key className="h-4 w-4 mr-2" />}
                  Save
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="openai" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">OpenAI API</h3>
              <div className={`px-2 py-1 rounded-full text-xs flex items-center ${
                status.openai ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {status.openai ? 'Configured' : 'Not Configured'}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              OpenAI provides powerful language models like GPT-4o and content moderation capabilities.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="openai-key">API Key</Label>
              <div className="flex space-x-2">
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="Enter OpenAI API key"
                  value={apiKeys.openai}
                  onChange={(e) => handleInputChange('openai', e.target.value)}
                />
                <Button 
                  onClick={() => handleSave('openai')}
                  disabled={loading || !apiKeys.openai}
                >
                  {loading ? <RefreshCcw className="h-4 w-4 animate-spin mr-2" /> : <Key className="h-4 w-4 mr-2" />}
                  Save
                </Button>
              </div>
            </div>
            
            <Alert className="mt-4 bg-blue-50 border-blue-100">
              <AlertDescription>
                <div className="text-sm">
                  <p className="font-medium">Benefits:</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Also provides free content moderation API</li>
                    <li>Recommended model: gpt-4o-mini (fastest and most cost-effective)</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="other" className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Geolocation API (Abstract)</h3>
                <div className={`px-2 py-1 rounded-full text-xs flex items-center ${
                  status.geolocation ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {status.geolocation ? 'Configured' : 'Not Configured'}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                IP Geolocation API provides 20,000 free requests per month for location detection.
              </p>
              
              <div className="flex space-x-2">
                <Input
                  type="password"
                  placeholder="Enter Abstract API key"
                  value={apiKeys.geolocation}
                  onChange={(e) => handleInputChange('geolocation', e.target.value)}
                />
                <Button 
                  onClick={() => handleSave('geolocation')} 
                  disabled={loading || !apiKeys.geolocation}
                >
                  Save
                </Button>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">LibreTranslate API</h3>
                <div className={`px-2 py-1 rounded-full text-xs flex items-center bg-green-100 text-green-800`}>
                  Ready (No Key Required)
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                LibreTranslate is a free and open-source machine translation API that can be used without an API key.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <h3 className="text-lg font-medium mb-4">API Status Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(status).map(([provider, isAvailable]) => (
              <div key={provider} className="flex flex-col p-3 border rounded-md">
                <div className="capitalize font-medium">{provider}</div>
                <div className={`mt-1 text-sm ${isAvailable ? 'text-green-600' : 'text-amber-600'}`}>
                  {isAvailable ? 'Available' : 'Not Configured'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiConfigurationPanel;
