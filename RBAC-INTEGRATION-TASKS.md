# RBAC Integration Tasks

## Overview
Complete the RBAC backend integration by connecting the XML Parser, Core Logic, Express Middleware, and Database layers. This sidechain completes the backend functionality that the frontend is already wired up for.

**Dependency**: Requires PHYSICAL-INTEGRATION-PROMPTS.json tasks to be complete (routing is done)

---

## Phase 1: Parser Agent - XML Loader Service
Complete XML parser testing, create loader service, and connect to frontend hooks.

- [ ] Task 1: Write comprehensive tests for XMLParser class
- [ ] Task 2: Create RBACLoaderService singleton
- [ ] Task 3: Create config validator utility
- [ ] Task 4: Serve XML config via Express endpoint
- [ ] Task 5: Update useRBAC hook to use RBACLoaderService

---

## Phase 2: Core Logic Agent - RBAC Class Enhancement
Enhance RBAC class with additional methods and integrate with frontend components.

- [ ] Task 6: Write comprehensive tests for RBAC class
- [ ] Task 7: Add bulk permission checking methods to RBAC class
- [ ] Task 8: Create RBAC helper utilities
- [ ] Task 9: Create useRBACHelpers hook
- [ ] Task 10: Integrate RBAC with ProtectedRoute component

---

## Phase 3: Backend Agent - Express RBAC Middleware
Implement Express middleware for server-side RBAC enforcement.

- [ ] Task 11: Create RBAC middleware factory
- [ ] Task 12: Create authentication middleware
- [ ] Task 13: Create RBAC service for backend
- [ ] Task 14: Add RBAC API endpoints
- [ ] Task 15: Integrate RBAC middleware with server
- [ ] Task 16: Create permission decorators for controllers

---

## Phase 4: Database Agent - User & Role Persistence
Connect database, implement user/role persistence, and session management.

- [ ] Task 17: Review and enhance database schema
- [ ] Task 18: Create User repository
- [ ] Task 19: Create Session repository
- [ ] Task 20: Refactor auth API to use repositories
- [ ] Task 21: Create database health check and auto-reconnect
- [ ] Task 22: Create database seeder for roles

---

## Phase 5: Integration & End-to-End Testing
Verify complete RBAC flow from frontend to database.

- [ ] Task 23: Write frontend-to-backend integration tests
- [ ] Task 24: Write permission enforcement E2E tests
- [ ] Task 25: Create RBAC audit logging
- [ ] Task 26: Performance test RBAC operations
- [ ] Task 27: Update INTEGRATION-STATUS.md with completion status

---

## Success Criteria
- [ ] XML parser fully tested with >90% coverage
- [ ] RBACLoaderService provides config to frontend and backend
- [ ] useRBAC hook loads real config (not fallback) in production
- [ ] Express middleware enforces permissions on all protected endpoints
- [ ] Database stores users with roles and tracks role changes
- [ ] Complete E2E flow works: register -> login -> access feature -> permission check
- [ ] All tests pass with >80% overall coverage
- [ ] No console errors or warnings in production mode

---

## Execution Rules
- TDD required: Write tests first, then implement
- Test coverage: >80% minimum
- TypeScript strict mode compliance
- No breaking changes to existing frontend functionality
- Each task must pass validation before proceeding

---

## Quick Reference: Current State

| Component | Status | Notes |
|-----------|--------|-------|
| XMLParser | Exists | Needs comprehensive tests |
| RBAC class | Exists | Works but needs tests |
| useRBAC hook | Exists | Uses fallback config |
| RBACLoaderService | Missing | Need to create |
| Auth middleware | Missing | Need to create |
| RBAC middleware | Missing | Need to create |
| User repository | Missing | Need to create |
| Database connection | Exists | Needs health check |

---

## Files to Create

```
src/
├── services/
│   ├── RBACLoaderService.ts      # Task 2
│   ├── RBACService.ts            # Task 13
│   └── AuditService.ts           # Task 25
├── middleware/
│   ├── rbacMiddleware.ts         # Task 11
│   └── authMiddleware.ts         # Task 12
├── repositories/
│   ├── UserRepository.ts         # Task 18
│   └── SessionRepository.ts      # Task 19
├── utils/
│   ├── configValidator.ts        # Task 3
│   └── rbacHelpers.ts            # Task 8
├── hooks/
│   └── useRBACHelpers.ts         # Task 9
├── api/
│   └── rbac.ts                   # Task 14
├── decorators/
│   └── rbacDecorators.ts         # Task 16
└── db/
    └── seeds/
        └── roles.ts              # Task 22

tests/
├── parsers/
│   └── xml-parser.test.ts        # Task 1
├── types/
│   └── rbac.test.ts              # Task 6
├── services/
│   ├── RBACLoaderService.test.ts # Task 2
│   ├── RBACService.test.ts       # Task 13
│   └── AuditService.test.ts      # Task 25
├── middleware/
│   ├── rbacMiddleware.test.ts    # Task 11
│   └── authMiddleware.test.ts    # Task 12
├── repositories/
│   ├── UserRepository.test.ts    # Task 18
│   └── SessionRepository.test.ts # Task 19
├── utils/
│   ├── configValidator.test.ts   # Task 3
│   └── rbacHelpers.test.ts       # Task 8
├── hooks/
│   ├── useRBAC.test.ts           # Task 5
│   └── useRBACHelpers.test.ts    # Task 9
├── api/
│   ├── rbac-config.test.ts       # Task 4
│   ├── rbac.test.ts              # Task 14
│   └── auth.test.ts              # Task 20
├── decorators/
│   └── rbacDecorators.test.ts    # Task 16
├── db/
│   ├── schema.test.ts            # Task 17
│   ├── connection.test.ts        # Task 21
│   └── seeds/
│       └── roles.test.ts         # Task 22
├── integration/
│   └── rbac-flow.test.ts         # Task 23
├── e2e/
│   └── permission-enforcement.test.ts  # Task 24
└── performance/
    └── rbac-performance.test.ts  # Task 26
```
