import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useAIModelGenerator } from '@/hooks/ai/useAIModelGenerator';
import { ProcessingStatus } from '@/types/ai-profile';
import { AlertCircle, CheckCircle2, Timer, Loader2 } from 'lucide-react';

interface AIModelGenerationDashboardProps {
  onSuccess?: (model: any) => void;
}

const AIModelGenerationDashboard: React.FC<AIModelGenerationDashboardProps> = ({ onSuccess }) => {
  const [personalityType, setPersonalityType] = useState<string>('friendly');
  const [modelName, setModelName] = useState<string>('');
  const [appearance, setAppearance] = useState<string>('default');
  const [voiceType, setVoiceType] = useState<string>('female');
  
  const { 
    isGenerating,
    progress,
    currentStage,
    processingStatus,
    error,
    generatedModel,
    generateModel,
    cancelGeneration
  } = useAIModelGenerator({ onSuccess });

  const handleGenerateModel = () => {
    if (!modelName) return;
    
    generateModel({
      name: modelName,
      personality: personalityType,
      appearance,
      voice: voiceType
    });
  };
  
  const renderStatusIcon = () => {
    switch (processingStatus.status) {
      case ProcessingStatus.COMPLETED:
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case ProcessingStatus.FAILED:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case ProcessingStatus.PROCESSING:
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case ProcessingStatus.PENDING:
        return <Timer className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Model Generation</CardTitle>
        <CardDescription>
          Create a new AI Companion model with custom personality, appearance, and voice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Model Name
            </label>
            <Input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Enter a name for your AI companion"
              disabled={isGenerating}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Personality Type
            </label>
            <Select
              value={personalityType}
              onValueChange={setPersonalityType}
              disabled={isGenerating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select personality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="flirty">Flirty</SelectItem>
                <SelectItem value="playful">Playful</SelectItem>
                <SelectItem value="mature">Mature</SelectItem>
                <SelectItem value="shy">Shy</SelectItem>
                <SelectItem value="dominant">Dominant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Appearance
            </label>
            <Select
              value={appearance}
              onValueChange={setAppearance}
              disabled={isGenerating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select appearance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="elegant">Elegant</SelectItem>
                <SelectItem value="sporty">Sporty</SelectItem>
                <SelectItem value="exotic">Exotic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Voice Type
            </label>
            <Select
              value={voiceType}
              onValueChange={setVoiceType}
              disabled={isGenerating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="neutral">Gender Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isGenerating && (
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span>{currentStage}</span>
                <span>{processingStatus.completedCount} of {processingStatus.totalCount}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {processingStatus.status === ProcessingStatus.PROCESSING ? 
                  'Processing... Please wait.' : processingStatus.message || ''}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 text-red-500 p-3 rounded-md text-sm mt-4 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span>Error: {typeof error === 'string' ? error : error.message || 'An unknown error occurred'}</span>
            </div>
          )}

          {generatedModel && processingStatus.status === ProcessingStatus.COMPLETED && (
            <div className="bg-green-500/10 text-green-500 p-3 rounded-md text-sm mt-4 flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Model generated successfully!</p>
                <p className="text-green-400">
                  {generatedModel.name} is ready to use.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          {renderStatusIcon()}
          <span className="text-sm">
            {processingStatus.status === ProcessingStatus.IDLE ? 'Ready to generate' : processingStatus.status}
          </span>
        </div>
        <div className="flex gap-2">
          {isGenerating ? (
            <Button variant="outline" onClick={cancelGeneration}>
              Cancel
            </Button>
          ) : (
            <Button 
              onClick={handleGenerateModel} 
              disabled={!modelName || generatedModel !== null}
            >
              Generate Model
            </Button>
          )}
          {generatedModel && (
            <Button 
              variant="default"
              onClick={() => {
                if (onSuccess) onSuccess(generatedModel);
              }}
            >
              Use This Model
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIModelGenerationDashboard;
