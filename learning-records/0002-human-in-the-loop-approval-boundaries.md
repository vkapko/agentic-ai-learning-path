# 0002 — Human-in-the-Loop and Approval Boundaries

**Date:** 2026-06-20
**Lesson:** `lessons/0014-human-in-the-loop-approval-boundaries.html`
**Reference:** `reference/human-in-the-loop-approval-boundaries.html`

## Why this was taught next

Record 0001 explicitly flagged human-in-the-loop / feedback loops as the next topic, and `MISSION.md` names *approval* and *control boundaries* as first-class design surfaces with no dedicated lesson yet. Escalation had been touched in 0008 (monitoring/recovery) and 0010 (context/provenance), and the three-updates frame was freshly built in 0013 (memory) — so a standalone HITL lesson lands in the zone of proximal development and reuses, rather than re-teaches, the feedback-routing distinction.

## Key insights the lesson commits to

- A human gate is a **control boundary**; the design question is *where*, *what kind of interrupt*, and *what the feedback changes* — never "should there be a human?".
- **Placement test:** gate when wrong-action cost > wait cost, and nowhere else. Gating everything dies of latency; gating nothing is unsafe.
- **Three interrupt modes:** approve-before (block then act, for irreversible/expensive), review-after (act then correct, for reversible/high-volume/latency-sensitive), escalate-on-trigger (autonomous until a line is crossed). Teaching/demonstration is a fourth flavor producing a record, not a weight change.
- **Six standard escalation triggers:** low confidence, safety risk, missing permission, irreversible action, policy conflict, novel environment state — written as checkable booleans, not "if it seems risky."
- **Human feedback maps onto the three-updates frame from 0013:** memory write vs. policy/threshold update vs. model-weight update. A single demonstration does not retrain the model; feedback leaking into prompts unvalidated is the poisoned-memory risk again; audit trail + ownership matter most on override.

## Open threads / what may come next

- The capstone end-to-end design: stitch perception → reasoning → action → memory → monitoring → approval → recovery into one sketch (would exercise every lesson, including this one's gates and escalation criteria).
- Possible: cost/latency/reliability trade-off comparison across patterns as an integrative exercise (mission success criterion #3), if not already covered.
- Mission success criterion "defend when *not* to use a more complex pattern" is now partly served (HITL cost trade) but could get its own consolidation lesson.
