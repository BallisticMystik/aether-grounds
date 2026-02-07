# Sidechain Execution Plan – Next Tasks

**Immediate next:** Run **Task A** (verify full test suite), then **Task B** (RBAC class unit tests), then **Task C** (Express RBAC middleware), **Task D** (server loads config at startup), **Task E** (update STATUS and INTEGRATION-STATUS).

**Last execution:** 2025-02-06 — Tasks A, B, C, D, E completed.

---

## Current state (audit)

| Sidechain task | Status | Notes |
|----------------|--------|--------|
| **Infrastructure** | ✅ Done | Directories, package.json, tsconfig |
| **Testing** | ✅ Done | Vitest, fixtures, helpers |
| **Parser Agent – XML Parser** | ✅ Done | `src/parsers/xml-parser.ts`, `types.ts`, `tests/unit/parsers/xml-parser.test.ts` |
| **Core RBAC class** | ✅ Done | Implemented in `types/rbac.types.ts` |
| **Config validator** | ✅ Done | `src/utils/configValidator.ts` |
| **XML / RBAC loader** | ✅ Done | `src/services/RBACLoaderService.ts` |
| **RBAC API** | ✅ Done | `src/api/rbac.ts` – `/api/rbac/config`, validate, roles, check, etc. |
| **useRBAC / useFeatureAccess** | ✅ Done | `src/hooks/useRBAC.ts` |
| **ProtectedRoute** | ✅ Done | `src/components/routing/ProtectedRoute.tsx` |
| **Login / Register** | ✅ Done | `src/pages/Login.tsx`, `Register.tsx` |
| **Express RBAC middleware** | ⚠️ Unclear | Need to verify if API routes are protected by RBAC |
| **Unit tests for RBAC class** | ❓ To verify | `tests/unit/core/rbac.test.ts` may or may not exist |
| **Integration tests** | ❓ To verify | Parser + loader + API flow |

---

## Execution order for next tasks

Execute in this order. Each task has a **Prompt** (copy into Claude/sub-agent) and **Validation** (how to confirm it’s done).

---

### Task A: Verify and run full test suite

**Goal:** Ensure all existing tests pass and document any failures.

**Prompt:**

```
In the AETHER GROUNDS project:
1. Run the full test suite: `bun test` (or `vitest run` if that's the script).
2. If any tests fail, fix them and re-run until all pass.
3. Optionally run with coverage: `bun run test:coverage` and note the result.
4. Update INTEGRATION-STATUS.md or SIDECHAIN-EXECUTION-PLAN.md with: "Task A: All tests pass (or list failures and fixes)."
```

**Validation:**

- `bun test` (or project test command) exits 0.
- No failing tests; any fixes committed or documented.

**Deliverables:**

- Green test run.
- Short note in plan or INTEGRATION-STATUS about result.

---

### Task B: Add or complete unit tests for RBAC class

**Goal:** There is a dedicated test file for the RBAC class with good coverage.

**Prompt:**

```
In the AETHER GROUNDS project:
1. Check if tests/unit/core/rbac.test.ts exists. If not, create it.
2. Write tests for the RBAC class (from types/rbac.types.ts) covering:
   - hasAccess(roleId, featureId) for all access levels (full, partial, view-only, no)
   - hasFullAccess, canWrite, canRead
   - getRoleFeatures(roleId)
   - getFeatureRoles(featureId)
   - getFeaturesByCategory(roleId, categoryId)
   - Invalid roleId / featureId (expect allowed: false or empty results)
3. Use the mock RBAC config from tests/helpers/fixtures.ts (or equivalent) so tests don't depend on the real XML file.
4. Run the tests and ensure they pass.
5. Update sub-agents/STATUS.md to mark "Core Logic Agent - Task 1" complete if not already.
```

**Validation:**

- `tests/unit/core/rbac.test.ts` exists.
- `bun test tests/unit/core/rbac.test.ts` passes.
- Core Logic task marked complete in STATUS.

**Deliverables:**

