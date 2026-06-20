# Repository Guidelines

## Project Structure & Module Organization

This repository is a Markdown-based learning path for agentic AI design. The current top-level files are standalone reference modules:

- `agentic-ai-architecture-foundations-designing-autonomous-ai-systems.md`
- `agentic-ai-planning-and-reasoning-design.md`
- `agentic-ai-solution-design-patterns.md`

There is no separate `src/`, `tests/`, or assets directory at present. Keep new content modules at the repository root unless a broader folder structure is introduced. Use descriptive, lowercase, hyphen-separated filenames that match the topic.

## Build, Test, and Development Commands

No build system or package manager configuration is currently present. Useful local commands:

- `rg --files` lists tracked content files quickly.
- `Get-Content -TotalCount 40 <file.md>` previews the start of a module in PowerShell.
- `git status --short` checks pending changes before editing or committing.
- `git diff -- <file.md>` reviews exact edits.

If future tooling is added, document the canonical commands here before relying on them in reviews.

## Coding Style & Naming Conventions

Write in clear Markdown with ATX headings (`#`, `##`, `###`). Keep sections focused and scannable, with short paragraphs and bullets for lists of concepts or design implications. Preserve the existing instructional tone: direct definitions, caveats, and actionable design guidance. Use ASCII punctuation unless a cited source or established term requires otherwise.

For filenames, use lowercase kebab case, for example `agentic-ai-evaluation-and-monitoring.md`.

## Testing Guidelines

There is no automated test suite. For content changes, manually verify:

- Heading hierarchy is logical and does not skip levels.
- Links, citations, and reference numbers still resolve consistently.
- Examples remain accurate and aligned with the surrounding topic.
- Markdown renders cleanly in your editor or previewer.

When adding scripts or generated assets later, include focused tests and document how to run them.

## Commit & Pull Request Guidelines

The current Git history uses short, plain-language commit messages, for example `added sources`. Continue using concise imperative or descriptive summaries, such as `add planning examples` or `clarify architecture risks`.

Pull requests should include a brief summary, the files changed, and any validation performed. For substantial content edits, mention citation updates, removed sections, or terminology changes so reviewers can focus their pass.

## Agent-Specific Instructions

Before modifying content, check for existing guidance files and inspect the relevant Markdown module. Do not overwrite user changes. Keep edits narrowly scoped to the requested topic and avoid introducing tooling or structure unless it is required.
