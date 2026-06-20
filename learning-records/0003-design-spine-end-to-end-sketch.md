# 0003 — The Design Spine: End-to-End Agent Sketch (Capstone)

**Date:** 2026-06-20
**Lesson:** `lessons/0015-design-spine-end-to-end-sketch.html`
**Reference:** `reference/design-spine-end-to-end-sketch.html`

## Why this was taught next

Both prior records (0001, 0002) explicitly flagged the capstone — stitching perception → reasoning → action → memory → monitoring → approval → recovery into one sketch — as the natural next step, and it directly serves `MISSION.md` success criteria #4 (sketch a design with all paths explicit) and #5 (defend when *not* to use a more complex pattern). With the last missing surfaces now taught (memory 0013, approval 0014), every component the spine references exists, so the integrative lesson finally lands in the zone of proximal development. It is deliberately a *skills* lesson: mostly retrieval and interleaving across lessons 0001–0014, not new knowledge.

## Key insights the lesson commits to

- The capstone is an **eight-pass ordered template** (Frame → Fit → Loop → Tools → Memory → Gates → Watch → Fail), each pass mapped to the lesson that owns its detail. The template itself is the durable artifact (now a reference doc).
- The governing rule is **design from the task inward, not the pattern outward**: add machinery only when its cost is less than the cost it removes; defend every box drawn *and* every box left out. This is the mission's "smallest reliable design" / "defend when not to use a complex pattern" criterion made operational.
- Passes **cross-link**: e.g. an action being hard-to-undo (pass 1) forces an approve-before gate (pass 6); a tool-loop risk (pass 8) is closed by a monitor (pass 7). The spine's value is surfacing these dependencies.
- Worked example used a **fresh domain** (on-call incident triage) to force interleaving rather than reusing the HITL travel/refund domain.
- A **Defense Check** list operationalizes "defend the trade-offs in plain language" — the mission's capstone checkpoint.

## Open threads / what may come next

- This completes the conceptual arc of the learning plan (Sessions 1–12). The plan's **Session 11 (Claude Code configuration & CI/CD workflows)** has no dedicated lesson yet — it is the main remaining gap if the user wants the applied/Claude-specific track (grounded in the *Claude Certified Architect – Foundations* reference).
- **Spaced review**: the learning plan schedules "redesign the capstone from scratch and compare" ~1 week out (Day 23). A future session could run that as a blank-page retrieval exercise and diff against this sketch — strong storage-strength practice.
- Possible consolidation lesson explicitly on the **cost/latency/reliability trade-off comparison across patterns** (mission success #3) if the user wants a decision-table artifact rather than a full sketch.
- No mission change; the capstone confirms the existing mission rather than revising it.
