# Agentic AI: Planning and Reasoning Design Patterns

> Overview-level coverage of advanced planning and reasoning design techniques for agentic AI systems. Use as a map to identify patterns worth deeper research — implementation details and backend components are intentionally omitted.

---

## Chapter 1: Planning and Execution Design Patterns

These patterns govern how agents formulate strategies, manage execution in dynamic environments, and adapt based on task complexity. They address trade-offs like sequential vs. parallel operations, reliance on external feedback, and internal self-correction.

---

### Plan-and-Execute

**What it is**
Separates the agent's reasoning logic from its controller logic into two phases: planning and execution.

**How it works**
- *Planning phase:* The LLM receives the full task and generates a step-by-step plan before actions are taken. A dedicated planner agent can handle this phase.
- *Execution phase:* A controller or executor follows the plan step by step. Execution may be deterministic, tool-driven, or model-assisted depending on the implementation. [1]
- The reasoning module (with LLM) can live in a planner agent; the controller and action module in a separate controller agent — or all in a single agent for smaller solutions.

**Trade-offs**
- Often more efficient than ReAct when execution does not require a model call after every tool observation. ReAct interleaves reasoning, action, and observation, which improves adaptiveness but can increase latency and cost. [2]
- Less adaptive: if an unexpected error occurs mid-execution, the entire plan may become invalid and require a full re-plan.
- ReAct reasons over each observation before choosing the next action, making it better suited to environments where each result changes the next step. [2]

**When to use**
Tasks that don't require constant mid-course adaptation; complex multi-step workflows where upfront planning reduces cost.

---

### Concurrent Execution Optimizer

**What it is**
Restructures a linear plan into an optimized parallel execution plan, commonly represented as a dependency graph or task DAG.

**How it works**
- Introduces a *task compiler* module between the reasoning and controller modules.
- The task compiler converts a natural-language or structured plan into tasks with explicit dependencies. LLMCompiler-style systems use a planner, task-fetching unit, and executor to dispatch independent function calls in parallel. [3]
- Independent tasks are scheduled to run concurrently; dependent tasks remain sequential.
- The task compiler typically resides in the planner agent alongside the reasoning module.

**Trade-offs**
- Significant time savings for plans with independent parallel steps; published LLMCompiler benchmarks report latency and cost reductions versus sequential ReAct-style function calling. [3]
- Compilation and management of a parallel execution environment introduces overhead — must be justified.
- Not suitable for plans with a strongly sequential flow, or very simple plans where dependency analysis takes longer than execution.

**When to use**
Complex plans where some steps are independent and parallelizable; scenarios where execution latency is a key concern.

---

### Reasoning Without Observation (ReWOO)

**What it is**
Decouples complex planning from tool-based data retrieval by generating a reasoning plan before external observations are available. This pattern is commonly associated with ReWOO: Reasoning WithOut Observation. [4]

**How it works**
- The LLM creates a plan listing external data required and how observations will be substituted into later reasoning steps.
- The planner provides the overall plan to the controller first; retrieval calls with no dependencies can run in parallel, while calls that reference earlier results remain sequential.
- A *synthesis template* specifies how concurrently fetched data is combined into the final output.
- Unlike the Concurrent Execution Optimizer, no general task compiler or DAG is required; the plan and retrieval placeholders are passed directly from the reasoning module to the controller. [4]

**How it differs from Concurrent Execution Optimizer**
- The optimizer looks for all independent actions across the entire plan.
- This pattern is scoped to pre-planned retrieval/tool steps, including independent calls and calls that reference earlier outputs.
- Uses variable substitution or a synthesis step instead of a general-purpose task DAG.

**Trade-offs**
- Can reduce latency and token use for information-heavy tasks requiring multiple tool calls.
- ReWOO reports improved token efficiency versus interleaved reasoning-observation baselines, but results depend on task structure and tool reliability. [4]

**When to use**
Tasks requiring multiple independent external data retrievals (searches, database queries) before constructing a result.

---

### Planner-Critic-Refiner

**What it is**
A feedback loop between a planner agent and a critic/refiner pass that attempts to improve plan quality before execution or at checkpoints.

**How it works**
- *Planner role:* LLM generates an initial plan.
- *Critic agent:* Assesses the plan against distinct evaluation criteria — logical flow, resource availability, safety, constraint adherence — using a separate prompt, model, tool, or human review path.
- *Refiner role:* The planner's LLM is re-prompted with the critic's feedback to produce a refined plan.
- The cycle iterates until the plan meets a quality threshold. No actions are executed during iteration.
- Example failure modes the critic might catch: missing budget for catering, venue booked before confirming attendee count, no pre-check for venue availability.

