
/**
 * 🛡️ Ethical, Inclusive & AI-Integrated Service Type Rules for UberEscorts
 * This module defines the core categories of escort services allowed on UberEscorts,
 * aligned with platform values of respect, elegance, legality, and intelligent client satisfaction.
 *
 * These service definitions are enforced by Brain Hub (Uber Core), validated by ORUS,
 * and dynamically interpreted by the Hermes + Oxum engine for semantic mapping.
 * They are also exposed to UberEscorts AI APIs to ensure coherent user experience across UI/UX, filters, and language models.
 */

export enum ServiceType {
  Companionship = "Companionship",
  EroticMassage = "Erotic Massage",
  Roleplay = "Roleplay & Scenarios",
  OpenMinded = "Open-Minded Encounter",
  Tantric = "Tantric Experience",
  SensualDuo = "Sensual Duo (Couple Friendly)",
  PowerPlay = "Power Play (Soft Dom/Sub)",
  Fantasy = "Fantasy Fulfillment",
  Adventurous = "Adventurous Date",
  GentleFetish = "Gentle Fetish Play",
  GFE = "GFE / Boyfriend Experience",
  MutualSatisfaction = "Mutual Satisfaction",
  LateNight = "Late Night Escape",
  VIPCompanion = "VIP Party Companion",
  Midnight = "Midnight Confessions",
  Seduction = "Seduction Game",
  SweetSurrender = "Sweet Surrender (Light BDSM)",
  LingerieShow = "Lingerie Private Show",
  ExoticTease = "Exotic Tease & Please",
  TravelCompanion = "Intimate Travel Companion",
  DiscreetFun = "Discreet Fun",
  HiddenDesires = "Hidden Desires",
  ConfidentKinky = "Confident & Kinky (Soft Limit)"
}

/**
 * 🚫 ForbiddenTerms are filtered at input, search, and system-level layers.
 * These must never appear in public UI nor be suggested by UberEscorts AI.
 */
export const ForbiddenTerms: string[] = [
  "anal", "cim", "facial", "deepthroat", "facefuck", "humiliation",
  "degradation", "cbt", "bukkake", "rapeplay", "watersports",
  "dehumanization", "spitting", "slapping", "fisting", "abuse"
];

/**
 * ✅ isValidServiceType confirms that a given service is compliant and usable in the ecosystem.
 */
export function isValidServiceType(label: string): boolean {
  return Object.values(ServiceType).includes(label as ServiceType);
}

/**
 * 🔁 remapUnsafeService transforms explicit or unsafe inputs into compliant equivalents.
 * This function is used by Hermes, ORUS, and UberAI at multiple layers: NLP, semantic filtering, and moderation.
 */
export function remapUnsafeService(label: string): ServiceType | null {
  const map: Record<string, ServiceType> = {
    anal: ServiceType.Adventurous,
    cim: ServiceType.MutualSatisfaction,
    facial: ServiceType.HiddenDesires,
    deepthroat: ServiceType.Seduction,
    facefuck: ServiceType.ExoticTease,
    humiliation: ServiceType.PowerPlay,
    degradation: ServiceType.PowerPlay,
    cbt: ServiceType.GentleFetish,
    bukkake: ServiceType.HiddenDesires,
    rapeplay: ServiceType.Roleplay,
    watersports: ServiceType.DiscreetFun,
    dehumanization: ServiceType.Roleplay,
    slapping: ServiceType.PowerPlay,
    spitting: ServiceType.Seduction,
    fisting: ServiceType.GentleFetish,
    abuse: ServiceType.PowerPlay
  };
  return map[label.toLowerCase()] || null;
}

/**
 * 🌐 Future Integration Note:
 * This module is planned to connect directly with UberEscorts AI Core and Orus Guardian System.
 * The AI will use `ServiceType` as a reference vocabulary for filtering, recommendation and user onboarding.
 * Smart classification will match free-form text to the closest valid service type.
 */