- `tests/unit/core/rbac.test.ts` (new or updated).
- STATUS.md updated.

---

### Task C: Express RBAC middleware (protect API routes)

**Goal:** Optional middleware that protects Express routes by feature/role so API endpoints can require RBAC.

**Prompt:**

```
In the AETHER GROUNDS project:
1. Add Express middleware that protects routes using RBAC. For example: createRbacMiddleware(requiredFeatureId, requiredAccessLevel?).
2. Middleware should: (a) get the current user's role from the request (e.g. req.user.roleId or header/session), (b) get the RBAC instance from RBACLoaderService.getInstance().getRBACInstance(), (c) call hasAccess(roleId, featureId) and optionally check access level, (d) if not allowed, respond with 403 and a clear message; otherwise call next().
3. If the app does not yet attach user/role to the request, document in a short comment or README how to plug in auth (e.g. "Ensure req.user.roleId is set by auth middleware").
4. Wire the middleware to at least one existing API route (e.g. under /api/rbac or a protected demo route) so we can verify it runs.
5. Add a simple integration or unit test that verifies the middleware returns 403 when role has no access and 200/next when it has access.
6. Run the test suite and fix any regressions.
```

**Validation:**

- New middleware file (e.g. `src/middleware/express-rbac.ts` or similar).
- At least one route protected; test proves 403 vs success behavior.
- `bun test` still passes.

**Deliverables:**

- Middleware implementation.
- One route using it + one test.
- STATUS: Backend Agent Task 1 can be marked complete.

---

### Task D: Server startup – ensure RBAC config is loaded

**Goal:** On server start, load `coffee-platform-roles.xml` so `/api/rbac/config` and permission checks work without a first request.

**Prompt:**

```
In the AETHER GROUNDS project:
1. In the Express (or Bun) server entry point (e.g. src/server.ts), on startup call RBACLoaderService.getInstance().loadConfig() so the RBAC config is loaded once at boot (e.g. await loadConfig() before app.listen).
2. Handle errors: if the XML file is missing or invalid, log a clear warning and optionally exit with a non-zero code in production, or continue with a fallback in development.
3. Ensure the path to coffee-platform-roles.xml is correct (e.g. from process.cwd() or __dirname).
4. Document in a one-line comment or README that "RBAC config is loaded at server startup from coffee-platform-roles.xml."
```

**Validation:**

- After `bun run start` (or equivalent), `GET /api/rbac/config` returns the full config without needing a prior request.
- Startup logs or code show that loadConfig was called.

**Deliverables:**

- Server entry point updated.
- Short comment or doc note.

---

### Task E: Update sidechain status and INTEGRATION-STATUS

**Goal:** Align documentation with reality so the next run of the sidechain knows what’s done.

**Prompt:**

```
In the AETHER GROUNDS project:
1. Update sub-agents/STATUS.md: set Parser Agent and Core Logic Agent to Complete; set Backend Agent to Complete if Task C was done.
2. Update INTEGRATION-STATUS.md to reflect: Parser done, Core RBAC done, RBAC loader and API done, middleware done (if Task C done), server loads config at startup (if Task D done). Adjust "What Works" and "What Doesn't Work Yet" and the percentage complete.
3. Optionally add a "Last execution" line to SIDECHAIN-EXECUTION-PLAN.md with the date and which tasks (A–E) were completed.
```

**Validation:**

- STATUS.md and INTEGRATION-STATUS.md match the current codebase and test results.

**Deliverables:**

- Updated STATUS.md and INTEGRATION-STATUS.md.
- Optional “Last execution” note in this plan.

---

## Summary

- **Task A:** Run and fix tests.
- **Task B:** Add/complete RBAC class unit tests.
- **Task C:** Add Express RBAC middleware and one protected route + test.
- **Task D:** Load RBAC config at server startup.
- **Task E:** Update STATUS and INTEGRATION-STATUS.

Execute in order A → B → C → D → E. Use the **Prompt** blocks as the input for the sidechain/sub-agent; use **Validation** to confirm each task before moving on.