**Trade-offs**
- Can improve draft quality when the critic has useful criteria or external feedback, but self-correction without external evidence is not a correctness guarantee. [5] [6]
- Slow: multiple LLM calls per task.
- Higher token cost in cloud environments.
- High architectural complexity: three distinct LLM roles requiring careful prompt engineering and intricate controller logic.

**When to use**
High-stakes tasks where correctness matters more than speed or cost; scenarios where a flawed plan would be expensive or dangerous to execute.

---

## Chapter 2: Search and Self-Correction Design Patterns

These patterns enable agents to navigate tasks where linear execution is insufficient, or where initial outputs are likely suboptimal. They introduce explicit mechanisms for exploring multiple solution paths and correcting errors.

---

### Language Agent Tree Search (LATS)

**What it is**
Integrates LLM reasoning with Monte Carlo Tree Search (MCTS) to explore multiple possible action paths before committing to an action. [7]

**How it works**
- Instead of generating one thought and one action, an internal MCTS loop prompts the LLM to propose multiple diverse next steps (tree branches).
- Each MCTS iteration has four phases:
  1. **Selection** — follow the most promising path in the internal tree until finding an untested action.
  2. **Expansion** — add a new hypothetical action to the tree.
  3. **Evaluation/simulation** — estimate value through environment feedback, a value function, reflection, or rollout depending on implementation.
  4. **Back propagation** — send the final score back up the path, updating each prior action's record.
- The loop may run multiple search iterations per real-world action; the practical count is a configuration and budget choice.
- The action with the highest average success rate becomes the *atomic action* passed to the controller for execution.
- The MCTS loop occurs within the reasoning module's interactions with the LLM.

**Trade-offs**
- Can improve deliberate decision-making on hard tasks by exploring alternatives before acting. [7]
- Higher time and resource cost than single-path prompting — must be justified by task complexity and stakes.

**When to use**
Tasks where early mistakes are hard to recover from and where exploring multiple options before acting is worth the cost.

---

### Self-Discover

**What it is**
Prompts the LLM to compose a task-specific reasoning structure before solving the task. [8]

**How it works**
- A *meta-controller agent* or prompt pipeline coordinates two stages:
  1. **Discovery stage** — the LLM selects and composes reasoning modules into a task-specific structure rather than directly solving the task. [8]
  2. **Execution stage** — those reasoning steps are injected into the system prompt, and the LLM performs actual problem-solving guided by its own generated strategy.
- In an agent implementation, the standard reasoning module can be split into separate discovery and execution modules.
- Observations from the controller typically affect execution, while discovery is usually run up front unless the system explicitly re-discovers a strategy.

**How it differs from LATS**
- Self-Discover is a *strategy generator*: front-loads a thinking strategy, then executes linearly following those rules.
- LATS is a *sequence explorer*: evaluates multiple potential paths at each step, mid-task.

**Trade-offs**
- Strong fit for novel, specialized problems without a predefined solution structure; the paper reports gains on complex reasoning benchmarks, but production results depend on task fit and model quality. [8]
- Dynamic nature makes behavior less predictable and harder to debug — both execution code and the agent-invented reasoning logic must be debugged when failures occur.

**When to use**
Novel, specialized problems — e.g., zero-day security vulnerability triage, cross-departmental process optimization, non-standard conflict resolution, regulatory change impact analysis.

---

### Second-Pass Verification (Verifier Agent)

**What it is**
A dedicated verifier independently audits planner outputs against defined criteria before actions are executed.

**How it works**
- The verifier may use a separate prompt, model, rule system, formal checker, external tool, or human review. Stronger independence reduces shared failure modes.
- It receives planner output (plan or action) and returns a verdict: **pass** or **fail** with explanation. The planner treats this verdict as its next observation.
- The verifier can use external tools (e.g., a contract compliance checker, booking confirmation cross-reference).
- Supports *graded verification* with verdict levels (e.g., fatal error vs. minor inconsistency) — minor issues may trigger a human-in-the-loop notification rather than blocking execution entirely.
- The verifier module is typically invoked by the controller module after it receives LLM output from the reasoning module.

**Trade-offs**
- Can improve reliability and trustworthiness when the verifier has independent evidence or stronger evaluation criteria. [9]
- Increased resource usage due to a second LLM.
- Greater architectural complexity.
- Risk of false negatives: the verifier's own LLM or external tools may have flaws of their own.

**When to use**
High-stakes scenarios where agent outputs must be reliably correct and independently validated before actions are taken.

---

## Chapter 3: Memory, Skill, and Adaptive Action Design Patterns

These patterns enable agents to maintain continuity across tasks, leverage learned competencies, and dynamically interact with external environments — moving beyond single-turn reasoning toward persistent, context-aware behavior.

---

### Episodic and Procedural Memory

**What it is**
A structured mechanism for agents to store and retrieve long-term memory such as episodic records (events/interactions) and procedural knowledge (actions/outcomes). [10] [11]

