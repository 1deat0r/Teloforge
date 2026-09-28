/** Draft domain shapes. TypeScript types do not validate untrusted input. */
export type Id = string;
export type Digest = `sha256:${string}`;
export type DecimalInteger = string;
export type IsoTime = string;

export interface IntentRevision {
  readonly tenantId: Id;
  readonly intentId: Id;
  readonly revision: DecimalInteger;
  readonly ownerId: Id;
  readonly desiredOutcome: string;
  readonly acceptanceCriteria: readonly string[];
  readonly constraints: readonly string[];
  readonly mode: 'finite' | 'maintained';
  readonly stopConditions: readonly string[];
  readonly grantSetDigest: Digest;
}

export interface AdmissionBinding {
  readonly tenantId: Id;
  readonly intentId: Id;
  readonly intentRevision: DecimalInteger;
  readonly grantSetDigest: Digest;
  readonly authorizationEpoch: DecimalInteger;
  readonly bundleDigest: Digest;
  readonly policyRevision: DecimalInteger;
}

export type AttemptState = 'queued' | 'leased' | 'running' | 'waiting'
  | 'reconciling' | 'succeeded' | 'failed' | 'cancelled';
export type OperationState = 'proposed' | 'authorized' | 'dispatched'
  | 'succeeded' | 'failed' | 'outcome_unknown' | 'revoked';

export interface DataScope {
  readonly originatingTenantIds: readonly Id[];
  readonly allowedAudienceIds: readonly Id[];
  readonly permittedUses: readonly string[];
  readonly sourceDigests: readonly Digest[];
  readonly expiresAt: IsoTime | null;
  readonly provenance: 'known' | 'unknown';
}

export interface ArtifactRef {
  readonly tenantId: Id;
  readonly artifactId: Id;
  readonly digest: Digest;
  readonly byteLength: DecimalInteger;
  readonly mediaType: string;
  readonly scope: DataScope;
}

export interface BundleManifest {
  readonly digest: Digest;
  readonly scope: DataScope;
  readonly adapterId: Id;
  readonly adapterVersion: string;
  readonly modelReference: string;
  readonly contextRevision: Digest;
  readonly skillDigests: readonly Digest[];
  readonly toolSchemaDigests: readonly Digest[];
  readonly parentDigests: readonly Digest[];
}

export const SCAFFOLD_CAPABILITIES = Object.freeze({
  stage: 'scaffold' as const,
  intentPersistence: false,
  authentication: false,
  runAdmission: false,
  providerExecution: false,
  independentEvaluation: false,
  automaticPromotion: false,
});
