# Agentic AI Learning Plan

This plan is based on the three local notes:

- `agentic-ai-architecture-foundations-designing-autonomous-ai-systems.md`
- `agentic-ai-solution-design-patterns.md`
- `agentic-ai-planning-and-reasoning-design.md`

The plan assumes the mission in `MISSION.md`: build practical fluency for explaining and designing agentic AI systems. Revise the mission first if the real goal is narrower, such as interview prep for one company, building a demo, or evaluating vendor architecture.

## Learning Strategy

Each lesson should be short and produce one usable design skill. The order moves from vocabulary, to architecture decomposition, to pattern selection, to reliability and governance. Retrieval practice is built in: each session should start with a cold recall prompt from earlier material.

## Phase 1: Core Vocabulary and Boundaries

### 1. What Makes a System Agentic

**Goal:** Explain the difference between predictive, generative, and agentic AI.

**Source sections:**

- Architecture Foundations: `Agentic AI System`
- Architecture Foundations: `Autonomous AI Agent`
- Architecture Foundations: `Agentic AI Compared With Predictive and Generative AI`

**Practice:**

- Classify five systems as predictive, generative, agentic, or mixed.
- For each agentic example, name its goal, environment, actions, feedback, and stop condition.

**Exit check:**

- You can say why "LLM with tools" is insufficient as a definition.

### 2. Agent Types as Design Choices

**Goal:** Choose between simple reflex, model-based reflex, goal-based, and utility-based agents.

**Source sections:**

- Architecture Foundations: `Agent Types`
- Architecture Foundations: `Module Utilization by Agent Type`

**Practice:**

- Given four workflows, pick the simplest agent type that fits.
- Explain one risk introduced when moving up each level of sophistication.

**Exit check:**

- You can defend why a utility-based agent needs governance around tradeoffs.

## Phase 2: Anatomy of an Agentic System

### 3. The Agent-Environment Loop

**Goal:** Draw the perceive, interpret, reason, act, observe, update loop for a concrete workflow.

**Source sections:**

- Architecture Foundations: `Environment`
- Architecture Foundations: `Agent-Environment Interaction Loop`
- Solution Design Patterns: `ReAct`

**Practice:**

- Map a customer-support agent through one full loop.
- Mark which observations are trusted, delayed, stale, or adversarial.

**Exit check:**

- You can distinguish feedback for task state from long-term learning.

### 4. Perception, Reasoning, Action, Learning

**Goal:** Separate agent modules and avoid stuffing architecture into one prompt.

**Source sections:**

- Architecture Foundations: `Core Agent Modules`
- Solution Design Patterns: `Knowledge Graph Integration`
- Solution Design Patterns: `Tool Discovery and Use`

**Practice:**

- Decompose one workflow into perception, reasoning, action, learning, memory, tools, and policy enforcement.
- Identify which module owns validation, permissions, retries, and rollback.

**Exit check:**

- You can identify where prompt injection, stale state, and irreversible side effects enter the design.

## Phase 3: Planning and Reasoning Patterns

### 5. ReAct vs Plan-and-Execute

**Goal:** Choose between interleaved reasoning and upfront planning.

**Source sections:**

- Solution Design Patterns: `ReAct`
- Planning and Reasoning: `Plan-and-Execute`

**Practice:**

- Compare both patterns for a travel-booking agent, repository-maintenance agent, and incident-response agent.
- Estimate cost, latency, adaptiveness, and failure recovery for each.

**Exit check:**

- You can explain why ReAct is better for changing observations, while plan-and-execute can be cheaper for stable workflows.

### 6. Parallel and Retrieval-Heavy Planning

**Goal:** Recognize when to use task DAGs, concurrent execution, or ReWOO-style retrieval planning.

**Source sections:**

- Planning and Reasoning: `Concurrent Execution Optimizer`
- Planning and Reasoning: `Reasoning Without Observation (ReWOO)`
- Planning and Reasoning: `Adaptive Tool Orchestration`

**Practice:**

- Turn a linear research workflow into a dependency graph.
- Decide which tool calls can run concurrently and which require previous results.

**Exit check:**

- You can distinguish a general task compiler from ReWOO-style retrieval placeholders.

### 7. Critique, Verification, and Self-Correction

**Goal:** Use reflection and verifier patterns without overclaiming correctness.

**Source sections:**

- Solution Design Patterns: `Reflection and Self-Refinement`
- Planning and Reasoning: `Planner-Critic-Refiner`
- Planning and Reasoning: `Second-Pass Verification`
- Solution Design Patterns: `Chain of Thought`

**Practice:**

- Design a verifier for a contract-review or compliance workflow.
- Decide what evidence the verifier needs to be meaningfully independent.

**Exit check:**

- You can explain why a model critiquing itself is not the same as independent validation.

### 8. Search-Based and Strategy-Generating Reasoning

**Goal:** Know when advanced reasoning patterns are worth their cost.

**Source sections:**

- Planning and Reasoning: `Language Agent Tree Search (LATS)`
- Planning and Reasoning: `Self-Discover`

**Practice:**

- Pick one high-stakes task where LATS is justified and one where it is overkill.
- Pick one novel task where Self-Discover may help and list debugging risks.

**Exit check:**

- You can distinguish a strategy generator from a sequence explorer.

## Phase 4: Memory, Learning, and Human Control

### 9. Memory Is Data Infrastructure

**Goal:** Design memory with provenance, permissions, expiry, and retrieval rules.

**Source sections:**

- Solution Design Patterns: `Reflexion-Style Episode Learning`
- Solution Design Patterns: `Coherent State and Collective Memory`
- Planning and Reasoning: `Episodic and Procedural Memory`
- Planning and Reasoning: `In-Context Learning`

**Practice:**

- Define what to store after an agent completes a task.
- Label each memory as episodic, procedural, policy, observation, approval, or tool result.

**Exit check:**

- You can explain why memory updates are not model-weight updates.

### 10. Human-in-the-Loop and Feedback Loops

**Goal:** Place human judgment where it changes risk, not as a vague safety blanket.

**Source sections:**

- Solution Design Patterns: `Human-in-the-Loop`
- Solution Design Patterns: `Human Feedback Loop Integration`

**Practice:**

- Add escalation rules to an agent design for low confidence, irreversible action, policy conflict, and novel environment state.
- Decide what human feedback changes: memory, prompt, threshold, evaluator, model, or policy.

**Exit check:**

- You can specify what a human approval authorizes and what it does not authorize.

## Phase 5: Multi-Agent and Production Architecture

### 11. Single-Agent, Multi-Agent, Centralized, Decentralized, Hybrid

**Goal:** Choose architecture based on coordination needs, governance, scalability, and failure diagnosis.

**Source sections:**

- Architecture Foundations: `System Architectures`
- Solution Design Patterns: `Orchestrator-Worker`
- Solution Design Patterns: `Specialized Expert Team`
- Solution Design Patterns: `Hierarchical Multi-Agent System`

**Practice:**

- Redesign the same workflow three ways: single-agent, orchestrator-worker, and hybrid.
- Identify the state consistency and authorization problem each design creates.

**Exit check:**

- You can defend when multi-agent architecture adds more risk than value.

### 12. Monitoring, Safety, and Operational Readiness

**Goal:** Add monitors and tests that match the autonomy level.

**Source sections:**

- Architecture Foundations: `Monitoring`
- Architecture Foundations: `Practical Design Checklist`
- Solution Design Patterns: `Practical Design Checklist`

**Practice:**

- Build a monitoring checklist for one agent: performance, cost, tool errors, state drift, policy compliance, approvals, and recovery.
- Define tests for stale state, bad input, partial failure, tool errors, and adversarial content.

**Exit check:**

- You can explain what needs to be logged for auditability without exposing raw chain of thought.

## Capstone

Design one agentic system end to end.

Suggested scenario: an interview-prep research assistant that reads company notes, searches approved sources, drafts study plans, asks for human approval before sending messages or modifying files, and records what worked after each session.

Deliverables:

- Goal, environment, tools, authority, stop conditions.
- Agent type and system architecture.
- Perception, reasoning, action, learning, memory, and monitoring modules.
- Planning/reasoning pattern choice with rejected alternatives.
- Human approval and escalation policy.
- Failure-mode table.
- Test plan.

## Spaced Review Schedule

- Day 1: Lessons 1-2, plus cold recall of definitions.
- Day 2: Lessons 3-4, plus classify three new workflows.
- Day 4: Lessons 5-6, plus ReAct vs plan-and-execute comparison from memory.
- Day 7: Lessons 7-8, plus verifier/self-correction critique.
- Day 10: Lessons 9-10, plus memory and human-feedback design exercise.
- Day 14: Lessons 11-12, plus full architecture sketch.
- Day 21: Capstone review and interview-style explanation.

## Reference Sheets To Create Next

- `reference/agentic-ai-glossary.html`
- `reference/agent-type-decision-table.html`
- `reference/pattern-selection-matrix.html`
- `reference/agentic-system-design-checklist.html`
- `reference/monitoring-and-risk-checklist.html`

## First Lesson To Build

`lessons/0001-what-makes-a-system-agentic.html`

The first lesson should teach the smallest useful distinction: predictive vs generative vs agentic systems, then make you classify examples and identify goal, environment, action, feedback, authority, and stop condition.
