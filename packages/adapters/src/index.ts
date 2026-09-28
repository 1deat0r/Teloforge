import type { AdmissionBinding, Id } from '@teloforge/contracts';

export interface AdapterCapabilities {
  readonly adapterId: Id;
  readonly version: string;
  readonly qualification: 'unqualified' | 'qualified';
  readonly cancellation: 'none' | 'best_effort' | 'confirmed';
  readonly resume: 'none' | 'verified_session';
  readonly usage: 'unknown' | 'reported' | 'reconciled';
  readonly isolation: 'trusted_host' | 'managed';
}
export interface ProviderAdapter {
  readonly capabilities: AdapterCapabilities;
  dispatch(binding: AdmissionBinding, attemptId: Id): Promise<void>;
  cancel(tenantId: Id, attemptId: Id): Promise<void>;
}
export const qualifiedAdapters: readonly AdapterCapabilities[] = [];
