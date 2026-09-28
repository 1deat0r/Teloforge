import type { AdmissionBinding, Id } from '@teloforge/contracts';

export interface AdmissionRequest {
  readonly commandId: Id;
  readonly principalId: Id;
  readonly binding: AdmissionBinding;
}

export type AdmissionDecision =
  | { readonly kind: 'admitted'; readonly attemptId: Id; readonly binding: AdmissionBinding }
  | { readonly kind: 'denied'; readonly reason: string };

export interface WorkKernel {
  admit(request: AdmissionRequest): Promise<AdmissionDecision>;
}

/** Explicitly disabled until T01 provides authentication and atomic persistence. */
export function createScaffoldKernel(): WorkKernel {
  return {
    async admit(_request) {
      return { kind: 'denied', reason: 'scaffold_not_implemented' };
    },
  };
}
