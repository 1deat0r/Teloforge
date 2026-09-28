import type { AdmissionBinding, Id } from '@teloforge/contracts';

export interface AuthorizationRequest {
  readonly principalId: Id;
  readonly action: string;
  readonly resourceId: Id;
  readonly binding: AdmissionBinding;
}
export type AuthorizationDecision =
  | { readonly kind: 'allow'; readonly decisionId: Id }
  | { readonly kind: 'deny'; readonly reason: string };
export interface PolicyPort {
  authorize(request: AuthorizationRequest): Promise<AuthorizationDecision>;
}
export const scaffoldPolicy: PolicyPort = {
  async authorize(_request) {
    return { kind: 'deny', reason: 'policy_not_implemented' };
  },
};
