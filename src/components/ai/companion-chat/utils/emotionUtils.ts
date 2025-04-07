
// Helper function to get emotion avatar class based on the emotion string
export const getEmotionClass = (emotion: string | null | undefined) => {
  if (!emotion) return '';
  
  switch (emotion.toLowerCase()) {
    case 'happy':
      return 'bg-gradient-to-br from-yellow-400 to-orange-300';
    case 'thoughtful':
      return 'bg-gradient-to-br from-blue-400 to-purple-300';
    case 'concerned':
      return 'bg-gradient-to-br from-amber-400 to-orange-400';
    case 'excited':
      return 'bg-gradient-to-br from-pink-400 to-red-300';
    case 'calm':
      return 'bg-gradient-to-br from-green-400 to-cyan-300';
    case 'confused':
      return 'bg-gradient-to-br from-gray-400 to-slate-300';
    default:
      return 'bg-gradient-to-br from-violet-400 to-indigo-300';
  }
};
