# Cursor Sidechain Command

## Usage
When you want to execute the RBAC framework build, use:
```
cursor_sidechain build-rbac-framework
```

## What It Does
This command will:
1. Load the task list from `RBAC-FRAMEWORK-TASKS.md`
2. Load the JSON prompt chain from `RBAC-FRAMEWORK-PROMPTS.json`
3. Execute all tasks in sequence following TDD principles
4. Validate each task before proceeding to the next
5. Generate complete RBAC framework with tests, documentation, and examples

## Execution Flow
1. **Phase 1**: Core Infrastructure & Testing Setup (Tasks 1-5)
2. **Phase 2**: Data Layer & Validation (Tasks 6-9)
3. **Phase 3**: Backend Integration (Tasks 10-13)
4. **Phase 4**: Frontend Integration (Tasks 14-17)
5. **Phase 5**: Code Generation & Tooling (Tasks 18-20)
6. **Phase 6**: Documentation & Examples (Tasks 21-25)

## Task Execution Rules
- ✅ Each task must pass validation before proceeding
- ✅ Tests must be written first (TDD)
- ✅ All tests must pass
- ✅ Code must pass linter checks
- ✅ TypeScript strict mode compliance
- ✅ >90% test coverage maintained

## Output
Upon completion, you'll have:
- Complete RBAC framework
- Full test suite (>90% coverage)
- API middleware for Express/Bun
- React hooks and components
- CLI tools
- Database migration scripts
- Complete documentation
- Working examples
- Production-ready code

## Quick Start
```bash
# Review the tasks
cat RBAC-FRAMEWORK-TASKS.md

# Review the prompts
cat RBAC-FRAMEWORK-PROMPTS.json

# Execute (after approval)
# The system will process each task in sequence
```
