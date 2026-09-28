import type { ArtifactRef, Digest, Id } from '@teloforge/contracts';

/** Reference to a fully registered, independently owned experiment contract. */
export interface TrialRequest {
  readonly tenantId: Id;
  readonly experimentId: Id;
  readonly trialId: Id;
  readonly candidateDigest: Digest;
  readonly incumbentDigest: Digest;
  readonly contractDigest: Digest;
  readonly datasetSnapshotDigest: Digest;
}
export interface EvaluationReceiptRef {
  readonly trialId: Id;
  readonly signedReceipt: ArtifactRef;
  readonly rawEvidence: readonly ArtifactRef[];
}
export interface EvaluationController {
  requestTrial(request: TrialRequest): Promise<EvaluationReceiptRef>;
}
// Schema, grader isolation, signatures and statistical procedures remain T02/T03 work.
