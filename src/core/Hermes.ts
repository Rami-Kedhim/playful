
/**
 * Hermes Analytics System
 * Core analytics, tracking, and user journey insights for the UberEscorts platform
 */

interface UserState {
  id: string;
  sessionId: string;
  lastActivity: Date;
  location: string;
  preferences: Record<string, any>;
  metaverse: {
    hasEntered: boolean;
    lastEntryTime?: Date;
    totalTimeSpent: number;
  };
  isActive: boolean;
}

interface PageViewEvent {
  path: string;
  referrer: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export class HermesAnalytics {
  private readonly userStates = new Map<string, UserState>();
  private readonly pageViews = new Map<string, PageViewEvent[]>();
  
  /**
   * Track a user page view
   */
  trackPageView(userId: string, path: string, referrer = '', metadata?: Record<string, any>): void {
    if (!this.pageViews.has(userId)) {
      this.pageViews.set(userId, []);
    }
    
    const pageViews = this.pageViews.get(userId);
    if (pageViews) {
      pageViews.push({
        path,
        referrer,
        timestamp: new Date(),
        metadata
      });
    }
    
    console.log(`[Hermes] Tracked page view for user ${userId}: ${path}`);
  }
  
  /**
   * Track a user event
   */
  trackEvent(userId: string, eventType: string, metadata?: Record<string, any>): void {
    console.log(`[Hermes] Tracked event for user ${userId}: ${eventType}`, metadata);
  }
  
  /**
   * Connect user to Hermes
   */
  connect(params: { 
    system: string; 
    connectionId: string; 
    userId: string;
    metadata?: Record<string, any>;
  }): void {
    console.log(`[Hermes] Connected ${params.userId} to ${params.system}`, params);
    
    const userState: UserState = {
      id: params.userId,
      sessionId: params.connectionId,
      lastActivity: new Date(),
      location: 'unknown',
      preferences: {},
      metaverse: {
        hasEntered: false,
        totalTimeSpent: 0
      },
      isActive: true
    };
    
    this.userStates.set(params.userId, userState);
  }
  
  /**
   * Get user state
   */
  getUserState(userId: string): UserState | undefined {
    return this.userStates.get(userId);
  }
  
  /**
   * Update user location
   */
  updateUserLocation(userId: string, location: string): void {
    const userState = this.userStates.get(userId);
    if (userState) {
      userState.location = location;
    }
  }
  
  /**
   * Update user preferences
   */
  updateUserPreferences(userId: string, preferences: Record<string, any>): void {
    const userState = this.userStates.get(userId);
    if (userState) {
      userState.preferences = {
        ...userState.preferences,
        ...preferences
      };
    }
  }
  
  /**
   * Enter spatial flow (metaverse)
   */
  enterSpatialFlow(userId: string, spaceId: string): void {
    const userState = this.userStates.get(userId);
    if (userState) {
      userState.metaverse.hasEntered = true;
      userState.metaverse.lastEntryTime = new Date();
    }
    
    console.log(`[Hermes] User ${userId} entered spatial flow: ${spaceId}`);
  }
  
  /**
   * Exit spatial flow (metaverse)
   */
  exitSpatialFlow(userId: string): void {
    const userState = this.userStates.get(userId);
    if (userState && userState.metaverse.lastEntryTime) {
      const timeSpent = new Date().getTime() - userState.metaverse.lastEntryTime.getTime();
      userState.metaverse.totalTimeSpent += timeSpent;
      delete userState.metaverse.lastEntryTime;
    }
  }

  /**
   * Get user journey insights
   */
  getUserJourneyInsights(userId: string): Record<string, any> {
    const userState = this.userStates.get(userId);
    const pageViews = this.pageViews.get(userId) || [];
    
    // Mock some insights based on available data
    return {
      userId,
      totalPageViews: pageViews.length,
      mostVisitedPages: this.getMostVisitedPages(pageViews),
      averageSessionDuration: userState ? Math.random() * 600 : 0, // mock 0-10 minutes
      lastActive: userState?.lastActivity || new Date(),
      metaverseEngagement: userState?.metaverse.totalTimeSpent || 0,
      potentialInterests: this.getPotentialInterests(pageViews),
    };
  }
  
  /**
   * Helper: Get most visited pages
   */
  private getMostVisitedPages(pageViews: PageViewEvent[]): Record<string, number> {
    const pageCounts: Record<string, number> = {};
    
    pageViews.forEach(event => {
      if (!pageCounts[event.path]) {
        pageCounts[event.path] = 0;
      }
      pageCounts[event.path]++;
    });
    
    return pageCounts;
  }
  
  /**
   * Helper: Get potential interests from page views
   */
  private getPotentialInterests(pageViews: PageViewEvent[]): string[] {
    const interests = new Set<string>();
    
    // This is a simple mock implementation
    pageViews.forEach(event => {
      if (event.path.includes('escorts')) interests.add('escorts');
      if (event.path.includes('creators')) interests.add('creators');
      if (event.path.includes('metaverse')) interests.add('metaverse');
      if (event.path.includes('livecams')) interests.add('livecams');
    });
    
    return Array.from(interests);
  }
}

export const hermes = new HermesAnalytics();
export default hermes;
