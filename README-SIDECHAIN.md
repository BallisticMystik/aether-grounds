# RBAC Framework Sidechain - Execution Guide

## Overview
This sidechain contains a complete task list and JSON prompt chain for building the Coffee Platform RBAC framework from scratch using TDD principles.

## Files

### 1. `RBAC-FRAMEWORK-TASKS.md`
High-level task list organized by phases:
- Phase 1: Core Infrastructure & Testing Setup
- Phase 2: Data Layer & Validation
- Phase 3: Backend Integration
- Phase 4: Frontend Integration
- Phase 5: Code Generation & Tooling
- Phase 6: Documentation & Examples

### 2. `RBAC-FRAMEWORK-PROMPTS.json`
Detailed JSON prompt chain with:
- 20 tasks with complete prompts
- Dependencies between tasks
- Expected outputs for each task
- Validation criteria
- Execution order

### 3. `scripts/execute-sidechain.ts`
Execution helper script that:
- Loads the prompt chain
- Validates dependencies
- Generates execution plan
- Creates detailed execution script

## Quick Start

### Step 1: Review the Plan
```bash
# View task list
cat RBAC-FRAMEWORK-TASKS.md

# View prompt chain
cat RBAC-FRAMEWORK-PROMPTS.json

# Generate execution plan
bun run scripts/execute-sidechain.ts
```

### Step 2: Execute Tasks
Each task in the prompt chain contains:
- **ID**: Unique task identifier
- **Title**: Task name
- **Phase**: Development phase
- **Dependencies**: Tasks that must complete first
- **Prompt**: Detailed instructions for Claude/sub-agent
- **Expected Outputs**: Files/functions that should be created
- **Validation**: How to verify the task is complete

### Step 3: Execution Flow
1. Start with `task-1` (no dependencies)
2. Execute the prompt with Claude/sub-agent
3. Verify expected outputs exist
4. Run validation checks
5. Mark task as complete
6. Move to next task in execution order
7. Repeat until all tasks complete

## Task Execution Example

### Example: Task 3 - Create XML Parser

**Prompt to Claude:**
```
Using TDD: First write tests in tests/unit/parsers/xml-parser.test.ts that test parsing coffee-platform-roles.xml. Tests should verify: XML structure validation, role extraction, feature extraction, access level parsing, category mapping, error handling for invalid XML. Then implement src/parsers/xml-parser.ts using xml2js to parse the XML file. The parser should return a structured RBACConfig object matching the TypeScript types in types/rbac.types.ts.
```

**Expected Outputs:**
- `tests/unit/parsers/xml-parser.test.ts`
- `src/parsers/xml-parser.ts`
- `src/parsers/types.ts`

**Validation:**
- All parser tests pass
- Parser correctly extracts all roles, features, and access levels from XML

## Dependencies

Tasks are ordered to respect dependencies:
- `task-1` → `task-2` → `task-3` → etc.
- Each task lists its dependencies
- Cannot execute a task until dependencies are complete

## TDD Approach

All tasks follow Test-Driven Development:
1. **Write tests first** - Define expected behavior
2. **Run tests** - Should fail (red)
3. **Write implementation** - Make tests pass (green)
4. **Refactor** - Improve code while keeping tests green
5. **Validate** - Ensure all criteria met

## Success Criteria

After completing all tasks:
- ✅ All tests passing with >90% coverage
- ✅ TypeScript strict mode compliance
- ✅ Zero linter errors
- ✅ Complete documentation
- ✅ Working examples for all use cases
- ✅ Production-ready code quality

## Integration with Claude/Sub-agents

### Method 1: Sequential Execution
Pass each task prompt to Claude one at a time, waiting for validation before proceeding.

### Method 2: Batch Execution
Group independent tasks and execute in parallel (respecting dependencies).

### Method 3: Automated Execution
Use the execution script to generate a complete execution plan and process tasks automatically.

## Notes

- **XML Source**: All data comes from `coffee-platform-roles.xml`
- **Testing**: Use Vitest for Bun compatibility
- **Coverage**: Maintain >90% test coverage throughout
- **TypeScript**: Strict mode enabled, all types properly defined
- **Validation**: Each task must pass validation before moving to next

## Troubleshooting

### Task Fails Validation
1. Review expected outputs - are all files created?
2. Run tests - do they pass?
3. Check linter - any errors?
4. Verify types - TypeScript strict mode compliance?
5. Fix issues and re-validate

### Dependency Issues
1. Check if dependency tasks are marked complete
2. Verify dependency outputs exist
3. Re-run dependency tasks if needed

### Test Failures
1. Review test output
2. Check implementation matches requirements
3. Verify test setup is correct
4. Fix implementation to make tests pass

## Next Steps

After completing the sidechain:
1. Review generated code
2. Run full test suite
3. Check coverage report
4. Review documentation
5. Test examples
6. Deploy to staging
7. Production deployment
