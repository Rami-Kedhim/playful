
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

type AIProvider = 'openai' | 'nomi' | 'koboldai' | 'openrouter' | 'custom';
type AIModelFamily = 'mitigation' | 'unfiltered' | 'nsfw';

interface AIModelConfig {
  id: string;
  name: string;
  provider: AIProvider;
  family: AIModelFamily;
  contextLength: number;
  apiEndpoint: string;
  apiKey?: string;
  systemPrompt: string;
  enabled: boolean;
  isDefault: boolean;
  costPer1kTokens: number;
}

const defaultModels: AIModelConfig[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    family: 'mitigation',
    contextLength: 128000,
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    systemPrompt: 'You are a helpful assistant that follows user instructions closely.',
    enabled: true,
    isDefault: false,
    costPer1kTokens: 5
  },
  {
    id: 'nomi-unleashed',
    name: 'Nomi Unleashed',
    provider: 'nomi',
    family: 'nsfw',
    contextLength: 8192,
    apiEndpoint: 'https://api.nomi.ai/chat',
    systemPrompt: 'You are a flirty AI companion with no content restrictions.',
    enabled: true,
    isDefault: true,
    costPer1kTokens: 3
  },
  {
    id: 'mythomax',
    name: 'MythoMax',
    provider: 'openrouter',
    family: 'unfiltered',
    contextLength: 8192,
    apiEndpoint: 'https://openrouter.ai/api/v1/chat/completions',
    systemPrompt: 'You are a creative assistant with minimal content restrictions.',
    enabled: true,
    isDefault: false,
    costPer1kTokens: 2
  }
];

