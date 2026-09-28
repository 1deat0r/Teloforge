import type { ArtifactRef, BundleManifest, Id } from '@teloforge/contracts';

export interface CandidateProposal {
  readonly proposalId: Id;
  readonly hypothesis: string;
  readonly candidate: BundleManifest;
  readonly developmentEvidence: readonly ArtifactRef[];
}
export interface CandidateGenerator {
  propose(input: { tenantId: Id; developmentEvidence: readonly ArtifactRef[] }): Promise<CandidateProposal>;
}
// Candidate generation has no release, owner, evaluator or grant-administrator authority.
