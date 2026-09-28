# Migration placeholder

No production schema or migration runner is implemented. Docker Compose starts an empty local development database and applies no application migrations.

T01 must introduce tenant-qualified identifiers and foreign keys; immutable intent revisions; grants; attempts and leases; budget reservations; operation receipts; audit and an outbox. State transitions and their corresponding audit/outbox records share a transaction. Use non-owner runtime roles and explicit tenant predicates, with row policies as additional protection. A privileged bootstrap role is never the application identity.

See [the data model](../../../docs/DATA_MODEL.md). Do not treat creating tables alone as completing authorization, scheduling, recovery, or tenant isolation.
