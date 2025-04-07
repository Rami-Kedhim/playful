
/**
 * Utility functions for handling emotion-based styling
 */

type Emotion = 
  | 'neutral' 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'excited' 
  | 'flirty' 
  | 'friendly' 
  | 'confused'
  | 'apologetic'
  | string;

/**
 * Get the CSS class for a message based on its emotion
 */
export const getEmotionClass = (emotion?: Emotion): string => {
  if (!emotion) return 'bg-background/80 border border-border';
  
  switch (emotion.toLowerCase()) {
    case 'happy':
      return 'bg-green-500/20 border border-green-500/30 text-foreground';
    case 'sad':
      return 'bg-blue-500/20 border border-blue-500/30 text-foreground';
    case 'angry':
      return 'bg-red-500/20 border border-red-500/30 text-foreground';
    case 'excited':
      return 'bg-yellow-500/20 border border-yellow-500/30 text-foreground';
    case 'flirty':
      return 'bg-pink-500/20 border border-pink-500/30 text-foreground';
    case 'friendly':
      return 'bg-purple-500/20 border border-purple-500/30 text-foreground';
    case 'confused':
      return 'bg-orange-500/20 border border-orange-500/30 text-foreground';
    case 'apologetic':
      return 'bg-gray-500/20 border border-gray-500/30 text-foreground';
    default:
      return 'bg-background/80 border border-border';
  }
};

/**
 * Get animation class based on emotion
 */
export const getEmotionAnimation = (emotion?: Emotion): string => {
  if (!emotion) return '';
  
  switch (emotion.toLowerCase()) {
    case 'excited':
    case 'happy':
      return 'animate-bounce-subtle';
    case 'angry':
      return 'animate-shake-subtle';
    default:
      return '';
  }
};

/**
 * Map emotion to appropriate icon
 */
export const getEmotionIcon = (emotion?: Emotion): string => {
  if (!emotion) return '😐';
  
  switch (emotion.toLowerCase()) {
    case 'happy': return '😊';
    case 'sad': return '😢';
    case 'angry': return '😠';
    case 'excited': return '😃';
    case 'flirty': return '😏';
    case 'friendly': return '🙂';
    case 'confused': return '😕';
    case 'apologetic': return '😔';
    default: return '😐';
  }
};
