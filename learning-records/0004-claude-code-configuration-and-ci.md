# 0004 — Claude Code Configuration and CI/CD Workflows (Applied Session 11)

**Date:** 2026-06-20
**Lesson:** `lessons/0016-claude-code-configuration-and-ci.html`
**Reference:** `reference/claude-code-configuration-and-ci.html`

## Why this was taught next

Record 0003 (the capstone) named **Session 11 — Claude Code configuration & CI/CD** as the single remaining gap in the learning plan: every conceptual session (1–10, 12) had a lesson, and the applied Claude-specific track was otherwise covered (structured output 0009, context/escalation 0010), but Session 11 had none. It sits squarely in the zone of proximal development *after* the capstone because it is deliberately an **interleaving** lesson — it reuses, rather than introduces, the course's core abstractions and binds them to a concrete mechanism the user actually operates daily (Claude Code itself). This directly serves the mission's "programmatic vs prompt enforcement" and "scope authority" threads, made operational.

## Key insights the lesson commits to

- **Configuration = context + authority placement.** Every artifact answers two questions: *when does it load* (always / on matching paths / on demand) and *who gets it* (project-shared via VCS / user-personal). This is the unifying frame, not a list of features.
- **Five surfaces**, ranked by load-timing: root CLAUDE.md (always), directory CLAUDE.md (subtree), `.claude/rules/` with `paths` globs (on matching files, can span directories), `.claude/skills/` (on demand; `context: fork` / `allowed-tools` / `argument-hint`), `.claude/commands/` (on demand). The glob rule is the only surface that covers a file type scattered across the tree — the discriminating case used in the first quiz.
- **The hierarchy trap:** a "team standard" placed at user scope (`~/.claude/`) silently fails for teammates because it is never shared through the repo. The fix question is "who is accountable for following it?" not "where is it convenient?"
- **Plan mode vs direct execution** is the plan-and-execute decision (lesson 0007) applied to coding: plan for large/multi-file/architectural/multi-approach work, direct for clear well-scoped changes; `context: fork` and the Explore subagent are context-hygiene moves.
- **CI is a non-interactive agentic loop:** `-p` (no hang), `--output-format json --json-schema` (structured findings = lesson 0009), CLAUDE.md as the criteria channel, and — the key reliability tie-back to lesson 0012 — the review must run as an **independent instance**, because a generator reviewing its own session is a weak verifier.

## Open threads / what may come next

- **The conceptual + applied arc is now complete.** All 12 plan sessions have at least one lesson. Remaining moves are consolidation and storage-strength, not new knowledge.
- **Spaced review (storage strength):** the plan's Day 23 item — "redesign the capstone from scratch and compare" — is the strongest next exercise: a blank-page retrieval drill diffed against `0015`. Worth scheduling roughly one week out.
- A possible **cross-pattern decision-table** lesson (mission success #3: compare patterns by cost/latency/reliability/risk) remains the one artifact the course has not produced as a standalone reference.
- No mission change.
