
interface SentimentResult {
  positive: number; // 0-1 scale
  negative: number; // 0-1 scale
  neutral: number;  // 0-1 scale
  anger: number;    // 0-1 scale
}

/**
 * Sentiment Analysis Service
 * In a production environment, this would use a proper NLP API
 * This is a simplified version for demo purposes
 */
export class SentimentAnalysisService {
  private positiveWords = [
    'love', 'like', 'happy', 'joy', 'excited', 'amazing', 'wonderful', 
    'great', 'good', 'excellent', 'fantastic', 'pleasant', 'beautiful',
    'nice', 'appreciate', 'thanks', 'thank', 'glad', 'delighted',
    'smile', 'fun', 'enjoy', 'awesome', 'perfect', 'brilliant',
    'sweet', 'kind', 'friendly', 'warm', 'caring'
  ];
  
  private negativeWords = [
    'hate', 'dislike', 'sad', 'angry', 'upset', 'terrible', 'awful',
    'bad', 'poor', 'horrible', 'dreadful', 'unpleasant', 'ugly',
    'mean', 'rude', 'annoying', 'sorry', 'regret', 'disappointing',
    'frown', 'boring', 'hurt', 'painful', 'worst', 'stupid',
    'cruel', 'harsh', 'cold', 'unfriendly', 'uncaring'
  ];
  
  private angerWords = [
    'angry', 'mad', 'furious', 'rage', 'hate', 'outraged', 'frustrated',
    'annoyed', 'irritated', 'infuriated', 'livid', 'pissed', 'enraged',
    'temper', 'hostile', 'aggressive', 'fierce', 'violent', 'hateful',
    'disgusted', 'revolted', 'despise', 'loathe'
  ];
  
  /**
   * Analyze sentiment of a text message
   */
  public async analyzeSentiment(text: string): Promise<SentimentResult> {
    // In a production environment, this would use a proper NLP service
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);
    
    let positiveCount = 0;
    let negativeCount = 0;
    let angerCount = 0;
    
    // Count occurrences of sentiment words
    for (const word of words) {
      const cleanWord = word.replace(/[^\w]/g, '');
      
      if (this.positiveWords.includes(cleanWord)) {
        positiveCount++;
      }
      
      if (this.negativeWords.includes(cleanWord)) {
        negativeCount++;
      }
      
      if (this.angerWords.includes(cleanWord)) {
        angerCount++;
      }
    }
    
    // Calculate scores (0-1 scale)
    const total = words.length || 1; // Avoid division by zero
    const positive = Math.min(1, positiveCount / total * 3); // Scale up for better differentiation
    const negative = Math.min(1, negativeCount / total * 3); // Scale up for better differentiation
    const anger = Math.min(1, angerCount / total * 5); // Scale up even more for anger
    
    // Calculate neutral as the remainder
    const neutral = Math.max(0, 1 - positive - negative);
    
    return {
      positive,
      negative,
      neutral,
      anger
    };
  }
}

export const sentimentAnalysisService = new SentimentAnalysisService();
export default sentimentAnalysisService;
