# 0001 — Memory Is Data Infrastructure

**Date:** 2026-06-20
**Lesson:** `lessons/0013-memory-as-data-infrastructure.html`
**Reference:** `reference/memory-as-data-infrastructure.html`

## Why this was taught next

Memory is named explicitly in `MISSION.md` ("planning, memory, monitoring") and is Lesson 9 in the learning plan, but it was the only core mission topic with no dedicated lesson after 12 lessons. It had been touched in passing — episode memory (0005), provenance (0010), shared state (0011) — so the learner had the surrounding context to make a standalone memory-design lesson land in the zone of proximal development.

## Key insights the lesson commits to

- Memory is a **governed data store**, not the transcript and not learning.
- The **three-updates distinction** (memory write vs. policy/threshold update vs. model-weight update) — directly counters the misconception CLAUDE.md flags about conflating memory/policy/weight updates.
- Durable record metadata: provenance, owner, timestamp, confidence, expiry.
- **Retrieval is the hard part**: rank by authority + recency (+ permission filter), not similarity alone. Grounded in Generative Agents (recency/importance/relevance) and Lost in the Middle.
- Episodic vs. procedural vs. scratchpad split.

## Open threads / what may come next

- Human-in-the-loop and feedback loops (plan Lesson 10): what human feedback changes — and it maps cleanly onto the three-updates frame from this lesson.
- The capstone end-to-end design.
- No learning records existed before this one; future sessions should keep adding them to track the zone of proximal development.
