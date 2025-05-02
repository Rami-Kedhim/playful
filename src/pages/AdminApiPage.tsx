
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ApiConfigurationPanel from '@/components/admin/ApiConfigurationPanel';
import { Button } from '@/components/ui/button';
import { RefreshCw, FilePlus, Layers } from 'lucide-react';
import { apiIntegration } from '@/services/apis/ApiIntegrations';

const AdminApiPage: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  
  const handleRefresh = async () => {
    setRefreshing(true);
    
    // Simulate API refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setRefreshing(false);
  };
  
  const testApis = async () => {
    // Test each API and log results
    console.log('Testing APIs...');
    
    // Test Hugging Face
    if (apiIntegration.isApiAvailable('huggingface')) {
      const result = await apiIntegration.executeApiRequest(
        'huggingface',
        'gpt2',
        { inputs: 'Hello, I am' },
        {}
      );
      console.log('Hugging Face test:', result);
    }
    
    // Test ElevenLabs
    if (apiIntegration.isApiAvailable('elevenlabs')) {
      console.log('ElevenLabs config:', apiIntegration.getApiConfig('elevenlabs'));
    }
    
    // Test OpenAI
    if (apiIntegration.isApiAvailable('openai')) {
      console.log('OpenAI config:', apiIntegration.getApiConfig('openai'));
    }
    
    // Test Translation
    const translationTest = await apiIntegration.executeApiRequest(
      'translation',
      '',
      { q: 'Hello world', target: 'es' },
      {}
    );
    console.log('Translation test:', translationTest);
    
    // Log all API configs
    const apiProviders = ['huggingface', 'elevenlabs', 'openai', 'geolocation', 'moderation', 'translation'];
    console.log('All API configs:', apiProviders.map(p => ({
      provider: p,
      config: apiIntegration.getApiConfig(p),
      available: apiIntegration.isApiAvailable(p)
    })));
  };
  
  return (
    <MainLayout title="API Configuration" description="Manage external API integrations">
      <div className="space-y-6">
        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            onClick={handleRefresh} 
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Status
          </Button>
          <Button 
            variant="outline" 
            onClick={testApis}
          >
            <Layers className="h-4 w-4 mr-2" />
            Test APIs
          </Button>
          <Button>
            <FilePlus className="h-4 w-4 mr-2" />
            Add Custom API
          </Button>
        </div>
        
        <ApiConfigurationPanel />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border p-6 rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-4">Free API Credits</h3>
            <p className="text-muted-foreground mb-4">
              The following free tier limits apply to the recommended APIs:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">Hugging Face: </span> 
                  <span className="text-muted-foreground">30,000 requests per month free tier</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">ElevenLabs: </span> 
                  <span className="text-muted-foreground">10,000 characters free per month</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">OpenAI: </span> 
                  <span className="text-muted-foreground">Free trial credits for new accounts</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">IP Geolocation: </span> 
                  <span className="text-muted-foreground">20,000 requests per month free</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">LibreTranslate: </span> 
                  <span className="text-muted-foreground">Free without API key (rate limited)</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="border p-6 rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-4">API Implementation</h3>
            <p className="text-muted-foreground mb-4">
              The UberPersona platform uses a unified API integration service that connects to the NeuralHub system.
            </p>
            
            <div className="text-sm space-y-1">
              <div><span className="font-semibold">File:</span> ApiIntegrations.ts</div>
              <div><span className="font-semibold">Service:</span> ApiIntegrationService</div>
              <div><span className="font-semibold">Location:</span> src/services/apis/</div>
              <div><span className="font-semibold">Connected with:</span> NeuralHub/BrainHub</div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Usage example:</h4>
              <div className="bg-muted p-3 rounded text-sm overflow-auto">
                <code>{`
import { apiIntegration } from '@/services/apis/ApiIntegrations';

// Generate text with Hugging Face
const result = await apiIntegration.executeApiRequest(
  'huggingface',
  'gpt2',
  { inputs: 'Hello, world!' }
);

// Convert text to speech
const audioUrl = await apiIntegration.executeApiRequest(
  'elevenlabs',
  'text-to-speech/EXAVITQu4vr4xnSDxMaL',
  { text: 'Welcome to UberPersona!' }
);
                `}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminApiPage;
