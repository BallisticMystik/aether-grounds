# RBAC Framework Sub-Agents

## Overview
Specialized sub-agents for parallel development of the RBAC framework. Each agent has a specific expertise area and assigned tasks.

## Sub-Agent Roster

### 1. **Infrastructure Agent** 🏗️
**Expertise**: Project setup, configuration, build systems
**Tasks**: Project structure, package management, TypeScript config
**Status**: Ready
**Task File**: `sub-agents/infrastructure-agent-tasks.md`

### 2. **Testing Agent** 🧪
**Expertise**: Test frameworks, TDD, test utilities
**Tasks**: Test setup, test helpers, fixtures, test utilities
**Status**: Ready
**Task File**: `sub-agents/testing-agent-tasks.md`

### 3. **Parser Agent** 📄
**Expertise**: XML parsing, data transformation, file I/O
**Tasks**: XML parser, data loading, configuration parsing
**Status**: Ready
**Task File**: `sub-agents/parser-agent-tasks.md`

### 4. **Core Logic Agent** 🧠
**Expertise**: Business logic, algorithms, data structures
**Tasks**: RBAC core class, permission logic, validation
**Status**: Ready
**Task File**: `sub-agents/core-logic-agent-tasks.md`

### 5. **Backend Agent** ⚙️
**Expertise**: Server-side development, Express, middleware, APIs
**Tasks**: Express middleware, services, decorators, API integration
**Status**: Ready
**Task File**: `sub-agents/backend-agent-tasks.md`

### 6. **Frontend Agent** 🎨
**Expertise**: React, hooks, components, frontend architecture
**Tasks**: React hooks, components, frontend utilities
**Status**: Ready
**Task File**: `sub-agents/frontend-agent-tasks.md`

### 7. **Tooling Agent** 🔧
**Expertise**: CLI tools, code generation, build scripts
**Tasks**: CLI tools, generators, migration scripts, database schemas
**Status**: Ready
**Task File**: `sub-agents/tooling-agent-tasks.md`

### 8. **Documentation Agent** 📚
**Expertise**: Documentation, examples, guides, API docs
**Tasks**: API documentation, examples, migration guides
**Status**: Ready
**Task File**: `sub-agents/documentation-agent-tasks.md`

## Execution Strategy

### Phase 1: Parallel Foundation (Agents 1-2)
- Infrastructure Agent: Setup project structure
- Testing Agent: Setup test framework
- **Can run in parallel** ✅

### Phase 2: Data Layer (Agents 3-4)
- Parser Agent: XML parsing
- Core Logic Agent: RBAC core (depends on parser)
- **Sequential** ⏸️

### Phase 3: Integration (Agents 5-6)
- Backend Agent: Express middleware (depends on core)
- Frontend Agent: React components (depends on core)
- **Can run in parallel after core** ✅

### Phase 4: Tooling & Docs (Agents 7-8)
- Tooling Agent: CLI and generators
- Documentation Agent: Docs and examples
- **Can run in parallel** ✅

## Communication Protocol

Each sub-agent should:
1. Read their assigned task file
2. Check dependencies before starting
3. Report completion status
4. Validate outputs before marking complete
5. Update shared status file

## Status Tracking

Check `sub-agents/STATUS.md` for current progress of all agents.
