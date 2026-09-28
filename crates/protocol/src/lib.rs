//! Schema access only. Serialization, validation, transport and conformance are not implemented.
pub const PROTOCOL_VERSION: &str = "0.1.0-draft";
pub const ENVELOPE_SCHEMA: &str =
    include_str!("../../../packages/contracts/schemas/runner-envelope.schema.json");