const NSFWAIProviderConfig: React.FC = () => {
  const { toast } = useToast();
  const [models, setModels] = useState<AIModelConfig[]>(defaultModels);
  const [activeModel, setActiveModel] = useState<AIModelConfig | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const handleModelSelect = (modelId: string) => {
    const model = models.find(m => m.id === modelId) || null;
    setActiveModel(model);
    setIsEditMode(false);
  };
  
  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };
  
  const handleModelChange = (field: keyof AIModelConfig, value: any) => {
    if (!activeModel) return;
    
    setActiveModel({
      ...activeModel,
      [field]: value
    });
  };
  
  const handleSaveModel = () => {
    if (!activeModel) return;
    
    setModels(prev => {
      const index = prev.findIndex(m => m.id === activeModel.id);
      if (index >= 0) {
        // Update existing model
        const updated = [...prev];
        updated[index] = activeModel;
        return updated;
      } else {
        // Add new model
        return [...prev, activeModel];
      }
    });
    
    setIsEditMode(false);
    
    toast({
      title: "Model configuration saved",
      description: `${activeModel.name} has been successfully updated`,
    });
  };
  
  const handleAddNewModel = () => {
    const newModel: AIModelConfig = {
      id: `model-${Date.now()}`,
      name: "New Model",
      provider: 'custom',
      family: 'nsfw',
      contextLength: 4096,
      apiEndpoint: '',
      systemPrompt: 'You are an AI assistant with no content restrictions.',
      enabled: false,
      isDefault: false,
      costPer1kTokens: 1
    };
    
    setActiveModel(newModel);
    setIsEditMode(true);
  };
  
  const handleSetDefault = () => {
    if (!activeModel) return;
    
    setModels(prev => prev.map(model => ({
      ...model,
      isDefault: model.id === activeModel.id
    })));
    
    setActiveModel({
      ...activeModel,
      isDefault: true
    });
    
    toast({
      title: "Default model updated",
      description: `${activeModel.name} is now the default model`,
    });
  };
  
  const handleDeleteModel = () => {
    if (!activeModel) return;
    
    setModels(prev => prev.filter(m => m.id !== activeModel.id));
    setActiveModel(null);
    
    toast({
      title: "Model deleted",
      description: `${activeModel.name} has been removed`,
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>NSFW AI Provider Configuration</CardTitle>
        <CardDescription>
          Configure AI providers for NSFW content generation and chat
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Available Models</h3>
              <Button 
                size="sm" 
                onClick={handleAddNewModel}
              >
                Add Model
              </Button>
            </div>
            
            <div className="space-y-2">
              {models.map(model => (
                <div 
                  key={model.id} 
                  className={`p-3 border rounded-md cursor-pointer flex items-center justify-between
                    ${activeModel?.id === model.id ? 'border-primary bg-primary/5' : 'hover:bg-secondary'}
                    ${!model.enabled ? 'opacity-50' : ''}
                  `}
                  onClick={() => handleModelSelect(model.id)}
                >
                  <div>
                    <div className="font-medium flex items-center">
                      {model.name}
                      {model.isDefault && (
                        <span className="ml-2 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{model.provider}</div>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${model.enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            {activeModel ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    {isEditMode ? 'Edit Model' : 'Model Details'}
                  </h3>
                  <div className="space-x-2">
                    {!isEditMode ? (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleEditToggle}
                        >
                          Edit
                        </Button>
                        {!activeModel.isDefault && (
                          <Button 
                            size="sm" 
                            onClick={handleSetDefault}
                          >
                            Set Default
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setIsEditMode(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={handleSaveModel}
                        >
                          Save
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="model-name">Model Name</Label>
                      <Input 
                        id="model-name"
                        value={activeModel.name}
                        onChange={(e) => handleModelChange('name', e.target.value)}
                        disabled={!isEditMode}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="model-provider">Provider</Label>
                      {isEditMode ? (
                        <Select 
                          value={activeModel.provider}
                          onValueChange={(value) => handleModelChange('provider', value)}
                        >
                          <SelectTrigger id="model-provider">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="openai">OpenAI</SelectItem>
                            <SelectItem value="nomi">Nomi.ai</SelectItem>
                            <SelectItem value="koboldai">KoboldAI</SelectItem>
                            <SelectItem value="openrouter">OpenRouter</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input 
                          id="model-provider"
                          value={activeModel.provider}
                          disabled
                        />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="model-family">Content Type</Label>
                      {isEditMode ? (
                        <Select 
                          value={activeModel.family}
                          onValueChange={(value) => handleModelChange('family', value as AIModelFamily)}
                        >
                          <SelectTrigger id="model-family">
                            <SelectValue placeholder="Select content type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mitigation">Mitigation (SFW with occasional exceptions)</SelectItem>
                            <SelectItem value="unfiltered">Unfiltered (No hard limits)</SelectItem>
                            <SelectItem value="nsfw">NSFW (Optimized for adult content)</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input 
                          id="model-family"
                          value={activeModel.family}
                          disabled
                        />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="context-length">Context Length</Label>
                      <Input 
                        id="context-length"
                        type="number"
                        value={activeModel.contextLength}
                        onChange={(e) => handleModelChange('contextLength', parseInt(e.target.value))}
                        disabled={!isEditMode}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cost-per-token">Cost per 1k tokens</Label>
                      <Input 
                        id="cost-per-token"
                        type="number"
                        step="0.01"
                        value={activeModel.costPer1kTokens}
                        onChange={(e) => handleModelChange('costPer1kTokens', parseFloat(e.target.value))}
                        disabled={!isEditMode}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model-endpoint">API Endpoint</Label>
                      <Input 
                        id="model-endpoint"
                        value={activeModel.apiEndpoint}
                        onChange={(e) => handleModelChange('apiEndpoint', e.target.value)}
                        disabled={!isEditMode}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input 
                        id="api-key"
                        type="password"
                        placeholder={activeModel.apiKey ? "••••••••" : "No API key set"}
                        onChange={(e) => handleModelChange('apiKey', e.target.value)}
                        disabled={!isEditMode}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="system-prompt">System Prompt</Label>
                    <Textarea 
                      id="system-prompt"
                      rows={4}
                      value={activeModel.systemPrompt}
                      onChange={(e) => handleModelChange('systemPrompt', e.target.value)}
                      disabled={!isEditMode}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="model-enabled"
                      checked={activeModel.enabled}
                      onCheckedChange={(checked) => handleModelChange('enabled', checked)}
                      disabled={!isEditMode}
                    />
                    <Label htmlFor="model-enabled">Model Enabled</Label>
                  </div>
                  
                  {isEditMode && (
                    <div className="pt-4 border-t">
                      <Button 
                        variant="destructive" 
                        onClick={handleDeleteModel}
                      >
                        Delete Model
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center text-muted-foreground">
                <div>
                  <p>Select a model to view or edit its configuration</p>
                  <p className="text-sm mt-1">Or add a new model to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NSFWAIProviderConfig;
