
import React from 'react';
import { EmotionalState } from '@/types/ai-personality';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smile, 
  Frown, 
  Meh, 
  Heart, 
  Zap, 
  AlertTriangle,
  Eye
} from 'lucide-react';

interface AIEmotionStatusProps {
  emotionalState: EmotionalState;
  compact?: boolean;
  showIntensity?: boolean;
}

const getEmotionColor = (emotion: string): string => {
  switch (emotion.toLowerCase()) {
    case 'joy':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'trust':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'fear':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'surprise':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'sadness':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'anger':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'anticipation':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'interest':
      return 'bg-teal-100 text-teal-800 border-teal-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getEmotionIcon = (emotion: string) => {
  switch (emotion.toLowerCase()) {
    case 'joy':
      return <Smile className="h-4 w-4" />;
    case 'trust':
      return <Heart className="h-4 w-4" />;
    case 'fear':
      return <AlertTriangle className="h-4 w-4" />;
    case 'surprise':
      return <Zap className="h-4 w-4" />;
    case 'sadness':
      return <Frown className="h-4 w-4" />;
    case 'anger':
      return <AlertTriangle className="h-4 w-4" />;
    case 'anticipation':
      return <Eye className="h-4 w-4" />;
    case 'interest':
      return <Eye className="h-4 w-4" />;
    default:
      return <Meh className="h-4 w-4" />;
  }
};

const AIEmotionStatus: React.FC<AIEmotionStatusProps> = ({ 
  emotionalState, 
  compact = false,
  showIntensity = true
}) => {
  if (!emotionalState) return null;
  
  const { dominantEmotion, intensityLevel } = emotionalState;
  
  if (compact) {
    return (
      <Badge 
        variant="outline" 
        className={`${getEmotionColor(dominantEmotion || '')} flex items-center gap-1`}
      >
        {getEmotionIcon(dominantEmotion || '')}
        {dominantEmotion}
        {showIntensity && intensityLevel && <span className="text-xs">({intensityLevel}%)</span>}
      </Badge>
    );
  }

  // Get the top 3 emotions
  const emotions = [
    { name: 'joy', value: emotionalState.joy },
    { name: 'trust', value: emotionalState.trust },
    { name: 'fear', value: emotionalState.fear },
    { name: 'surprise', value: emotionalState.surprise },
    { name: 'sadness', value: emotionalState.sadness },
    { name: 'anger', value: emotionalState.anger },
    { name: 'anticipation', value: emotionalState.anticipation },
    { name: 'interest', value: emotionalState.interest }
  ].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Emotional State</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {emotions.map(emotion => (
              <Badge 
                key={emotion.name}
                variant="outline" 
                className={`${getEmotionColor(emotion.name)} flex items-center gap-1`}
              >
                {getEmotionIcon(emotion.name)}
                {emotion.name}
                <span className="text-xs">({emotion.value}%)</span>
              </Badge>
            ))}
          </div>
          {intensityLevel && (
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold">Intensity:</span> {intensityLevel}%
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold">Updated:</span> {new Date(emotionalState.lastUpdated).toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIEmotionStatus;
