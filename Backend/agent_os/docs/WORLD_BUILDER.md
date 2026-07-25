# World Builder

## Purpose

The `WorldBuilder` is responsible for assembling the canonical `WorldContext`.

It does **not** fetch external data.

It does **not** call APIs.

It does **not** perform business logic.

Its only responsibility is orchestrating collectors and assembling the final `WorldContext` object.

---

## Responsibility

The World Builder expects every collector to return **normalized domain objects**.


```
External API
│
▼
Client
│
▼
Collector
(normalization + cache)
│
▼
WorldBuilder
│
▼
WorldContext
```

The builder should never concern itself with how the data was obtained or normalized.

It simply requests normalized data from each collector and assembles the final snapshot.

---

## Current Pipeline

```
GNews API
│
▼
GNewsClient
│
▼
NewsCollector
│
▼
WorldBuilder
│
▼
WorldContext
```

The `NewsCollector` is responsible for:

- calling the client
- caching responses
- normalizing external data
- returning internal schemas

The `WorldBuilder` simply consumes the normalized result.

---

## Design Rules

The World Builder should:

- orchestrate collectors
- assemble the `WorldContext`
- remain deterministic
- remain unaware of external APIs
- remain unaware of cache implementations

The World Builder should **never**:

- call external services
- perform normalization
- perform calculations
- contain business rules
- know where data originated

---

## When is another Builder required?

In most situations a collector should both retrieve **and normalize** its data.

For example:
### NewsCollector

can fully normalize the GNews response into `NewsHeadline` objects.

No additional builder is required.

---

### Introduce a specialised Builder only when necessary.

A collector may eventually retrieve data that cannot be normalized without significant domain-specific business logic.

Example:
```
TrendCollector
│
(raw activity)
▼
TrendBuilder
(calculates scores,
ranking,
deduplication,
time windows,
etc.)
│
(normalized trends)
▼
WorldBuilder
```


Here the specialised builder owns the complex business logic while the collector remains responsible for data retrieval.

---

## Rule of Thumb

Introduce an intermediate builder **only when a collector cannot reasonably perform normalization on its own.**

If the collector can:

- fetch the data,
- normalize it,
- and return internal schemas,

then no additional abstraction should be introduced.

Following the project's YAGNI philosophy, specialised builders should only exist when they solve a real architectural problem rather than a hypothetical one.

---

## Guiding Principle

The World Builder should always remain a lightweight orchestration layer.

Its job is simply:
```
Collectors
│
▼
Normalized Data
│
▼
WorldBuilder
│
▼
WorldContext
```
Nothing more.



