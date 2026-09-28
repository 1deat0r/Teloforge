import type { AdmissionBinding, BundleManifest, Digest, Id } from '@teloforge/contracts';

export type PromotionDecision =
  | { readonly kind: 'reject' | 'hold' | 'retain'; readonly reason: string }
  | { readonly kind: 'canary'; readonly releaseId: Id; readonly manifestDigest: Digest };
export interface BundleRegistry {
  resolveEligible(binding: AdmissionBinding): Promise<BundleManifest | null>;
}
export interface ReleaseController {
  evaluateRegisteredExperiment(experimentId: Id, tenantId: Id): Promise<PromotionDecision>;
}
export const scaffoldPromotionDecision: PromotionDecision = {
  kind: 'hold', reason: 'independent_evaluation_and_release_controller_not_implemented',
};
