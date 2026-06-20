# Agentic AI: Architecture Foundations

Reference notes for designing autonomous AI systems. This version treats agentic AI as an architectural style built around agents, environments, goals, actions, monitoring, and control boundaries.

## Prerequisites

Useful background:

- Predictive AI: models trained to estimate, classify, rank, forecast, or recommend from input data.
- Generative AI: models trained to produce text, images, code, audio, video, or other data.
- Software architecture: components, interfaces, state, failure modes, observability, and deployment boundaries.
- AI risk management: safety, security, fairness, accountability, transparency, privacy, robustness, and human oversight. [6]

## Core Concepts

### Agentic AI System

**What it is**

An agentic AI system uses one or more agents that perceive an environment, reason about goals or conditions, and take actions through software or hardware interfaces. The classic AI framing defines an agent as something that perceives its environment through sensors and acts on that environment through actuators. [1]

**Correct framing**

- "Agentic" does not mean fully independent, unconstrained, or always learning.
- Autonomy is scoped: an agent may be autonomous only within a narrow domain, tool set, permission boundary, or time window.
- A single agent can be an agentic system; larger systems often coordinate multiple agents.
- An agentic system still needs ordinary architecture work: state management, permissions, logging, testing, rollout, recovery, and monitoring.

**Design implications**

- Define the agent's goal, allowed actions, environment, authority, and stop conditions.
- Separate agent logic from tool execution, policy enforcement, and human approval.
- Treat autonomy as a risk variable: broader autonomy requires stronger guardrails and observability.

### Autonomous AI Agent

**What it is**

An autonomous AI agent is a software or embodied system that can operate with some degree of independence. Agent research commonly emphasizes autonomy, reactivity, proactiveness, and social ability: agents can react to changes, pursue goals, and coordinate with other systems or people. [2]

**Correct framing**

- "Autonomous" is not binary. Agents can be fully automated for low-risk tasks and approval-gated for high-risk tasks.
- Not every agent needs a large language model. Agents can use rules, planners, classifiers, reinforcement-learning policies, symbolic models, generative models, or combinations of these.
- Not every autonomous program is meaningfully AI. A simple rule-based reflex agent may be best described as an agent-like component unless it participates in a broader AI system.

**Design implications**

- Document which decisions the agent can make without approval.
- Document which data and tools it can access.
- Give every agent a measurable success criterion and a failure-handling path.

### Agentic AI Compared With Predictive and Generative AI

**What it is**

Predictive AI primarily maps inputs to predictions or decisions. Generative AI primarily maps prompts or context to generated artifacts. Agentic AI adds a control loop: perceive, reason, act, observe results, and continue.

**Correct framing**

- Agentic systems may include predictive and generative models, but the architecture is organized around action in an environment.
- Predictive and generative models can be components inside perception, reasoning, planning, memory, tool selection, or monitoring.
- The core difference is not the model type; it is the closed-loop relationship between goals, environment state, actions, and feedback.

**Risks**

- Treating an LLM prompt as the whole architecture.
- Letting a model execute actions without permission checks.
- Ignoring state, rollback, and auditability because the task "looks conversational."

## Agent Types

### Simple Reflex Agent

**What it is**

A simple reflex agent maps the current percept directly to an action using condition-action rules. It does not maintain meaningful history or plan future steps. [1]

**Example**

If an order is placed, send a confirmation email.

**When to use**

- Narrow, low-risk reactions.
- Deterministic event handling.
- Small components inside a larger agentic workflow.

**Risks**

- Brittle behavior in partially observable environments.
- No memory of prior failures.
- Easy to over-label as "AI" when it is just rule execution.

### Model-Based Reflex Agent

**What it is**

A model-based reflex agent maintains an internal representation of relevant environment state. It still often acts through rules, but those rules consult the current internal model instead of only the latest percept. [1]

**Example**

If inventory falls below a threshold, consult current demand and lead-time state before ordering more stock.

**When to use**

- Environments where the latest input is incomplete.
- Tasks that need current state but not long-horizon planning.
- Operational workflows with clear rules and moderate context.

**Risks**

- Stale environment state.
- Hidden assumptions in the internal model.
- Model updates that are not observable or versioned.

### Goal-Based Agent

**What it is**

A goal-based agent chooses actions by evaluating how they help reach a desired state. Search and planning are common mechanisms for finding action sequences that achieve goals. [1]

**Example**

Given a customer order, plan the sequence needed to reserve inventory, package the product, arrange shipping, and notify the customer.

