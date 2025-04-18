
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UberCoreService } from '@/types/ubercore';

interface ConfigurationPanelProps {
  service: UberCoreService;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ service }) => {
  const [config, setConfig] = useState({
    apiKey: '',
    endpoint: 'https://api.ubercore.ai',
    maxTokens: '1000',
    temperature: '0.7',
  });
  const [saving, setSaving] = useState(false);
  
  const handleSave = async () => {
    setSaving(true);
    
    try {
      await service.configure({
        apiKey: config.apiKey,
        endpoint: config.endpoint,
        maxTokens: parseInt(config.maxTokens),
        temperature: parseFloat(config.temperature),
      });
      
      // Get updated status after configuration
      await service.getStatus();
      
      alert('Configuration saved successfully!');
    } catch (error) {
      console.error('Error saving configuration:', error);
      alert('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>UberCore Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              name="apiKey"
              type="password"
              value={config.apiKey}
              onChange={handleChange}
              placeholder="Enter API key"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endpoint">API Endpoint</Label>
            <Input
              id="endpoint"
              name="endpoint"
              value={config.endpoint}
              onChange={handleChange}
              placeholder="Enter API endpoint"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxTokens">Max Tokens</Label>
              <Input
                id="maxTokens"
                name="maxTokens"
                type="number"
                value={config.maxTokens}
                onChange={handleChange}
                min="1"
                max="4096"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                name="temperature"
                type="number"
                value={config.temperature}
                onChange={handleChange}
                min="0"
                max="1"
                step="0.1"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleSave} 
            disabled={saving} 
            className="w-full"
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationPanel;
