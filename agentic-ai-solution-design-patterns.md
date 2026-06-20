# Agentic AI: Solution Design Patterns

Reference notes for common agentic AI design patterns. This version treats the patterns as architectural options, not guarantees: each pattern trades quality, latency, cost, observability, and operational complexity differently.

## Prerequisites

Useful background:

- Agent architectures: controller, reasoning model, action/tool layer, memory, environment.
- Prompt roles and authority: static system/developer instructions should be separated from dynamic user input, tool observations, and retrieved data.
- LLM limits: context windows, hallucination risk, unfaithful reasoning traces, tool errors, and stale knowledge.

## Internal Reasoning and Agent Behavior

### Internal Monologue

**What it is**

An agent may use hidden intermediate reasoning, scratchpads, plans, or self-dialogue before returning a final answer or tool action.

**Correct framing**

- The LLM can generate intermediate reasoning steps, but those steps are not guaranteed to be faithful explanations of the model's actual computation.
- Production systems should usually expose concise rationales or summaries, not raw chain-of-thought.
- Dynamic observations and tool outputs should not be injected as high-authority system prompts. Treat them as tool results, observations, or task context with lower authority.

**Design implications**

- Keep private reasoning private unless the product explicitly requires inspectable traces.
- Log structured decisions, tool calls, inputs, outputs, and verifier results for auditability.
- Use guardrails to prevent untrusted retrieved/tool content from overriding system instructions.

### Chain of Thought

**What it is**

Chain-of-thought prompting asks the model to use intermediate reasoning steps before producing an answer. The original research showed accuracy gains on complex arithmetic, commonsense, and symbolic tasks for sufficiently capable models. [1]

**Corrected claims**

- Chain of thought can improve performance; it does not force correct reasoning.
- Visible reasoning can be plausible but unfaithful. Do not treat it as proof that the answer is correct. [2]
- Prefer hidden reasoning or concise reasoning summaries in production systems.

**When to use**

- Multi-step reasoning tasks.
- Planning or analysis where decomposition improves reliability.
- Cases where extra latency/token cost is acceptable.

**Risks**

- Higher cost and latency.
- Overthinking simple tasks.
- False confidence if users or downstream systems treat generated reasoning as ground truth.

### ReAct

**What it is**

ReAct interleaves reasoning and acting: the model reasons about the task, selects an action/tool, receives an observation, and uses that observation to decide the next step. The key distinction is the feedback loop between model reasoning, tool use, and environment observations. [3]

**Corrected claims**

- ReAct is not merely "chain of thought plus tools." Its value comes from alternating reasoning, action, and observation.
- Tool calls should be structured whenever possible: function/tool name, validated arguments, typed result, and error state.
- The controller should mediate tool access, enforce permissions, validate arguments, and decide whether the next model call receives the observation.

**When to use**

- Tasks requiring live information or external actions.
- Workflows where each result affects the next action.
- Environments where recovery from partial failure matters.

**Risks**

- Tool loops and runaway cost.
- Tool hallucination if available tools are unclear.
- Prompt injection through retrieved content or tool results.

### Reflection and Self-Refinement

**What it is**

Reflection asks a model or separate critic to evaluate outputs, actions, observations, or failures and propose improvements. Self-Refine-style systems use iterative self-feedback to improve an answer without external training. [4]

**Corrected claims**

- Reflection can happen before final output, after a failed action, between ReAct steps, or after an episode.
- Reflection does not update model weights by itself.
- If feedback is stored and reused later, that is memory-based adaptation. If weights change, that is fine-tuning or retraining.

**When to use**

- Draft quality improvement.
- Failure recovery.
- High-stakes outputs that need internal critique before release.

**Risks**

- A model can critique itself incorrectly.
- Multiple passes increase latency and cost.
- Self-critique can reinforce wrong assumptions without external checks.

### Reflexion-Style Episode Learning

**What it is**

Reflexion stores verbal feedback from prior task attempts and uses it in later attempts. It improves future behavior through memory/context, not direct model-weight updates. [5]

**When to use**

