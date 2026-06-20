# Agentic AI Learning Path

A practical learning path for understanding, explaining, and designing agentic AI systems.

The repository focuses on architecture judgment: autonomy boundaries, agent-environment loops, planning patterns, tool use, memory, monitoring, approvals, and failure modes. It is meant to help readers move beyond vague "AI agent" language and describe systems in concrete design terms.

## Start Here

1. Read `MISSION.md` to understand the target outcome.
2. Use `AGENTIC-AI-LEARNING-PLAN.md` as the main lesson sequence.
3. Keep `RESOURCES.md` nearby for supporting papers, books, and community references.
4. Use the three core reference modules when a lesson points to deeper reading:
   - `agentic-ai-architecture-foundations-designing-autonomous-ai-systems.md`
   - `agentic-ai-solution-design-patterns.md`
   - `agentic-ai-planning-and-reasoning-design.md`

## Repository Contents

- `MISSION.md`: learning mission, success criteria, constraints, and out-of-scope topics.
- `AGENTIC-AI-LEARNING-PLAN.md`: current structured curriculum.
- `LEARNING_PLAN.md`: earlier learning-plan draft retained as reference.
- `RESOURCES.md`: curated local and external resources.
- `agentic-ai-*.md`: standalone reference modules.
- `lessons/`: HTML lesson material.
- `reference/`: rendered reference material.
- `assets/`: CSS, JavaScript, and Reveal.js assets used by lessons.
- `CLAUDE.md` and `AGENTS.md`: guidance for AI coding agents working in this repository.

## Learning Approach

Work in short sessions. Each session should produce a concrete artifact such as:

- an agent-environment loop diagram
- an autonomy boundary note
- a planning-pattern comparison
- a tool-use risk checklist
- a concise architecture sketch

The goal is not to memorize pattern names. The goal is to choose the smallest reliable design for a workflow and explain its tradeoffs.

## Local Usage

There is no build system or package manager configuration. Most content can be read directly as Markdown or opened as static HTML.

Useful commands:

```powershell
rg --files
git status --short
git diff -- README.md
```

To view HTML lessons, open files under `lessons/` directly in a browser.

## Editing Guidelines

- Use clear Markdown with ATX headings.
- Keep paragraphs short and sections scannable.
- Preserve the direct instructional tone.
- Prefer lowercase kebab-case filenames for new content.
- Keep changes narrowly scoped to the topic being edited.
- Verify heading hierarchy, links, citations, and rendered Markdown before committing.

## License

See `LICENSE`.
