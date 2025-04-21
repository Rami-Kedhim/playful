
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUserAIContext } from '@/hooks/useUserAIContext';
import { useToast } from '@/hooks/use-toast';

const AISettingsPanel: React.FC = () => {
  const { aiContext, isLoading, updatePreferences, resetAIContext } = useUserAIContext();
  const { toast } = useToast();
  
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [voicePitch, setVoicePitch] = useState(1);
  
  const handleSwitchChange = async (key: keyof typeof aiContext.preferences, value: boolean) => {
    if (isLoading || !aiContext) return;
    
    const success = await updatePreferences({ [key]: value });
    
    if (success) {
      toast({
        title: "Settings updated",
        description: `AI ${key} setting has been updated.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Update failed",
        description: "Could not update AI settings. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleVoiceSettingChange = async () => {
    if (isLoading || !aiContext) return;
    
    const success = await updatePreferences({
      voiceSettings: {
        voice: aiContext.preferences.voiceSettings?.voice || 'default',
        speed: voiceSpeed,
        pitch: voicePitch
      }
    });
    
    if (success) {
      toast({
        title: "Voice settings updated",
        description: "Your AI assistant voice settings have been updated.",
        variant: "default",
      });
    } else {
      toast({
        title: "Update failed",
        description: "Could not update voice settings. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleReset = async () => {
    if (isLoading) return;
    
    const success = await resetAIContext();
    
    if (success) {
      setVoiceSpeed(1);
      setVoicePitch(1);
      
      toast({
        title: "AI settings reset",
        description: "All AI settings have been reset to default values.",
        variant: "default",
      });
    } else {
      toast({
        title: "Reset failed",
        description: "Could not reset AI settings. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!aiContext) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Assistant Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">You need to be logged in to manage AI settings.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Assistant Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Privacy Settings</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="anonymized">Anonymized Mode</Label>
              <p className="text-sm text-muted-foreground">
                Don't use your personal data to personalize responses
              </p>
            </div>
            <Switch
              id="anonymized"
              checked={aiContext.preferences.anonymized}
              onCheckedChange={(checked) => handleSwitchChange('anonymized', checked)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="rememberConversations">Remember Conversations</Label>
              <p className="text-sm text-muted-foreground">
                Store conversation history for more contextual responses
              </p>
            </div>
            <Switch
              id="rememberConversations"
              checked={aiContext.preferences.rememberConversations}
              onCheckedChange={(checked) => handleSwitchChange('rememberConversations', checked)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Personalization</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="personalizedResponses">Personalized Responses</Label>
              <p className="text-sm text-muted-foreground">
                Tailor responses based on your preferences and history
              </p>
            </div>
            <Switch
              id="personalizedResponses"
              checked={aiContext.preferences.personalizedResponses}
              onCheckedChange={(checked) => handleSwitchChange('personalizedResponses', checked)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="adaptivePersonality">Adaptive Personality</Label>
              <p className="text-sm text-muted-foreground">
                Adjust AI personality based on your interaction style
              </p>
            </div>
            <Switch
              id="adaptivePersonality"
              checked={aiContext.preferences.adaptivePersonality}
              onCheckedChange={(checked) => handleSwitchChange('adaptivePersonality', checked)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="suggestContent">Content Suggestions</Label>
              <p className="text-sm text-muted-foreground">
                Suggest relevant content and profiles
              </p>
            </div>
            <Switch
              id="suggestContent"
              checked={aiContext.preferences.suggestContent}
              onCheckedChange={(checked) => handleSwitchChange('suggestContent', checked)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Voice Settings</h3>
          
          <div className="space-y-2">
            <Label htmlFor="voice-speed">Voice Speed</Label>
            <Slider
              id="voice-speed"
              min={0.5}
              max={2}
              step={0.1}
              value={[voiceSpeed]}
              onValueChange={(value) => setVoiceSpeed(value[0])}
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Slow</span>
              <span>Normal ({voiceSpeed.toFixed(1)}x)</span>
              <span>Fast</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="voice-pitch">Voice Pitch</Label>
            <Slider
              id="voice-pitch"
              min={0.5}
              max={1.5}
              step={0.1}
              value={[voicePitch]}
              onValueChange={(value) => setVoicePitch(value[0])}
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Normal ({voicePitch.toFixed(1)})</span>
              <span>High</span>
            </div>
          </div>
          
          <Button 
            onClick={handleVoiceSettingChange} 
            variant="outline" 
            size="sm"
            disabled={isLoading}
          >
            Save Voice Settings
          </Button>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Reset All Settings</h3>
              <p className="text-sm text-muted-foreground">
                Restore all AI settings to default values
              </p>
            </div>
            <Button 
              onClick={handleReset} 
              variant="destructive"
              disabled={isLoading}
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISettingsPanel;
