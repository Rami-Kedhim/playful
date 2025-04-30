
/**
 * Visibility System for boosting and ranking items
 */
class VisibilitySystem {
  private items: Map<string, any> = new Map();
  private scores: Map<string, number> = new Map();
  
  /**
   * Register an item with the visibility system
   */
  registerItem(id: string, data: any): boolean {
    if (this.items.has(id)) {
      return false; // Item already exists
    }
    
    this.items.set(id, data);
    this.scores.set(id, 50); // Default score
    return true;
  }
  
  /**
   * Get an item from the system
   */
  getItem(id: string): any {
    return this.items.get(id);
  }
  
  /**
   * Update an item's score
   */
  updateItemScore(id: string, score: number): boolean {
    if (!this.items.has(id)) {
      return false;
    }
    
    // Ensure the score is within valid range
    const validScore = Math.min(Math.max(score, 0), 100);
    this.scores.set(id, validScore);
    return true;
  }
  
  /**
   * Get top items based on score
   */
  getTopItems(limit: number = 10): Array<{ id: string, data: any, score: number }> {
    const result: Array<{ id: string, data: any, score: number }> = [];
    
    // Convert maps to array and sort
    const entries = Array.from(this.items.entries())
      .map(([id, data]) => ({
        id,
        data,
        score: this.scores.get(id) || 0
      }))
      .sort((a, b) => b.score - a.score);
    
    // Return the top N items
    return entries.slice(0, limit);
  }
  
  /**
   * Boost an item's visibility
   */
  boostItem(id: string, amount: number, duration: number): boolean {
    if (!this.items.has(id)) {
      return false;
    }
    
    // Get current score
    const currentScore = this.scores.get(id) || 50;
    
    // Calculate new score with boost
    const newScore = Math.min(currentScore + amount, 100);
    this.scores.set(id, newScore);
    
    // Schedule score to return to normal after duration
    setTimeout(() => {
      // Only reduce if the item still exists
      if (this.items.has(id)) {
        this.scores.set(id, currentScore);
      }
    }, duration);
    
    return true;
  }
  
  /**
   * Clear all items
   */
  clear(): void {
    this.items.clear();
    this.scores.clear();
  }
}

export const visibilitySystem = new VisibilitySystem();
export default visibilitySystem;
