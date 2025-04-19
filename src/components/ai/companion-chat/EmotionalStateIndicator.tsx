
import React from 'react';
import { EmotionalState, EmotionType } from '@/types/ai-personality';
import { 
  Heart, 
  Brain, 
  Sparkles, 
  Frown, 
  Angry, 
  AlertTriangle, 
  ShieldCheck, 
  Hourglass 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EmotionalStateIndicatorProps {
  emotionalState: EmotionalState | null;
  size?: 'sm' | 'md' | 'lg';
}

const EmotionalStateIndicator = ({ emotionalState, size = 'md' }: EmotionalStateIndicatorProps) => {
  if (!emotionalState) return null;
  
  const dominantEmotion = emotionalState.dominantEmotion || emotionalState.primary;
  const intensityLevel = emotionalState.intensityLevel || emotionalState.intensity;
  
  // Define icon sizes
  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24
  };
  
  const iconSize = iconSizes[size];
  
  // Define color based on intensity
  const getIntensityColor = (intensity: number) => {
    if (intensity > 80) return 'text-red-500';
    if (intensity > 60) return 'text-amber-500';
    if (intensity > 40) return 'text-blue-500';
    return 'text-gray-400';
  };
  
  // Map emotions to icons
  const getEmotionIcon = () => {
    switch (dominantEmotion as EmotionType) {
      case 'joy':
        return <Heart size={iconSize} className={`${getIntensityColor(intensityLevel)}`} />;
      case 'interest':
        return <Brain size={iconSize} className={`${getIntensityColor(intensityLevel)}`} />;
      case 'surprise':
        return <Sparkles size={iconSize} className={`${getIntensityColor(intensityLevel)}`} />;
      case 'sadness':
        return <Frown size={iconSize} className={`${getIntensityColor(intensityLevel)}`} />;
      case 'anger':
        return <Angry size={iconSize} className={`${getIntensityColor(intensityLevel)}`} />;
      case 'fear':
        return <AlertTriangle size={iconSize} className={`${getIntensityColor(intensityLevel)}`} />;
      case 'trust':
        return <ShieldCheck size={iconSize} className={`${getIntensityColor(intensityLevel)}`} />;
      case 'anticipation':
        return <Hourglass size={iconSize} className={`${getIntensityColor(intensityLevel)}`} />;
      default:
        return <Brain size={iconSize} className="text-gray-400" />;
    }
  };
  
  // Create tooltip content with emotional state details
  const getTooltipContent = () => {
    return (
      <div className="space-y-2 w-48">
        <p className="font-medium capitalize">{dominantEmotion || 'Neutral'} ({Math.round(intensityLevel)}%)</p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Joy:</span>
            <span>{Math.round(emotionalState.joy || 0)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Interest:</span>
            <span>{Math.round(emotionalState.interest || 0)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Trust:</span>
            <span>{Math.round(emotionalState.trust || 0)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Sadness:</span>
            <span>{Math.round(emotionalState.sadness || 0)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Anger:</span>
            <span>{Math.round(emotionalState.anger || 0)}%</span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help">
            {getEmotionIcon()}
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          {getTooltipContent()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EmotionalStateIndicator;
