import type { ArtifactRef, DataScope, Digest, Id } from '@teloforge/contracts';

export interface ArtifactStore {
  beginUpload(input: { tenantId: Id; scope: DataScope; mediaType: string }): Promise<Id>;
  writeChunk(uploadId: Id, tenantId: Id, bytes: Uint8Array): Promise<void>;
  finalize(uploadId: Id, tenantId: Id, expectedDigest: Digest): Promise<ArtifactRef>;
  read(ref: ArtifactRef, principalId: Id): AsyncIterable<Uint8Array>;
}
// A content digest is not an access credential. Completion references finalized artifacts only.