**When to use**

- Multi-step workflows.
- Tasks with explicit completion states.
- Environments where different action sequences can reach the same goal.

**Risks**

- Plans become stale when the environment changes.
- Goal definitions may omit business, safety, legal, or user constraints.
- A plausible plan can still fail without execution monitoring.

### Utility-Based Agent

**What it is**

A utility-based agent evaluates not only whether a goal is reached, but how desirable each possible outcome is. It uses a utility function or equivalent scoring mechanism to compare alternatives. [1]

**Example**

For order fulfillment, choose the option that balances delivery speed, cost, reliability, inventory risk, and customer satisfaction.

**Correct framing**

- Utility does not need to mean a literal mathematical utility function in every implementation.
- Utility-based behavior can be implemented with scoring models, policies, optimization functions, business rules, or ranked preferences.
- A utility-based agent may require more compute or external infrastructure, but it does not inherently require cloud deployment.

**Risks**

- Poorly chosen utility functions create harmful incentives.
- Optimizing measurable proxies can degrade the real outcome.
- Tradeoffs need governance, not just model tuning.

## Environment and Feedback

### Environment

**What it is**

The environment is the external context the agent observes and affects. It may be physical, digital, or hybrid.

**Examples**

- Digital: customer records, inventory databases, email systems, tickets, APIs, calendars, repositories.
- Physical: rooms, robots, cameras, microphones, sensors, actuators, other people or machines.
- Hybrid: warehouse automation where software agents coordinate inventory systems and physical robots.

**Design implications**

- Define what state is observable, hidden, delayed, noisy, or unreliable.
- Define which actions can change the environment.
- Define how the agent receives feedback after acting.

### Agent-Environment Interaction Loop

**What it is**

The basic loop is:

1. Perceive environment state.
2. Interpret the percepts.
3. Reason about goals, constraints, and possible actions.
4. Act through an effector, tool, API, or actuator.
5. Observe the result.
6. Update state, memory, or policy as appropriate.

This loop is the practical difference between a one-shot model call and an agentic system. ReAct-style language-agent research uses a related reason-act-observe loop for tool and environment interaction. [3]

**Correct framing**

- Feedback is not automatically learning.
- Feedback may update only task state, environment state, logs, or escalation status.
- Long-term learning requires a deliberate memory, policy-update, fine-tuning, retraining, or reinforcement-learning mechanism.

**Risks**

- Acting on stale state.
- Missing feedback after an action.
- Updating memory with untrusted or low-quality observations.

## Core Agent Modules

### Perception Module

**What it is**

The perception module receives raw information from the environment and turns it into useful observations for reasoning.

**Inputs**

- Physical sensors: cameras, microphones, lidar, temperature sensors, pressure sensors.
- Digital inputs: APIs, files, messages, event streams, databases, webpages, logs.

**Responsibilities**

- Collect raw percepts.
- Filter noise and malformed data.
- Transform data into usable representations.
- Extract features, entities, objects, state changes, and relationships.
- Distinguish raw percepts from interpreted perceptions.

**Correct framing**

- A sensor can be physical or digital, but the distinction matters for reliability, latency, and failure modes.
- Perception may use vision models, speech models, parsers, classifiers, retrieval systems, rules, or direct structured inputs.
- Perception outputs should include confidence, source, timestamp, and uncertainty when possible.

**Risks**

- Treating perception as ground truth.
- Ignoring missing, biased, stale, or adversarial input.
- Passing untrusted retrieved content directly into high-authority prompts.

### Reasoning Module

**What it is**

The reasoning module decides what to do with the agent's perceptions, goals, constraints, state, and available actions.

**Responsibilities**

- Interpret current state.
- Select or update goals.
- Plan action sequences.
- Choose tools or effectors.
- Handle obstacles and exceptions.
- Decide when to ask for more data or human approval.

**Correct framing**

- Reasoning can be rules, search, planning, optimization, symbolic inference, an LLM call, a learned policy, or a hybrid.
- Agent knowledge is broader than AI model weights. It may include rules, memory, plans, policies, knowledge graphs, vector stores, databases, tool schemas, event logs, and external systems.
- Reasoning traces are not automatically faithful explanations. Use structured logs and verifier results for auditability.

**Risks**

- Hallucinated plans or tool choices.
- Hidden conflicts between goals, policies, and user requests.
- No explicit policy for replanning after failed actions.

### Action Module

**What it is**

The action module turns decisions into commands that affect the environment.

