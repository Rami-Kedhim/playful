
/**
 * Unified HermesOrusOxum Core Module
 * Combines visibility decay, signal transformation, and boost allocation logic
 */

export class HermesOrusOxum {
  // Hermes logic related properties
  private baseDecayConstant: number = 0.2;
  private maxBoostEffect: number = 100;
  private aggressionFactor: number = 0.5;
  private timeOfDayFactor: number = 1.0;

  // Orus related logging and signal tracking
  private signalLog: Array<Record<string, any>> = [];

  // Oxum rotation engine properties
  private recentlyViewedProfiles: string[] = [];
  private activeProfiles: Map<string, any> = new Map();
  private lastRotationTimestamp: number = Date.now();
  private rotationIntervalSeconds: number = 180; // 3 minutes

  constructor() {
    this.scheduleNextRotation();
  }

  ///////////////////////////////
  //  Hermes: Visibility & Boost Calculation
  ///////////////////////////////

  public calculateVisibilityDecay(initialVisibility: number, decayConstant: number, timeElapsedHours: number): number {
    return initialVisibility * Math.exp(-decayConstant * timeElapsedHours);
  }

  public calculateDynamicDecayConstant(baseDecay: number, systemLoad: number, timeElapsedHours: number, activityIntensity: number = 50): number {
    const base = 0.1;
    const activityFactor = Math.min(1, Math.max(0.1, activityIntensity / 100));
    const timeFactor = timeElapsedHours > 0 ? Math.exp(-0.05 * timeElapsedHours) : 1;
    return base * (1 + baseDecay * timeFactor * activityFactor);
  }

  public calculateVisibilityScore(initialVisibility: number, timeElapsedHours: number, systemLoad: number, activityIntensity: number): number {
    const decayConstant = this.calculateDynamicDecayConstant(this.baseDecayConstant, systemLoad, timeElapsedHours, activityIntensity);
    return this.calculateVisibilityDecay(initialVisibility, decayConstant, timeElapsedHours);
  }

  public calculateTimeImpact(currentHour: number, optimalWindow: { start: number; peak: number; end: number }): number {
    const { start, peak, end } = optimalWindow;
    if (currentHour >= start && currentHour <= end) {
      const distFromPeak = Math.abs(currentHour - peak);
      const windowSize = (end - start) / 2;
      return this.maxBoostEffect * Math.pow(1 - (distFromPeak / windowSize), this.aggressionFactor);
    }
    const distFromWindow = Math.min(Math.abs(currentHour - start), Math.abs(currentHour - end));
    return Math.max(30, this.maxBoostEffect * Math.exp(-distFromWindow * 0.3));
  }

  public getOptimalTimeWindow(): { start: number; peak: number; end: number } {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 1=Mon, etc.
    if ((day === 5 && now.getHours() >= 18) || day === 6 || day === 0) {
      return { start: 20, peak: 22.5, end: 2 }; // Weekend peak times
    }
    return { start: 19, peak: 21, end: 23 }; // Weekday peak times
  }

  ///////////////////////////////
  //  Orus: Signal transformation and logging
  ///////////////////////////////

  public logSignalTransform(signalName: string, inputSignal: any): void {
    const timestamp = new Date().toISOString();
    const transformedSignal = {
      signalName,
      transformedAt: timestamp,
      originalInput: inputSignal,
      transformedValue: this.transformSignal(inputSignal),
    };
    this.signalLog.push(transformedSignal);
    console.debug(`Orus logged signal ${signalName} at ${timestamp}`);
  }

  private transformSignal(input: any): any {
    if (typeof input === 'number') {
      return Math.min(1, Math.max(0, input));
    }
    return input;
  }

  public getSignalLogs(): Array<Record<string, any>> {
    return [...this.signalLog];
  }

  ///////////////////////////////
  // Oxum: Fair rotation and prioritization
  ///////////////////////////////

  public getBoostQueue(): any[] {
    const profilesArray = Array.from(this.activeProfiles.values());
    return profilesArray.sort((a, b) => b.compositeScore - a.compositeScore);
  }

  public recordProfileView(profileId: string): void {
    if (!this.recentlyViewedProfiles.includes(profileId)) {
      this.recentlyViewedProfiles.push(profileId);
      if (this.recentlyViewedProfiles.length > 50) {
        this.recentlyViewedProfiles.shift();
      }
    }
    const profile = this.activeProfiles.get(profileId);
    if (profile) {
      profile.timeSinceLastTop = 0;
      this.activeProfiles.set(profileId, profile);
    }
  }

  public activateBoost(profileData: any): void {
    this.activeProfiles.set(profileData.profileId, profileData);
  }

  public deactivateBoost(profileId: string): void {
    this.activeProfiles.delete(profileId);
  }

  private scheduleNextRotation(): void {
    setTimeout(() => {
      this.performRotation();
      this.scheduleNextRotation();
    }, this.rotationIntervalSeconds * 1000);
  }

  private performRotation(): void {
    // Reset penalties or implement rotation logic as needed
    const currentTime = Date.now();
    const timeElapsedSec = (currentTime - this.lastRotationTimestamp) / 1000;
    this.activeProfiles.forEach((profile) => {
      profile.timeSinceLastTop += timeElapsedSec / 3600; // convert to hours
    });
    this.lastRotationTimestamp = currentTime;
  }
}

export const hermesOrusOxum = new HermesOrusOxum();

