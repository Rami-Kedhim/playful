/**
 * Orus - Session management and security subsystem
 */

import { v4 as uuidv4 } from 'uuid';

export interface SessionData {
  sessionId: string;
  userId: string;
  createdAt: Date;
  lastAccessed: Date;
  isValid: boolean;
  ipAddress: string;
  userAgent: string;
}

export class Orus {
  private sessions: Map<string, SessionData> = new Map();
  private systemLoad: number = 0.5; // System load factor (0-1)

  /**
   * Start a new user session
   * @param userId User identifier
   * @param ipAddress IP address of the user
   * @param userAgent User agent string
   * @returns Session data
   */
  public startSession(userId: string, ipAddress: string, userAgent: string): SessionData {
    const sessionId = uuidv4();
    const now = new Date();

    const session: SessionData = {
      sessionId,
      userId,
      createdAt: now,
      lastAccessed: now,
      isValid: true,
      ipAddress,
      userAgent
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  /**
   * Validate an existing session
   * @param sessionId Session identifier
   * @returns Session data or null if invalid
   */
  public validateSession(sessionId: string): SessionData {
    const session = this.sessions.get(sessionId);

    if (!session || !session.isValid) {
      return { isValid: false } as SessionData;
    }

    session.lastAccessed = new Date();
    this.sessions.set(sessionId, session);
    return session;
  }

  /**
   * End a user session
   * @param sessionId Session identifier
   */
  public endSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);

    if (session) {
      session.isValid = false;
      this.sessions.set(sessionId, session);
    }
  }

  /**
   * Update system load factor
   * @param load System load (0-1)
   */
  public updateSystemLoad(load: number): void {
    this.systemLoad = Math.max(0, Math.min(1, load));
  }

  /**
   * Get current system load factor
   * @returns System load (0-1)
   */
  public getSystemLoad(): number {
    return this.systemLoad;
  }

  /**
   * Check BrainHub system status
   * @returns Status of the BrainHub system
   */
  public checkBrainHubStatus(): string {
    // Check the status of the BrainHub system
    if (this.systemLoad > 0.9) {
      return "offline";
    } else if (this.systemLoad > 0.7) {
      return "degraded";  // Changed from "degraded" to match the expected type
    } else {
      return "online";
    }
  }

  /**
   * Enforce security policies
   * @param session Session data
   * @returns True if policy is met, false otherwise
   */
  public enforceSecurityPolicy(session: SessionData): boolean {
    // Example: Check for unusual activity
    const now = new Date();
    const timeSinceLastAccess = now.getTime() - session.lastAccessed.getTime();

    if (timeSinceLastAccess < 100 && this.systemLoad > 0.8) {
      // High system load and rapid access
      return false;
    }

    return true;
  }
}

export const orus = new Orus();