**Effectors**

- Software effectors: APIs, databases, queues, email systems, ticketing systems, browsers, shells, workflow engines.
- Hardware effectors: actuators, robotic arms, motors, locks, sensors with control channels.

**Responsibilities**

- Translate decisions into validated commands.
- Execute actions through approved tools or effectors.
- Coordinate multiple effectors for coarse-grained actions.
- Monitor success, failure, side effects, and rollback needs.

**Correct framing**

- A fine-grained action may be one API call.
- A coarse-grained action may orchestrate many commands across systems or actuators.
- The controller should enforce permissions before the action module executes irreversible, expensive, unsafe, or externally visible actions.

**Risks**

- Tool argument errors.
- Irreversible side effects.
- Partial failure across multiple effectors.
- No idempotency or rollback strategy.

### Learning Module

**What it is**

The learning module improves future behavior using feedback, outcomes, corrections, or experience.

**Correct framing**

- Learning can update memory, rules, thresholds, prompts, policies, models, or training data.
- Updating memory is not the same as updating model weights.
- A non-learning agent can still use feedback for immediate recovery or state updates.
- Embodied agents that learn skills need separate attention to perception, control, safety, and policy-update mechanisms. [4]

**Responsibilities**

- Analyze outcomes and feedback.
- Detect recurring failures.
- Improve perception quality.
- Improve planning and action selection.
- Propose rule, memory, model, or policy updates.
- Preserve provenance for learned changes.

**Risks**

- Learning from bad feedback.
- Memory poisoning.
- Silent drift in behavior.
- No audit trail for policy or model changes.

## Module Utilization by Agent Type

### Simple Reflex Agent

**Typical module use**

- Perception: forwards current percepts with minimal interpretation.
- Reasoning: applies condition-action rules.
- Action: executes the matching action.
- Learning: usually absent.

**Architecture implication**

Keep it small, testable, and deterministic. Use it where isolation of a narrow reaction is more valuable than adaptive behavior.

### Model-Based Reflex Agent

**Typical module use**

- Perception: forms observations and updates an internal environment model.
- Reasoning: applies rules against current modeled state.
- Action: executes a usually narrow action.
- Learning: optional; may improve the environment model.

**Architecture implication**

The internal state model becomes a dependency that needs freshness checks, versioning, and observability.

### Goal-Based Agent

**Typical module use**

- Perception: compares current state with desired state.
- Reasoning: plans action sequences.
- Action: executes and monitors planned steps.
- Learning: improves planning and recovery over time.

**Architecture implication**

Plans need checkpoints, success criteria, failure handling, and replanning rules.

### Utility-Based Agent

**Typical module use**

- Perception: estimates current state and possible future states.
- Reasoning: evaluates alternatives against utility or preference criteria.
- Action: executes selected action sequences.
- Learning: improves outcome quality, not just goal completion.

**Architecture implication**

Utility criteria need governance. Make tradeoffs visible, testable, and reviewable.

## Monitoring

### Operational Monitors

**What they track**

- Performance: progress toward goals, completion rate, quality, latency.
- Environment state: relevant external changes, sensor readings, event streams.
- Resource utilization: CPU, memory, network, tool usage, API cost, rate limits.

**Risks**

- Metrics that reward speed over correctness.
- Missing system-wide resource pressure.
- No correlation between agent decisions and operational impact.

### Safety, Ethics, and Policy Monitors

**What they track**

- Goal alignment.
- Safety constraints.
- Bias and fairness indicators.
- Policy and permission compliance.
- Privacy and data-handling constraints.

NIST AI RMF frames trustworthy AI around characteristics such as validity, reliability, safety, security, resilience, accountability, transparency, explainability, privacy, and fairness. [6]

**Risks**

- Treating monitoring as a substitute for prevention.
- Measuring fairness or safety only after deployment.
- Allowing agents to bypass policy checks during tool execution.

### Interaction and Communication Monitors

**What they track**

- Agent-environment interactions.
- Agent-human communication.
- Agent-agent communication.
- Tool calls, observations, retries, and failures.

**Risks**

- Lost context across agent handoffs.
- Undetected tool loops.
- No record of who or what authorized an action.

### State and Belief Monitors

**What they track**

- Internal state.
- Beliefs about the environment.
- Plans and intentions.
- Decision rationale summaries.
- Belief accuracy against later observations.

**Risks**

- State drift between agents.
- Conflicting memories.
- Beliefs treated as facts without confidence or provenance.

