
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserAIContext } from '@/hooks/useUserAIContext';

const AISettingsPanel = () => {
  const { aiContext, updatePreferences, isLoading, resetAIContext } = useUserAIContext();
  const [voiceSettings, setVoiceSettings] = useState({
    voice: 'default',
    speed: 1.0,
    pitch: 1.0
  });

  // Handle toggle changes for boolean preferences
  const handleToggleChange = (key: string, value: boolean) => {
    if (aiContext) {
      updatePreferences({ [key]: value });
    }
  };

  // Handle voice settings changes
  const handleVoiceSettingChange = (key: string, value: any) => {
    setVoiceSettings(prev => ({ ...prev, [key]: value }));
    
    if (aiContext && key === 'voice') {
      updatePreferences({ voiceType: value });
    }
  };

  // Save voice settings
  const handleSaveVoiceSettings = () => {
    if (aiContext) {
      updatePreferences({ 
        voiceSettings: {
          voice: voiceSettings.voice,
          speed: voiceSettings.speed, 
          pitch: voiceSettings.pitch
        }
      });
    }
  };

  // Reset all AI settings
  const handleReset = () => {
    if (aiContext) {
      resetAIContext();
    }
  };

  if (!aiContext) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>AI Settings</CardTitle>
          <CardDescription>Loading settings...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Settings</CardTitle>
        <CardDescription>Customize how AI interacts with you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Personalization</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable AI</p>
              <p className="text-sm text-muted-foreground">Allow AI to provide personalized experiences</p>
            </div>
            <Switch 
              checked={aiContext.isEnabled} 
              onCheckedChange={(checked) => {
                if (aiContext) {
                  updatePreferences({ isEnabled: checked });
                }
              }} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Personalized Responses</p>
              <p className="text-sm text-muted-foreground">Tailor AI responses based on your preferences</p>
            </div>
            <Switch 
              checked={aiContext.preferences.personalizedResponses} 
              onCheckedChange={(checked) => handleToggleChange('personalizedResponses', checked)} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Remember Conversations</p>
              <p className="text-sm text-muted-foreground">Allow AI to reference past conversations</p>
            </div>
            <Switch 
              checked={aiContext.preferences.rememberConversations} 
              onCheckedChange={(checked) => handleToggleChange('rememberConversations', checked)} 
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Voice Settings</h3>
          
          <div className="space-y-2">
            <p className="font-medium">Voice Type</p>
            <Select 
              value={voiceSettings.voice} 
              onValueChange={(value) => handleVoiceSettingChange('voice', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="feminine">Feminine</SelectItem>
                <SelectItem value="masculine">Masculine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">Speed</p>
              <p className="text-sm">{voiceSettings.speed.toFixed(1)}x</p>
            </div>
            <Slider 
              min={0.5} 
              max={2} 
              step={0.1} 
              value={[voiceSettings.speed]} 
              onValueChange={(values) => handleVoiceSettingChange('speed', values[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">Pitch</p>
              <p className="text-sm">{voiceSettings.pitch.toFixed(1)}</p>
            </div>
            <Slider 
              min={0.5} 
              max={1.5} 
              step={0.1}
              value={[voiceSettings.pitch]} 
              onValueChange={(values) => handleVoiceSettingChange('pitch', values[0])}
            />
          </div>

          <Button onClick={handleSaveVoiceSettings} disabled={isLoading}>
            Save Voice Settings
          </Button>
        </div>

        <div className="pt-4 border-t">
          <Button variant="destructive" onClick={handleReset} disabled={isLoading}>
            Reset AI Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISettingsPanel;
