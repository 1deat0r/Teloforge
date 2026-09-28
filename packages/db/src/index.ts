import type { AdmissionBinding, Id } from '@teloforge/contracts';

/** Target atomic unit: state, reservation, audit, receipt and outbox together. */
export interface AdmissionCommit {
  readonly commandId: Id;
  readonly principalId: Id;
  readonly binding: AdmissionBinding;
  readonly expectedIntentRevision: string;
}
export type CommitResult =
  | { readonly kind: 'committed'; readonly attemptId: Id }
  | { readonly kind: 'conflict' | 'denied'; readonly reason: string };
export interface WorkRepository {
  commitAdmission(command: AdmissionCommit): Promise<CommitResult>;
}
// No in-memory replacement or database implementation is supplied in the scaffold.
