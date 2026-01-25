# Python Microservices: Standard Operating Procedures
This document outlines the mandatory patterns for API design, Event-Driven communication, and Database management within our Python ecosystem.

## 0. General Standards
- **Style Guide**: Follow PEP 8. Use `black` for formatting and `isort` for import sorting.
- **Testing**: Use `pytest`. Write tests for reducers/hooks before building the UI components.
- **Coverage**: Unit (mocked) + Integration (API/DB).
- **Type Hinting**: Mandatory for all function signatures and class attributes.

## 1. API Design Rules (FastAPI + Pydantic)
**Goal**: Type-safe, self-documenting, and decoupled interfaces.

- **Rule 1: Use Pydantic for Data Transformation (DTOs)**
  - Never return SQLAlchemy models directly.
  - Implement three distinct schemas for every resource: `[Name]Base`, `[Name]Create`, and `[Name]Read`.

- **Rule 2: Dependency Injection for Resources**
  - Use FastAPI's `Depends()` for database sessions, current users, and external clients. This ensures the business logic is testable via dependency overrides.

- **Rule 3: Global Exception Handling**
  - Do not use `try-catch` blocks for flow control in routes. Raise custom `DomainExceptions`.
  - Use an `exception_handler` to catch these and return a standardized JSON error format.

- **Rule 4: Explicit Versioning**
  - Prefix all routes with `/v1/`, `/v2/`, etc. Use `APIRouter` to group versioned modules.

- **Rule 5: Async/Await Protocol**
  - All I/O operations (DB, Redis, HTTP calls) must be `async`.
  Use `httpx` for asynchronous external API requests instead of `requests`.

## 2. Event-Driven Rules (FastStream / Celery / Kafka)
**Goal**: Guaranteed delivery, eventual consistency, and resilience.

- **Rule 1: Consumer Idempotency**
  - Every consumer must check a unique `message_id` or `business_key` against a processed-events cache (Redis) before executing.

- **Rule 2: The Outbox Pattern**
  - Producers must not send messages in the middle of a DB transaction.
  - Write the event to an `outbox` table in the same transaction as the business data change, then use a background worker to publish.

- **Rule 3: Structured Metadata (CloudEvents)**
  - All messages must follow the CloudEvents spec, including `source`, `type`, and `traceparent` (for OpenTelemetry).

- **Rule 4: Dead Letter Queues (DLQ)**
  - Configure a DLQ for every consumer. After 3 failed retries (with exponential backoff), the message must be moved to the DLQ for manual inspection.

- **Rule 5: Schema Registry Compliance**
  - Do not send "Schemaless" JSON. Use Avro or Pydantic schemas stored in a shared library to prevent breaking downstream consumers.

## 3. Database & JPA/ORM Rules (SQLAlchemy 2.0+)
**Goal**: Optimized query performance and data integrity.

- **Rule 1: Explicit Relationship Loading**
  - Default to `lazy="selectin"` for collections and `lazy="joined"` for many-to-one relationships.
  - Never allow implicit "lazy loading" during serialization; this causes the N+1 problem.

- **Rule 2: Async Session Management**
  - Use `AsyncSession` with the `asyncio` extension of SQLAlchemy.
  - Always use a context manager (`async with session.begin():`) to ensure transactions are committed or rolled back automatically.

- **Rule 3: Database Migrations (Alembic)**
  - Manual SQL or `Base.metadata.create_all()` is forbidden in production.
  - Every schema change must have a versioned Alembic script reviewed in the PR.

- **Rule 4: Optimistic Concurrency Control**
  - Add a `version_id` column to critical entities to prevent "Lost Updates" during concurrent writes.

- **Rule 5: Projections for Reads**
  - For heavy read operations, use `session.execute(select(Model.col1, Model.col2))` to fetch specific columns instead of full objects. This reduces memory pressure and overhead.

- **Rule 6: Distributed ID Strategy**
  - **Standard**: All primary keys must be time-sorted and distributed-safe.
  - **Primary Choice**: Use `uuid.uuid7()` for all new models.
  - **Secondary Choice (Storage Optimized)**: Use `tsidpy` if the table is expected to exceed 100M+ rows to save on index storage.
  - **Prohibited**: Do not use standard `uuid4()` for primary keys as it causes massive database index fragmentation (random inserts).

## 4. Observability & Logging Rules
**Goal**: Enable Ops team to detect bugs and errors effectively while protecting user data.
- **Rule 1: Full Traceability**
  - Ensure every request (HTTP or Consumer) carries a `trace_id` (OpenTelemetry compatible).
  - Propagate this ID to all downstream services and logs.
- **Rule 2: Strategic Logging**
  - Use the standard `logging` library (or `structlog`).
  - Log at appropriate levels: `ERROR` for exceptions, `INFO` for lifecycle events, `DEBUG` for dev troubleshooting.
- **Rule 3: Security & Privacy**
  - **Strictly Prohibited**: Logging passwords, secrets, or sensitive PII.
  - Implement Pydantic validators or custom filters to mask sensitive fields before logging models.
