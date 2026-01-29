# Backend Agent - Task Assignment

## Agent Profile
- **Name**: Backend Agent
- **Expertise**: Express.js, middleware, API development, server-side logic
- **Primary Goal**: Create backend integration for RBAC system

## Assigned Tasks

### Task 1: Create Express Middleware with Tests
**Priority**: HIGH (API protection)
**Dependencies**: Core Logic Agent - Task 1
**Estimated Time**: 45 minutes

#### Instructions
Using TDD, create Express middleware for route protection.

#### Steps

**Step 1: Write Integration Tests**
Create `tests/integration/middleware/rbac-middleware.test.ts`:
- Middleware protects routes correctly
- Returns 401 for missing authentication
- Returns 403 for insufficient permissions
- Attaches permission info to request object
- Handles multiple features with AND logic
- Handles multiple features with OR logic
- Works with Express app instance

**Step 2: Implement Middleware**
Create `src/middleware/express-rbac.ts`:
- `createRBACMiddleware()` function
- Accepts feature ID and required access level
- Extracts user role from request (req.user.role)
- Uses RBAC service to check permissions
- Returns appropriate HTTP status codes
- Attaches permission result to request

#### Expected Outputs
- [ ] `tests/integration/middleware/rbac-middleware.test.ts`
- [ ] `src/middleware/express-rbac.ts`

#### Success Criteria
- ✅ All middleware tests pass
- ✅ Correctly protects routes
- ✅ Proper HTTP status codes
- ✅ Works with real Express app
- ✅ Permission info attached to request

---

### Task 2: Create Permission Decorators
**Priority**: MEDIUM (Developer experience)
**Dependencies**: Task 1 (Middleware)
**Estimated Time**: 30 minutes

#### Instructions
Create decorator-based permission system for class methods.

#### Steps

**Step 1: Write Tests**
Create `tests/unit/decorators/rbac-decorator.test.ts`:
- `@RequireFeature()` decorator works
- `@RequireAccessLevel()` decorator works
- Works with Express route handlers
- Works with class methods
- Error handling

**Step 2: Implement Decorators**
Create `src/decorators/rbac.decorator.ts`:
- `@RequireFeature(featureId, accessLevel?)` decorator
- `@RequireAccessLevel(accessLevel)` decorator
- Integration with Express
- Error handling and permission checking

#### Expected Outputs
- [ ] `tests/unit/decorators/rbac-decorator.test.ts`
- [ ] `src/decorators/rbac.decorator.ts`

#### Success Criteria
- ✅ Decorators work correctly
- ✅ Tests pass
- ✅ Can be used in Express controllers

---

### Task 3: Create RBAC Service Singleton
**Priority**: MEDIUM (Service layer)
**Dependencies**: Parser Agent - Task 1
**Estimated Time**: 20 minutes

#### Instructions
Create singleton service for RBAC operations.

#### Steps

**Step 1: Write Tests**
Create `tests/unit/services/rbac-service.test.ts`:
- Singleton pattern works
- Initializes from XML on first access
- Caches RBAC instance
- Thread-safe initialization
- Convenience methods

**Step 2: Implement Service**
Create `src/services/rbac-service.ts`:
- Singleton pattern
- `getInstance()` method
- Lazy initialization from XML
- Caching
- Convenience methods

#### Expected Outputs
- [ ] `tests/unit/services/rbac-service.test.ts`
- [ ] `src/services/rbac-service.ts`

#### Success Criteria
- ✅ Singleton works correctly
- ✅ Initializes properly
- ✅ Caches instance
- ✅ All tests pass

---

### Task 4: Create XML Loader Service
**Priority**: HIGH (Data loading)
**Dependencies**: Parser Agent - Task 1, Core Logic Agent - Task 2
**Estimated Time**: 25 minutes

#### Instructions
Create service that loads and validates XML configuration.

#### Steps

**Step 1: Write Tests**
Create `tests/unit/services/rbac-loader.test.ts`:
- Loads XML from file system
- Parses XML correctly
- Validates configuration
- Returns RBAC instance
- Handles file not found
- Handles parse errors
- Handles validation errors

**Step 2: Implement Loader**
Create `src/services/rbac-loader.ts`:
- Load `coffee-platform-roles.xml`
- Parse using xml-parser
- Validate using config-validator
- Return RBAC instance
- Error handling

#### Expected Outputs
- [ ] `tests/unit/services/rbac-loader.test.ts`
- [ ] `src/services/rbac-loader.ts`

#### Success Criteria
- ✅ Loader works correctly
- ✅ Handles all error cases
- ✅ Returns valid RBAC instance
- ✅ All tests pass

---

## Status
- [ ] Task 1: Not Started
- [ ] Task 2: Not Started
- [ ] Task 3: Not Started
- [ ] Task 4: Not Started
- [ ] Validation: Not Started

## Completion Report
_Report here when tasks are complete_