### Robustness, Explainability, and Learning Monitors

**What they track**

- Data quality.
- Adversarial or unexpected inputs.
- Robustness under environment changes.
- Explainability artifacts and decision summaries.
- Learning progress and adaptation.

**Correct framing**

- Explanations are useful, but they are not proof of correctness.
- Robustness monitoring should include adversarial, rare, and degraded-input cases.
- Learning monitors should distinguish memory updates from model or policy updates.

**Risks**

- Misleading explanations.
- Learning drift.
- Poor-quality feedback silently becoming future context.

## System Architectures

### Single-Agent System

**What it is**

A single-agent system deploys one agent as the main decision-making and action-taking unit.

**When to use**

- Narrow workflows.
- Tasks with one clear owner.
- Environments where coordination overhead would add more risk than value.

**Risks**

- The agent becomes a single point of decision failure.
- Too many responsibilities accumulate in one prompt, policy, or controller.
- Scaling may require later decomposition.

### Multi-Agent System

**What it is**

A multi-agent system uses two or more agents that coordinate, collaborate, compete, or divide work. Multi-agent systems need protocols for communication, delegation, shared state, conflict resolution, and monitoring.

**When to use**

- Workflows with specialized roles.
- Parallelizable tasks.
- Systems that need local autonomy across domains or devices.
- Simulations or environments with many independent actors. [5]

**Risks**

- Communication overhead.
- Inconsistent state.
- Conflicting goals.
- Harder debugging and auditability.

### Centralized Architecture

**What it is**

A central controller holds most deliberative logic and assigns tasks or actions to simpler agents or services.

**When to use**

- Straightforward workflows.
- Strong central governance requirements.
- Environments where simpler agents should not make high-level decisions.

**Benefits**

- Easier policy enforcement.
- Simpler global observability.
- Clearer authority boundary.

**Risks**

- Central bottleneck.
- Single point of failure.
- High coordination traffic between controller and agents.

### Decentralized Architecture

**What it is**

Deliberative logic is distributed across agents. Individual agents can plan and act locally while the system monitors progress, health, and conflicts.

**When to use**

- Distributed environments.
- Local decision-making requirements.
- High scalability or resilience needs.
- Systems where agents need autonomy under intermittent connectivity.

**Benefits**

- Better fault isolation.
- More local responsiveness.
- More scalable processing.

**Risks**

- Harder coordination.
- More complex governance.
- Conflicting decisions without strong protocols.
- More demanding infrastructure for state, messaging, and observability.

### Hybrid Architecture

**What it is**

A hybrid architecture combines central coordination with local agent autonomy.

**When to use**

- Most real-world agentic systems.
- High-level goals require central control, but local actions require fast adaptation.
- Some agents are trusted to act independently while others need approval.

**Design implications**

- Define which decisions are centralized.
- Define which decisions are delegated.
- Define escalation, arbitration, and override rules.
- Keep shared state authoritative, versioned, and observable.

## Practical Design Checklist

- Define each agent's goal, environment, tools, authority, and stop conditions.
- Choose the simplest agent type that fits the task.
- Separate perception, reasoning, action, learning, memory, and monitoring concerns.
- Treat tools and effectors as permissioned interfaces with schemas and side effects.
- Add feedback paths for every important action.
- Distinguish state update, memory update, policy update, and model update.
- Add human approval for irreversible, unsafe, expensive, or low-confidence actions.
- Monitor performance, safety, resources, data quality, state drift, and tool failures.
- Make plans, actions, observations, and approvals auditable.
- Test with stale state, bad input, partial failures, tool errors, and adversarial content.

## Sources

1. Stuart Russell and Peter Norvig, "Artificial Intelligence: A Modern Approach": https://aima.cs.berkeley.edu/
2. Michael Wooldridge and Nicholas R. Jennings, "Intelligent Agents: Theory and Practice" (1995): https://www.cs.ox.ac.uk/people/michael.wooldridge/pubs/ker95.pdf
3. Shunyu Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models" (2022): https://arxiv.org/abs/2210.03629
4. Guanzhi Wang et al., "Voyager: An Open-Ended Embodied Agent with Large Language Models" (2023): https://arxiv.org/abs/2305.16291
5. Joon Sung Park et al., "Generative Agents: Interactive Simulacra of Human Behavior" (2023): https://arxiv.org/abs/2304.03442
6. NIST, "Artificial Intelligence Risk Management Framework (AI RMF 1.0)" (2023): https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf
