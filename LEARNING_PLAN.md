# Agentic AI Learning Plan

This plan is based on:

- `agentic-ai-architecture-foundations-designing-autonomous-ai-systems.md`
- `agentic-ai-solution-design-patterns.md`
- `agentic-ai-planning-and-reasoning-design.md`

## Provisional mission

Build enough practical judgment to design, critique, and explain agentic AI systems: their autonomy boundaries, modules, planning patterns, tool use, memory, monitoring, and failure modes.

Before starting lessons, replace this provisional mission with the real outcome you want, for example: designing enterprise agents, preparing for interviews, building a prototype, teaching others, or evaluating vendor systems.

## Learning outcomes

By the end, you should be able to:

- Distinguish predictive, generative, and agentic AI by architecture, not marketing labels.
- Map an agentic system into perception, reasoning, action, learning, memory, monitoring, and environment boundaries.
- Choose between simple reflex, model-based reflex, goal-based, and utility-based agents.
- Decide when a system should be single-agent, multi-agent, centralized, decentralized, or hybrid.
- Select planning and reasoning patterns such as ReAct, plan-and-execute, ReWOO, verifier agents, planner-critic-refiner, LATS, Self-Discover, and adaptive tool orchestration.
- Identify risks around stale state, prompt injection, tool loops, bad memory, weak verification, hidden authority, and irreversible side effects.
- Produce a concise architecture sketch and risk checklist for a real agentic AI use case.

## Course shape

Work in short sessions. Each session should produce one artifact: a diagram, decision table, risk checklist, or architecture sketch. The goal is not to memorize names; it is to practice choosing the smallest reliable design for a given task.

### 1. Agentic AI as a control loop

Primary file: `agentic-ai-architecture-foundations-designing-autonomous-ai-systems.md`

Learn:

- Agent, environment, goal, action, feedback, stop condition.
- Why agentic AI is defined by closed-loop action, not by whether it uses an LLM.
- How predictive and generative models can be components inside an agentic system.

Practice:

- Take one workflow, such as customer support triage or calendar scheduling, and label its environment, percepts, actions, feedback, and stop conditions.
- Rewrite a vague "AI agent" description into precise autonomy boundaries.

Checkpoint:

- You can explain why a chatbot is not automatically an agentic system.

### 2. Agent types and autonomy levels

Primary file: `agentic-ai-architecture-foundations-designing-autonomous-ai-systems.md`

Learn:

- Simple reflex, model-based reflex, goal-based, and utility-based agents.
- Why autonomy is scoped rather than binary.
- How risk increases as authority, tool access, and time horizon expand.

Practice:

- Classify five example systems by agent type.
- For each one, identify what extra monitoring or approval is needed if autonomy increases.

Checkpoint:

- You can justify the simplest agent type that fits a workflow.

### 3. Core modules of an agentic system

Primary file: `agentic-ai-architecture-foundations-designing-autonomous-ai-systems.md`

Learn:

- Perception, reasoning, action, learning, memory, and monitoring.
- Difference between state updates, memory updates, policy updates, and model updates.
- Why tool execution and policy enforcement should be separated from model reasoning.

Practice:

- Draw a module map for a proposed agent.
- Mark every boundary where validation, authorization, logging, or rollback is needed.

Checkpoint:

- You can explain why "LLM prompt plus tools" is not a complete architecture.

### 4. System architecture choices

Primary file: `agentic-ai-architecture-foundations-designing-autonomous-ai-systems.md`

Learn:

- Single-agent vs. multi-agent systems.
- Centralized, decentralized, and hybrid architectures.
- Shared state, communication protocols, escalation, arbitration, and observability.

Practice:

- Compare a single-agent design against an orchestrator-worker design for the same use case.
- List the failure modes introduced by adding more agents.

Checkpoint:

- You can decide when multi-agent coordination is worth its operational complexity.

### 5. Foundational reasoning and behavior patterns

Primary file: `agentic-ai-solution-design-patterns.md`

Learn:

- Internal monologue, chain of thought, ReAct, reflection, and Reflexion-style episode learning.
- Why visible reasoning is not proof of correctness.
- Why ReAct is valuable when observations change the next action.

Practice:

- Pick a task and choose between one-shot generation, chain-of-thought style decomposition, and ReAct.
- Identify the controller responsibilities around tool calls and observations.

Checkpoint:

- You can explain why ReAct is a reason-act-observe loop, not simply "CoT plus tools."

### 6. Tools, knowledge, humans, and memory

Primary file: `agentic-ai-solution-design-patterns.md`

Learn:

- Tool discovery and tool registry design.
- Knowledge graph integration.
- Human-in-the-loop and human feedback loops.
- Coherent state and collective memory.

Practice:

- Design a tool description schema with capability, arguments, permissions, side effects, cost, latency, and failure modes.
- Define what should and should not be stored in memory for a repeated workflow.

Checkpoint:

- You can distinguish useful memory from dangerous ungoverned context accumulation.

### 7. Planning and execution patterns

Primary file: `agentic-ai-planning-and-reasoning-design.md`

Learn:

- Plan-and-execute.
- Concurrent execution optimizer.
- ReWOO.
- Planner-critic-refiner.
- Adaptive tool orchestration.

Practice:

- Given a multi-step task, decide whether execution should be sequential, parallel, retrieval-first, or workflow-orchestrated.
- Mark which steps require replanning after failure.

Checkpoint:

- You can choose a planning pattern based on dependency structure, latency, cost, and environment volatility.

### 8. Search, verification, and self-correction

Primary file: `agentic-ai-planning-and-reasoning-design.md`

Learn:

- LATS.
- Self-Discover.
- Second-pass verification.
- Limits of self-correction without external evidence.

Practice:

- Add a verifier to one previous architecture sketch.
- Decide what evidence the verifier needs to be meaningfully independent.

Checkpoint:

- You can explain when extra reasoning passes improve reliability and when they only add cost.

### 9. Capstone: design an agentic AI system

Use all three files.

Practice:

- Choose one real use case.
- Define the goal, environment, tools, actions, state, memory, authority, stop conditions, and human approval points.
- Pick an agent type and system architecture.
- Pick planning and reasoning patterns.
- Add monitoring, logging, verification, and rollback paths.
- Write the top ten failure modes and mitigations.

Checkpoint:

- You can defend the architecture tradeoffs in plain language.

## Spaced review schedule

Use retrieval before rereading.

- Day 1: Sessions 1-2.
- Day 2: Recall the agent types from memory, then complete Session 3.
- Day 4: Recall the core modules and their risks, then complete Session 4.
- Day 7: Complete Sessions 5-6.
- Day 10: Complete Sessions 7-8.
- Day 14: Capstone.
- Day 21: Redesign the capstone from scratch and compare it to the original.

## Practice prompts

- What makes this system agentic rather than merely generative?
- What does the agent observe, and what is hidden, stale, delayed, noisy, or adversarial?
- What actions can change the environment?
- Which actions need approval?
- What is the smallest agent type that fits?
- What happens when a tool call partially succeeds?
- What state is authoritative?
- What memory is useful, and what memory is risky?
- What evidence would make a verifier independent?
- What monitoring would catch a tool loop, state drift, or unsafe escalation?

## First lesson recommendation

Start with: **Agentic AI as a control loop**.

The first lesson should be a short interactive HTML exercise where you classify examples as predictive, generative, or agentic, then map one system into perceive-reason-act-observe steps. This creates the foundation for every later pattern choice.
