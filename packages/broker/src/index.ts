import type { AdmissionBinding, Digest, Id, OperationState } from '@teloforge/contracts';

export interface OperationRequest {
  readonly operationId: Id;
  readonly binding: AdmissionBinding;
  readonly connectorId: Id;
  readonly targetId: Id;
  readonly argumentDigest: Digest;
  readonly arguments: Readonly<Record<string, unknown>>;
}
export interface OperationReceipt {
  readonly operationId: Id;
  readonly state: OperationState;
  readonly providerReceiptId: string | null;
}
export interface ActionBroker {
  request(operation: OperationRequest): Promise<OperationReceipt>;
  reconcile(operationId: Id, tenantId: Id): Promise<OperationReceipt>;
}
// Future implementations resolve secrets inside the broker and preserve unknown outcomes.
