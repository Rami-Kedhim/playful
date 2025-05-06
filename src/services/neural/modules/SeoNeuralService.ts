
import { BaseNeuralService } from './BaseNeuralService';
import { ModuleType } from '../types/NeuralService';
import { SeoOptimizationResult } from '@/types/seo';

/**
 * Neural service dedicated to SEO optimization and analysis
 */
export class SeoNeuralService extends BaseNeuralService {
  constructor() {
    super('seo-neural-service', 'SEO Neural Service', ModuleType.SEO);
  }

  /**
   * Analyze content and provide SEO optimization recommendations
   */
  async analyzeContent(content: string, contentType: string, keywords: string[] = []): Promise<SeoOptimizationResult> {
    console.log(`[SeoNeuralService] Analyzing ${contentType} content for SEO optimization`);
    
    // Neural analysis of content
    const analysisResult = await this.processWithNeuralCore(content, {
      contentType,
      keywords,
      optimizationLevel: this.config.optimizationLevel || 'standard',
      includeMetrics: true
    });
    
    // Transform the analysis into optimization recommendations
    return {
      pageUrl: analysisResult.url || window.location.href,
      title: analysisResult.title || this.extractTitle(content),
      metaDescription: analysisResult.metaDescription || this.generateMetaDescription(content),
      h1: analysisResult.h1 || this.extractH1(content),
      contentScore: analysisResult.contentScore || this.calculateContentScore(content),
      visibilityScore: analysisResult.visibilityScore || 75,
      mobileCompatibility: analysisResult.mobileCompatibility || 90,
      pageSpeed: analysisResult.pageSpeed || 85,
      backlinks: analysisResult.backlinks || 15,
      priorityKeywords: keywords.length ? keywords : this.extractKeywords(content),
      recommendations: this.generateRecommendations(content, analysisResult),
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Automatically optimize content based on SEO best practices
   */
  async autoOptimizeContent(content: string, contentType: string, keywords: string[] = []): Promise<{
    optimizedContent: string;
    optimizationResult: SeoOptimizationResult;
  }> {
    // Analyze the content first
    const analysisResult = await this.analyzeContent(content, contentType, keywords);
    
    // Apply neural optimization 
    const optimizedContent = await this.applyOptimizations(content, analysisResult);
    
    return {
      optimizedContent,
      optimizationResult: {
        ...analysisResult,
        lastUpdated: new Date().toISOString()
      }
    };
  }

  /**
   * Apply optimizations based on analysis
   */
  private async applyOptimizations(content: string, analysisResult: SeoOptimizationResult): Promise<string> {
    try {
      // Apply neural optimization strategies
      return await this.processWithNeuralCore(content, {
        action: 'optimize',
        analysisResult,
        optimizationLevel: this.config.optimizationLevel || 'standard',
      });
    } catch (error) {
      console.error('[SeoNeuralService] Error applying optimizations:', error);
      return content;
    }
  }

  /**
   * Generate meta description from content
   */
  private generateMetaDescription(content: string): string {
    // Extract the first paragraph or generate a concise description
    const firstParagraph = content.split('\n').find(p => p.trim().length > 60);
    if (firstParagraph) {
      return firstParagraph.slice(0, 155).trim() + (firstParagraph.length > 155 ? '...' : '');
    }
    return content.slice(0, 155).trim() + (content.length > 155 ? '...' : '');
  }

  /**
   * Extract title from content
   */
  private extractTitle(content: string): string {
    // Try to find a title in the content
    const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/i) || content.match(/<title>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1].trim();
    }
    
    // If no title found, take the first line or sentence
    const firstLine = content.split('\n')[0].trim();
    return firstLine.slice(0, 60).trim() + (firstLine.length > 60 ? '...' : '');
  }

  /**
   * Extract H1 from content
   */
  private extractH1(content: string): string {
    // Try to find an H1 tag in the content
    const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match && h1Match[1]) {
      return h1Match[1].trim();
    }
    return '';
  }

  /**
   * Calculate content score based on various factors
   */
  private calculateContentScore(content: string): number {
    const contentLength = content.length;
    const wordCount = content.split(/\s+/).length;
    
    // Simple algorithm for scoring
    let score = 50; // Base score
    
    if (wordCount > 300) score += 10;
    if (wordCount > 600) score += 10;
    if (wordCount > 1000) score += 10;
    
    // Check for presence of headings
    if (content.match(/<h[1-3][^>]*>/i)) score += 5;
    
    // Check for presence of images
    if (content.match(/<img[^>]*>/i)) score += 5;
    
    // Check for links
    if (content.match(/<a[^>]*>/i)) score += 5;
    
    return Math.min(100, score);
  }

  /**
   * Extract keywords from content
   */
  private extractKeywords(content: string): string[] {
    // Simple keyword extraction (would be more sophisticated in real implementation)
    const words = content.toLowerCase().split(/\W+/);
    const wordCounts: Record<string, number> = {};
    
    words.forEach(word => {
      if (word.length > 3) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
    
    // Sort by count and take top 5
    return Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);
  }

  /**
   * Generate SEO recommendations based on content analysis
   */
  private generateRecommendations(content: string, analysis: any): string[] {
    const recommendations = [];
    
    // Basic recommendations based on content
    if (content.length < 300) {
      recommendations.push('Content is too short. Add more relevant information to improve depth.');
    }
    
    if (!content.match(/<img[^>]*>/i)) {
      recommendations.push('Add images to improve engagement and visual appeal.');
    }
    
    if (!content.match(/<h2[^>]*>/i)) {
      recommendations.push('Add subheadings (H2) to improve content structure.');
    }
    
    // Add more detailed recommendations from neural analysis if available
    if (analysis.recommendations && Array.isArray(analysis.recommendations)) {
      recommendations.push(...analysis.recommendations);
    }
    
    return recommendations;
  }
}

export default SeoNeuralService;