**How it works**
- Uses a local scratch pad for task state and a longer-term memory store for durable records. Implementations may use vector databases, relational stores, event logs, document stores, or hybrid retrieval.
- **Episodic memory** — records specific past interactions: preferences, history, user profiles.
  - Example: *"User always requests the central tech hub venue and prefers vegetarian catering."*
- **Procedural memory** — records action sequences and tool outcomes: what worked, performance metrics.
  - Example: *"The venue search tool for groups of 15 always returns successful results within the downtown region."*
- When a task step completes, the planner's communication module captures the output and relays it to the controller, which triggers the memory module.
- The memory module packages episodic data (request, response, feedback) into structured records and procedural data (tools used, parameters, latency, success rate) into reusable skill templates stored as vectors.

**Primary benefits**
Enables in-context learning (see below); also supports auditing, debugging, traceability, monitoring, analytics, and model refinement.

**When to use**
Long-running agent solutions where continuity across sessions, user preference tracking, or operational improvement over time is valuable.

---

### In-Context Learning

**What it is**
Uses retrieved examples, memories, instructions, or task context to enrich the LLM's prompt without changing model weights. [12]

**How it works**
- When a new task arrives, the memory module queries the shared agent memory system using the current task context.
- The most relevant memories are retrieved and injected into the LLM's prompt:
  - **Episodic retrieval** — past user/agent interactions for contextual or preference-based constraints.
    - Example: *"User A always prefers the Innovation Suite and requests vegetarian catering."*
  - **Procedural retrieval** — past successful action sequences and tool performance data.
    - Example: *"The venue search tool takes 10 minutes and requires 3 retries; the internal booking tool succeeds on the first try."*
- Not mutually exclusive with model retraining — the same memory data can serve both purposes.

**Trade-offs**
- Can improve behavior immediately without retraining when retrieval is relevant and trustworthy.
- Context window growth over time increases latency, token costs, and risks hitting processing limits.

**When to use**
Agents handling repeated or similar tasks that benefit from improving over time based on accumulated experience.

---

### Adaptive Tool Orchestration

**What it is**
Elevates the LLM from selecting the next single tool to generating a toolchain workflow that a controller or orchestrator executes. [3] [13]

**How it works**
- The planner agent handles high-level planning and decision-making.
- The LLM generates an *orchestration command* — a workflow specifying a coordinated sequence of tool calls.
  - Example: check calendar → search venue → collect catering options.
- The controller recognizes the orchestration command and hands it to the orchestrator module.
- The orchestrator maps the command to a predefined or dynamically constructed tool API sequence, manages tool interactions and workflow state, and reports consolidated results back to the controller.

**Trade-offs**
- Reduces LLM workload, improving efficiency and reliability.
- Can improve performance when the workflow is predictable and parallelizable.
- Less adaptive: the LLM has no opportunity to reconsider actions mid-workflow if unforeseen circumstances arise — makes this pattern unsuitable for unpredictable environments.

**When to use**
Complex, extensive multi-action tasks with predictable tool sequences; scenarios where LLM micromanagement of every tool call causes performance degradation.

---

## Sources

1. LangChain, "Plan-and-execute agents": https://blog.langchain.com/planning-agents/
2. Shunyu Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models" (2022): https://arxiv.org/abs/2210.03629
3. Sehoon Kim et al., "An LLM Compiler for Parallel Function Calling" (2023): https://arxiv.org/abs/2312.04511
4. Binfeng Xu et al., "ReWOO: Decoupling Reasoning from Observations for Efficient Augmented Language Models" (2023): https://arxiv.org/abs/2305.18323
5. Aman Madaan et al., "Self-Refine: Iterative Refinement with Self-Feedback" (2023): https://arxiv.org/abs/2303.17651
6. Jie Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet" (2023): https://arxiv.org/abs/2310.01798
7. Andy Zhou et al., "Language Agent Tree Search Unifies Reasoning, Acting, and Planning in Language Models" (2023): https://arxiv.org/abs/2310.04406
8. Pei Zhou et al., "Self-Discover: Large Language Models Self-Compose Reasoning Structures" (2024): https://arxiv.org/abs/2402.03620
9. Hunter Lightman et al., "Let's Verify Step by Step" (2023): https://arxiv.org/abs/2305.20050
10. Joon Sung Park et al., "Generative Agents: Interactive Simulacra of Human Behavior" (2023): https://arxiv.org/abs/2304.03442
11. Guanzhi Wang et al., "Voyager: An Open-Ended Embodied Agent with Large Language Models" (2023): https://arxiv.org/abs/2305.16291
12. Qingxiu Dong et al., "A Survey on In-context Learning" (2022): https://arxiv.org/abs/2301.00234
13. LangGraph documentation, "Workflows and agents": https://docs.langchain.com/oss/python/langgraph/workflows-agents