- Repeated tasks.
- Agents that need to learn from tool failures, human corrections, or environment feedback.
- Situations where fine-tuning is too slow or expensive.

**Risks**

- Bad memories can poison future behavior.
- Memory needs provenance, expiry, and confidence metadata.
- Privacy and retention rules matter.

## Environment, Knowledge, and Tooling

### Knowledge Graph Integration

**What it is**

Knowledge graphs model entities and relationships in a domain: people, rooms, documents, systems, policies, devices, dependencies, ownership, or constraints.

**Correct framing**

- Knowledge graphs help when entity relationships are important and change over time.
- They are not required for every agent. A database, search index, vector store, API, or event log may be simpler and better.
- The graph must be maintained, versioned, and governed like any other critical data asset.

**When to use**

- Enterprise environments with rich relationships.
- Dependency analysis.
- Compliance, policy, or access-control reasoning.
- Multi-agent systems needing shared domain state.

**Risks**

- Expensive data modeling and maintenance.
- Stale graph edges can create confident wrong actions.
- Query results still need relevance and permission filtering before model use.

### Tool Discovery and Use

**What it is**

Tool discovery lets an agent find relevant tools from a registry instead of loading every tool description into the prompt.

**Correct framing**

- A tool registry can be centralized, distributed, or scoped per agent/domain.
- Tool descriptions should include capability, schema, permissions, side effects, cost, latency, and failure modes.
- The controller should validate tool choice and arguments before execution.

**When to use**

- Large tool catalogs.
- Multi-agent systems with shared tools.
- Domains where tools are frequently added, deprecated, or permissioned.

**Risks**

- Tool-selection errors.
- Overbroad tool access.
- Registry drift between documented tool behavior and real behavior.

### Human-in-the-Loop

**What it is**

Human-in-the-loop inserts human judgment, approval, intervention, or teaching into an agent workflow.

**Corrected claims**

- A human demonstration does not make the LLM permanently learn a new physical skill by itself.
- The system may record a procedural memory, update a robot policy, create a skill template, or trigger retraining/fine-tuning of a perception/control model.
- Use explicit escalation criteria: low confidence, safety risk, missing permission, irreversible action, policy conflict, or novel environment state.

**When to use**

- Safety-critical actions.
- Irreversible operations.
- Ambiguous goals or missing authority.
- Physical-world tasks with uncertain perception or control.

**Risks**

- Latency and staffing cost.
- Unclear ownership if humans override automated recommendations.
- Feedback quality varies by human reviewer.

### Human Feedback Loop Integration

**What it is**

Human feedback loops collect corrections, ratings, confirmations, and examples to improve future behavior.

**Corrected claims**

- Feedback can update memory, thresholds, prompts, routing rules, evaluators, or separate ML models.
- LLM behavior only changes permanently if the feedback is used for fine-tuning, RLHF/RLAIF-style training, or another model-update process.
- For perception-heavy tasks, the updated component may be a vision model or classifier, not the LLM.

**When to use**

- Continuous quality improvement.
- Domains with subjective preferences.
- Detection tasks where false positives/false negatives need reviewer labels.

**Risks**

- Biased or inconsistent labels.
- Feedback leakage into prompts without validation.
- Missing audit trail for model or policy changes.

## Multi-Agent Architecture

### Planning

**What it is**

Planning decomposes a goal into steps, constraints, dependencies, and success criteria.

**Corrected claims**

- Planning does not require multiple agents.
- It can be implemented as a single-agent plan-and-execute loop, a planner/executor split, or an orchestrator-worker system.
- Multi-agent delegation is one implementation, not the definition of planning.

**When to use**

- Large or long-running tasks.
- Tasks with dependencies, checkpoints, or rollback needs.
- Workflows where upfront structure reduces tool calls and confusion.

**Risks**

- Static plans become stale in dynamic environments.
- Plans can look complete while missing hidden constraints.
- Replanning policy must be explicit.

### Orchestrator-Worker

**What it is**

An orchestrator decomposes work and delegates units to worker agents or services. Workers return results, errors, or status updates.

**When to use**

- Parallelizable subtasks.
- Specialized workers with narrow tool access.
- Workflows needing centralized progress tracking.

