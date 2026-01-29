/**
 * Global test setup and utilities
 * This file is automatically loaded by Vitest before tests run
 */

import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

// Global test setup
beforeAll(() => {
  // Setup code that runs once before all tests
  // e.g., initialize test database, start test server, etc.
});

afterAll(() => {
  // Cleanup code that runs once after all tests
  // e.g., close database connections, stop test server, etc.
});

beforeEach(() => {
  // Setup code that runs before each test
  // e.g., reset mocks, clear caches, etc.
});

afterEach(() => {
  // Cleanup code that runs after each test
  // e.g., clear timers, reset state, etc.
});

/**
 * Test utilities
 */
export const testUtils = {
  /**
   * Wait for a specified amount of time (useful for async tests)
   */
  wait: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  /**
   * Create a mock function with type safety
   */
  createMock: <T extends (...args: any[]) => any>(fn?: T) => {
    return fn ? fn : (() => {}) as T;
  },

  /**
   * Assert that a value is defined
   */
  assertDefined: <T>(value: T | undefined | null, message?: string): asserts value is T => {
    if (value === undefined || value === null) {
      throw new Error(message || 'Value is not defined');
    }
  }
};

/**
 * Common mocks
 */
export const mocks = {
  /**
   * Mock console methods to avoid noise in tests
   */
  console: {
    log: () => {},
    error: () => {},
    warn: () => {},
    info: () => {},
  }
};
