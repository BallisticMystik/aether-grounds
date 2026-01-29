# Sub-Agent Execution Guide

## Quick Start

Each sub-agent has a dedicated task file in `sub-agents/` directory. To execute:

1. **Read the agent's task file**: `sub-agents/[agent-name]-agent-tasks.md`
2. **Check dependencies**: Ensure all dependencies are complete
3. **Execute the prompt**: Follow the instructions in the task file
4. **Validate**: Run validation steps
5. **Update status**: Mark task complete in `sub-agents/STATUS.md`

## Agent Assignment

### Ready to Start (No Dependencies)
- ✅ **Infrastructure Agent** - Can start immediately

### Waiting for Infrastructure
- ⏸️ **Testing Agent** - Waits for Infrastructure Agent

### Waiting for Testing
- ⏸️ **Parser Agent** - Waits for Testing Agent

### Waiting for Parser
- ⏸️ **Core Logic Agent** - Waits for Parser Agent
- ⏸️ **Tooling Agent** - Waits for Parser Agent

### Waiting for Core Logic
- ⏸️ **Backend Agent** - Waits for Core Logic Agent
- ⏸️ **Frontend Agent** - Waits for Core Logic Agent

### Waiting for All Implementation
- ⏸️ **Documentation Agent** - Waits for all other agents

## Execution Order

### Phase 1: Foundation (Parallel Possible)
1. **Infrastructure Agent** → Start immediately
2. **Testing Agent** → Start after Infrastructure completes

### Phase 2: Data Layer (Sequential)
3. **Parser Agent** → Start after Testing completes
4. **Core Logic Agent** → Start after Parser completes

### Phase 3: Integration (Parallel After Core)
5. **Backend Agent** → Start after Core Logic completes
6. **Frontend Agent** → Start after Core Logic completes (parallel with Backend)
7. **Tooling Agent** → Start after Parser completes (can run in parallel)

### Phase 4: Documentation (Final)
8. **Documentation Agent** → Start after all implementation completes

## Task File Structure

Each task file contains:
- **Agent Profile**: Expertise and goals
- **Assigned Tasks**: List of tasks with:
  - Priority level
  - Dependencies
  - Estimated time
  - Detailed instructions
  - Expected outputs
  - Validation steps
  - Success criteria

## Execution Protocol

### For Each Task:

1. **Read Task Instructions**
   - Review the full task description
   - Understand expected outputs
   - Note validation requirements

2. **Check Dependencies**
   - Verify all dependencies are complete
   - Check `sub-agents/STATUS.md`
   - Wait if dependencies not met

3. **Execute Task**
   - Follow TDD approach (tests first)
   - Implement according to instructions
   - Create all expected outputs

4. **Validate**
   - Run validation commands
   - Verify all expected outputs exist
   - Check success criteria

5. **Report Completion**
   - Update `sub-agents/STATUS.md`
   - Mark task as complete
   - Note any issues or blockers

## Communication

### Status Updates
Update `sub-agents/STATUS.md` when:
- Starting a task
- Completing a task
- Encountering blockers
- Finding issues

### Blockers
If blocked:
1. Document the blocker in STATUS.md
2. Identify what's needed
3. Notify dependent agents if needed

## Quality Standards

All tasks must meet:
- ✅ Tests written first (TDD)
- ✅ All tests passing
- ✅ >90% code coverage (where applicable)
- ✅ TypeScript strict mode compliance
- ✅ Zero linter errors
- ✅ All expected outputs created
- ✅ Validation passes

## Tips

1. **Read the full task** before starting
2. **Check dependencies** first
3. **Follow TDD** - tests before implementation
4. **Validate early and often**
5. **Update status** immediately
6. **Ask for help** if stuck

## Example Execution

### Infrastructure Agent - Task 1

1. Read `sub-agents/infrastructure-agent-tasks.md`
2. See Task 1 has no dependencies ✅
3. Execute: Create project structure
4. Validate: Run `bun install` and `bunx tsc --noEmit`
5. Update STATUS.md: Mark Task 1 complete
6. Notify: Testing Agent can now start

## Next Steps

1. Start with **Infrastructure Agent**
2. Follow execution order
3. Update status as you go
4. Complete all tasks
5. Final validation and integration

---

**Ready to begin?** Start with Infrastructure Agent!
