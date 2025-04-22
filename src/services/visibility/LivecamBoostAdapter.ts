import { visibilitySystem } from "./VisibilitySystem";
import { Livecam } from "@/types/livecams";
import { calculateLivecamBoostScore } from "@/utils/boost/livecamBoostScore";
import { calculateBoostEffect } from "@/utils/boost/boostCalculation";

export class LivecamBoostAdapter {
  private boostedLivecams: Map<string, { startTime: number; intensity: number }> = new Map();

  public boostLivecam(livecam: Livecam, intensity: number = 30, durationHours: number = 24): void {
    this.boostedLivecams.set(livecam.id, {
      startTime: Date.now(),
      intensity,
    });

    const baseScore = this.calculateBaseLivecamScore(livecam);
    const boostedScore = baseScore + intensity;

    visibilitySystem.updateItemScore(livecam.id, boostedScore);

    setTimeout(() => {
      this.removeLivecamBoost(livecam.id);
    }, durationHours * 60 * 60 * 1000);
  }

  public removeLivecamBoost(livecamId: string): void {
    this.boostedLivecams.delete(livecamId);
    const item = visibilitySystem.getItem(livecamId);
    if (item && item.metadata) {
      const livecam: Livecam = {
        id: livecamId,
        isStreaming: item.metadata.isStreaming || false,
        viewerCount: item.metadata.viewerCount || 0,
        language: "en",
        username: "unknown",
        imageUrl: "",
        tags: [],
        category: "",
        displayName: "",
        thumbnailUrl: "",
      };
      const baseScore = this.calculateBaseLivecamScore(livecam);
      visibilitySystem.updateItemScore(livecamId, baseScore);
    }
  }

  public checkBoostStatus(livecamId: string): {
    isBoosted: boolean;
    timeRemaining?: number;
    intensity?: number;
  } {
    const boostInfo = this.boostedLivecams.get(livecamId);

    if (!boostInfo) {
      return { isBoosted: false };
    }

    const now = Date.now();
    const elapsedMs = now - boostInfo.startTime;
    const elapsedHours = elapsedMs / (1000 * 60 * 60);

    const remainingHours = Math.max(0, 24 - elapsedHours);

    return {
      isBoosted: true,
      timeRemaining: remainingHours,
      intensity: boostInfo.intensity,
    };
  }

  public updateBoostEffects(): void {
    const now = Date.now();

    this.boostedLivecams.forEach((boost, livecamId) => {
      const item = visibilitySystem.getItem(livecamId);
      if (!item) {
        this.boostedLivecams.delete(livecamId);
        return;
      }

      const hoursElapsed = (now - boost.startTime) / (1000 * 60 * 60);

      const decayedBoostEffect = calculateBoostEffect(boost.intensity, hoursElapsed, 0.05);

      const livecam: Livecam = {
        id: livecamId,
        isStreaming: item.metadata?.isStreaming || false,
        viewerCount: item.metadata?.viewerCount || 0,
        language: "en",
        username: "unknown",
        imageUrl: "",
        tags: [],
        category: "",
        displayName: "",
        thumbnailUrl: "",
      };

      const baseScore = this.calculateBaseLivecamScore(livecam);

      const boostedScore = baseScore + decayedBoostEffect;

      visibilitySystem.updateItemScore(livecamId, boostedScore);
    });
  }

  private calculateBaseLivecamScore(livecam: Livecam): number {
    return calculateLivecamBoostScore(livecam);
  }
}

export const livecamBoost = new LivecamBoostAdapter();

export default livecamBoost;