**Risks**

- Orchestrator bottleneck.
- Worker result inconsistency.
- Error handling and retries become distributed-system problems.

### Specialized Expert Team

**What it is**

A group of specialized agents collaborates on a domain-heavy task. The team may expose one interface agent to the broader system.

**Correct framing**

- Expert teams are useful when a subtask needs multiple forms of domain reasoning.
- "Debate" can help surface alternatives, but it is not a substitute for external verification.
- The team needs protocols for disagreement, source ranking, final authority, and audit logs.

**When to use**

- Legal, security, medical, finance, compliance, or incident-response workflows.
- Tasks where one general-purpose agent is likely to miss domain constraints.

**Risks**

- Higher latency and cost.
- Groupthink if agents share the same model/prompt weaknesses.
- Harder debugging across agent interactions.

### Hierarchical Multi-Agent System

**What it is**

A hierarchy uses top-level orchestrators, sub-orchestrators, workers, and specialized teams to manage large tasks.

**Correct framing**

- Hierarchies can scale coordination, but they are not automatically the most reliable architecture.
- Reliability depends on observability, retry semantics, memory consistency, authorization, idempotency, and failure isolation.

**When to use**

- Very large workflows.
- Systems with naturally nested domains or departments.
- Cases where one orchestrator cannot track all subtasks efficiently.

**Risks**

- Communication overhead.
- State drift between layers.
- Slow failure diagnosis.

### Coherent State and Collective Memory

**What it is**

Agents need consistent access to task state, environment state, decisions, observations, and shared knowledge.

**Corrected claims**

- A centralized shared memory can act as a source of truth, but it can also become a bottleneck or single point of failure.
- Large systems may need event sourcing, distributed stores, scoped memories, caches, leases, versioning, and conflict resolution.
- Shared memory should enforce access control, provenance, retention, and data-quality rules.

**What to store**

- Task goals and status.
- Tool calls and results.
- Environment observations.
- Human approvals and corrections.
- Policies and constraints.
- Knowledge graph references.
- Memory records with provenance, timestamps, owner, confidence, and expiry.

**Risks**

- Stale or contradictory state.
- Prompt injection through stored content.
- Privacy and retention violations.
- Memory retrieval that optimizes similarity but ignores authority or recency.

## Practical Design Checklist

- Define agent roles, authority boundaries, and allowed tools.
- Separate system/developer instructions from user input, retrieved content, and tool observations.
- Prefer structured tool calls over free-text action commands.
- Add validators for tool arguments and outputs.
- Use reflection/verifiers for high-risk outputs, not as a blanket correctness guarantee.
- Treat memory as data infrastructure: provenance, permissions, expiry, conflict handling, and observability.
- Add human approval for irreversible, unsafe, expensive, or low-confidence actions.
- Measure latency, cost, success rate, recovery rate, and human escalation rate.

## Sources

1. Jason Wei et al., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (2022): https://arxiv.org/abs/2201.11903
2. Miles Turpin et al., "Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting" (2023): https://arxiv.org/abs/2305.04388
3. Shunyu Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models" (2022): https://arxiv.org/abs/2210.03629
4. Aman Madaan et al., "Self-Refine: Iterative Refinement with Self-Feedback" (2023): https://arxiv.org/abs/2303.17651
5. Noah Shinn et al., "Reflexion: Language Agents with Verbal Reinforcement Learning" (2023): https://arxiv.org/abs/2303.11366
6. Andy Zhou et al., "Language Agent Tree Search Unifies Reasoning, Acting, and Planning in Language Models" (2023): https://arxiv.org/abs/2310.04406
7. Pei Zhou et al., "Self-Discover: Large Language Models Self-Compose Reasoning Structures" (2024): https://arxiv.org/abs/2402.03620
8. Joon Sung Park et al., "Generative Agents: Interactive Simulacra of Human Behavior" (2023): https://arxiv.org/abs/2304.03442
9. Guanzhi Wang et al., "Voyager: An Open-Ended Embodied Agent with Large Language Models" (2023): https://arxiv.org/abs/2305.16291
