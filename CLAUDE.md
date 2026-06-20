# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

A personal learning path and reference library for agentic AI system design. All content is Markdown — no build system, tests, or code.

## Content Structure

Three reference documents, each independent but complementary:

- **`agentic-ai-architecture-foundations-designing-autonomous-ai-systems.md`** — Core vocabulary: agent types (reflex, model-based, goal-based, utility-based), the perception/reasoning/action/learning module breakdown, monitoring categories, and single vs. multi-agent system architectures.

- **`agentic-ai-planning-and-reasoning-design.md`** — Advanced planning patterns: Plan-and-Execute, Concurrent Execution Optimizer (task DAG), ReWOO, Planner-Critic-Refiner, LATS (MCTS-based), Self-Discover, and Second-Pass Verification. Also covers memory patterns (episodic/procedural) and Adaptive Tool Orchestration.

- **`agentic-ai-solution-design-patterns.md`** — Architectural patterns for agent behavior and multi-agent coordination: Internal Monologue, Chain of Thought, ReAct, Reflection/Self-Refinement, Reflexion, Knowledge Graph Integration, Tool Discovery, Human-in-the-Loop, Orchestrator-Worker, Specialized Expert Team, Hierarchical Multi-Agent, and Coherent State/Collective Memory.

## Document Conventions

Each pattern or concept follows a consistent structure:
- **What it is** — definition
- **How it works** / **Correct framing** / **Examples** — specifics
- **Trade-offs** or **Risks** — what to watch out for
- **When to use** / **Design implications** — guidance
- Inline citations `[N]` link to the **Sources** section at the bottom of each file

Sources cite the primary research papers (arXiv links) and framework documentation.

## Content Principles

When adding or editing content:
- Correct framing sections exist to counter common misconceptions — preserve this critical voice
- Patterns are presented as architectural options with explicit trade-offs, not prescriptions
- Avoid conflating memory updates, policy updates, and model weight updates — the documents draw these distinctions carefully
- Keep the agent-environment interaction loop (perceive → reason → act → observe) as the organizing metaphor
