
/**
 * Get the appropriate Tailwind CSS class for an emotion
 * 
 * @param emotion The emotion string
 * @returns Tailwind CSS class for the emotion
 */
export const getEmotionClass = (emotion: string | null): string => {
  if (!emotion) return 'bg-slate-700';
  
  switch (emotion.toLowerCase()) {
    case 'happy':
    case 'excited':
    case 'joyful':
      return 'bg-emerald-700';
      
    case 'curious':
    case 'interested':
    case 'thoughtful':
      return 'bg-blue-700';
      
    case 'sad':
    case 'melancholy':
    case 'disappointed':
      return 'bg-indigo-800';
      
    case 'angry':
    case 'upset':
    case 'irritated':
      return 'bg-red-700';
      
    case 'loving':
    case 'affectionate':
    case 'romantic':
      return 'bg-pink-700';
      
    case 'calm':
    case 'relaxed':
    case 'serene':
      return 'bg-sky-700';
      
    case 'confused':
    case 'uncertain':
    case 'perplexed':
      return 'bg-amber-700';
      
    case 'amused':
    case 'playful':
    case 'silly':
      return 'bg-violet-700';
      
    case 'neutral':
    default:
      return 'bg-slate-700';
  }
};

/**
 * Get a description of what an emotion looks like
 * 
 * @param emotion The emotion string
 * @returns Description of the emotion
 */
export const getEmotionDescription = (emotion: string | null): string => {
  if (!emotion) return 'neutral expression';
  
  switch (emotion.toLowerCase()) {
    case 'happy':
    case 'excited':
    case 'joyful':
      return 'smiling brightly';
      
    case 'curious':
    case 'interested':
      return 'leaning in with interest';
      
    case 'thoughtful':
      return 'with a contemplative expression';
      
    case 'sad':
    case 'melancholy':
    case 'disappointed':
      return 'with a sad expression';
      
    case 'angry':
    case 'upset':
    case 'irritated':
      return 'with a frustrated expression';
      
    case 'loving':
    case 'affectionate':
    case 'romantic':
      return 'with a warm smile';
      
    case 'calm':
    case 'relaxed':
    case 'serene':
      return 'with a peaceful expression';
      
    case 'confused':
    case 'uncertain':
    case 'perplexed':
      return 'with a puzzled look';
      
    case 'amused':
    case 'playful':
    case 'silly':
      return 'with a playful smile';
      
    default:
      return 'with a neutral expression';
  }
};
