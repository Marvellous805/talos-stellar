/** Public feature flags exposed by this SDK build. */
export const FeatureFlags = Object.freeze({
  pagination: true,
  requestSigning: true,
  typedErrors: true,
  webhooks: true,
} as const);

export type FeatureName = keyof typeof FeatureFlags;
export type FeatureStatus = "supported" | "unsupported";

/** Safely report whether a named SDK capability is available. */
export function detectFeature(feature: string): FeatureStatus {
  return Object.prototype.hasOwnProperty.call(FeatureFlags, feature)
    && FeatureFlags[feature as FeatureName]
    ? "supported"
    : "unsupported";
}