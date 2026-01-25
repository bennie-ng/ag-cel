# 🍃 Spring Boot Microservices: Standard Operating Procedures
This document defines the mandatory development patterns for our Java/Kotlin ecosystem, focusing on Spring Boot 3.x, Spring Data JPA, and Spring Cloud Stream.

## 0. General Standards
- **Style Guide**: Follow the Google Java Style Guide.
- **Testing**: Use **JUnit 5** and **Mockito**.
- **Coverage**: Unit (Logic) + Integration (@SpringBootTest) for API/DB validation.
- **Build Tools**: Use Maven or Gradle with standard directory layouts.

## 1. API & Controller Rules (REST Standards)
**Goal**: Maintain a strict "Contract-First" mentality to ensure frontend and cross-service compatibility.

- **Rule 1: DTO Isolation**
  - **Prohibited**: Never return an `@Entity` class in a `@RestController`.
  - **Mandatory**: Use **Java Records** (JDK 17+) for DTOs to ensure immutability. Use MapStruct for compile-time safe mapping between Entities and DTOs.

- **Rule 2: Global Error Interception**
  - Use `@RestControllerAdvice` to catch domain-specific exceptions (e.g., `OrderNotFoundException`) and map them to standard RFC 7807 Problem Details for HTTP APIs.

- **Rule 3: Virtual Threads (Java 21+)**
  - For high-concurrency I/O, enable `spring.threads.virtual.enabled=true`.
  - Avoid blocking synchronized blocks; use `ReentrantLock` to prevent thread pinning.

- **Rule 4: Explicit Versioning & Documentation**
  - Version URIs at the class level: `@RequestMapping("/api/v1/resources")`.
  - Use `springdoc-openapi` to automatically expose Swagger UI at `/swagger-ui.html`.

## 2. Event-Driven Messaging Rules (Spring Cloud Stream)
**Goal**: Abstract away the broker logic and ensure reliable, traceable message delivery.

- **Rule 1: Binder Abstraction**
  - Do not use raw Kafka/RabbitMQ templates. Use Spring Cloud Stream Bindings (`Source`, `Sink`, `Processor`) to remain broker-agnostic.

- **Rule 2: Transactional Outbox (The "Golden Rule")**
  - Business logic updates and "Event Publishing" must be atomic.
  - Save the event to a local `OUTBOX` table in the same `@Transactional` block. Use a separate scheduled worker or CDC (Change Data Capture) to move it to the broker.

- **Rule 3: Mandatory Idempotency Checks**
  - Every consumer must be idempotent. Use a `unique_event_id` and check a distributed cache (Redis) before processing.

- **Rule 4: Observability & Tracing**
  - Propagate the `traceId` and `spanId` through message headers using **Micrometer Tracing**. Ensure the producer's trace is visible in the consumer's logs.

## 3. Persistence & JPA Rules (Spring Data JPA)
**Goal**: Prevent memory leaks, N+1 query issues, and database deadlocks.

- **Rule 1: Fetch Strategy**
  - **Mandatory**: Use `FetchType.LAZY` for all `@OneToMany` and `@ManyToMany` associations.
  - To avoid N+1 issues, use `@EntityGraph` or `JOIN FETCH` only when the related data is explicitly required for that specific business flow.

- **Rule 2: Transactional Integrity**
  - Apply `@Transactional` only at the Service layer.
  - Use `readOnly = true` for all "GET" operations to disable Hibernate's dirty checking and save memory.

- **Rule 3: Interface Projections for Reads**
  - If you only need 3 columns of a 50-column table, use a **Projection Interface** instead of fetching the whole Entity.
  - *Example*: `List<UserSummary> findByStatus(Status status);`

- **Rule 4: Audit Logging**
  - Enable `@EnableJpaAuditing`. Every entity must have `@CreatedDate` and `@LastModifiedDate` fields for traceability.

- **Rule 5: No @Data on Entities**
  - **Prohibited**: Lombok's `@Data` or `@EqualsAndHashCode` on entities.
  - **Mandatory**: Use `@Getter` and `@Setter`. Manually implement `equals` and `hashCode` using only the UUID/Primary Key to avoid issues with `Set` collections and Proxy objects.

- **Rule 6: Primary Key Standardization**
  |Status|Type|Technical Implementation|Rationale|
  |---|---|---|---|
  |Primary Choice|TSID|Long (64-bit) via @TsId|Optimal balance of size (8 bytes), sorting, and batching performance. **Implementation**: 1. Add `io.hypersistence:hypersistence-utils-hibernate-xx` dependency. 2. Annotate the primary key with `@Id` and `@TsId`. 3. Configure `TSID_NODE` as an environment variable in Kubernetes to ensure node uniqueness.|
  |Secondary Choice|UUID v7|UUID (128-bit) via @GeneratedValue|Use when 128-bit global uniqueness is required or native UUID types are preferred.|
  |Prohibited|IDENTITY|GenerationType.IDENTITY|Leaks data (guessable), prevents JDBC batching, and requires DB round-trips.|

## 4. Observability & Logging Rules
**Goal**: Enable Ops team to detect bugs and errors effectively while protecting user data.
- **Rule 1: Full Traceability (Micrometer)**
  - Ensure `TraceId` and `SpanId` are present in MDC (Mapped Diagnostic Context) for all logs.
  - Automatically injected via Spring Boot Actuator + Micrometer Tracing.
- **Rule 2: Strategic Logging (SLF4J)**
  - Use `log.info()` for business milestones and `log.error()` for exceptions.
  - Exception logs MUST include the stack trace: `log.error("Msg", ex)`.
- **Rule 3: Security & Privacy**
  - **Strictly Prohibited**: Logging passwords, secrets, or sensitive PII.
  - Use `@ToString.Exclude` on sensitive fields in DTOs/Entities to prevent accidental logging via `toString()`.
