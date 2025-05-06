
import { useState, useEffect } from 'react';
import { SeoOptimizationResult } from '@/types/seo';

interface HistoryEntry {
  contentId: string;
  contentType: 'profile' | 'content' | 'livecam' | 'event';
  timestamp: string;
  result: SeoOptimizationResult;
}

export const useHermesSeoHistory = (contentId?: string) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  
  // Load history from local storage on mount
  useEffect(() => {
    // Mock data for demonstration
    const mockHistory: HistoryEntry[] = [
      {
        contentId: '1',
        contentType: 'profile',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        result: {
          pageUrl: '/profiles/jessica-dream',
          title: 'Jessica Dream - VIP Escort',
          metaDescription: 'Experience unforgettable moments with Jessica Dream, a premium VIP escort offering exclusive services',
          h1: 'Jessica Dream - Premium VIP Escort',
          contentScore: 85,
          visibilityScore: 78,
          mobileCompatibility: 92,
          pageSpeed: 88,
          backlinks: 45,
          priorityKeywords: ['premium escort', 'vip', 'jessica dream'],
          recommendations: [
            'Add more service details to increase keyword density',
            'Improve image alt text for better accessibility',
            'Add internal links to related profiles'
          ],
          lastUpdated: new Date(Date.now() - 3600000).toISOString(),
          seoScore: 85,
          readabilityScore: 90
        }
      },
      {
        contentId: '2',
        contentType: 'content',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        result: {
          pageUrl: '/articles/escort-services-guide',
          title: 'Complete Guide to Premium Escort Services',
          metaDescription: 'Comprehensive guide to finding and booking the best premium escort services in your area',
          h1: 'Ultimate Guide to Premium Escort Services',
          contentScore: 92,
          visibilityScore: 85,
          mobileCompatibility: 95,
          pageSpeed: 90,
          backlinks: 78,
          priorityKeywords: ['escort services guide', 'premium escorts', 'booking escort'],
          recommendations: [
            'Add more examples and case studies',
            'Include more location-specific information',
            'Add testimonials section'
          ],
          lastUpdated: new Date(Date.now() - 86400000).toISOString(),
          seoScore: 92,
          readabilityScore: 88
        }
      },
      {
        contentId: '3',
        contentType: 'livecam',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        result: {
          pageUrl: '/livecams/amanda-love',
          title: 'Amanda Love Live Stream - Premium Adult Entertainment',
          metaDescription: 'Join Amanda Love's exclusive live stream for premium adult entertainment and unique experiences',
          h1: 'Amanda Love - Premium Live Stream',
          contentScore: 80,
          visibilityScore: 72,
          mobileCompatibility: 88,
          pageSpeed: 85,
          backlinks: 32,
          priorityKeywords: ['live stream', 'premium adult entertainment', 'amanda love'],
          recommendations: [
            'Add more detailed schedule information',
            'Include preview content',
            'Add more specific tags'
          ],
          lastUpdated: new Date(Date.now() - 172800000).toISOString(),
          seoScore: 80,
          readabilityScore: 85
        }
      }
    ];
    
    // If contentId is provided, filter history for that content
    if (contentId) {
      setHistory(mockHistory.filter(entry => entry.contentId === contentId));
    } else {
      setHistory(mockHistory);
    }
  }, [contentId]);
  
  // Function to add a new entry to history
  const addHistoryEntry = (
    contentId: string,
    contentType: 'profile' | 'content' | 'livecam' | 'event',
    result: SeoOptimizationResult
  ) => {
    const newEntry: HistoryEntry = {
      contentId,
      contentType,
      timestamp: new Date().toISOString(),
      result
    };
    
    setHistory(prevHistory => [newEntry, ...prevHistory]);
  };
  
  return {
    history,
    addHistoryEntry
  };
};

export default useHermesSeoHistory;
