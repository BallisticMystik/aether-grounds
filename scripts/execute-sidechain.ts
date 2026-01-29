/**
 * Sidechain Execution Script
 * Executes the RBAC framework build tasks in sequence
 * 
 * Usage: bun run scripts/execute-sidechain.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface TaskPrompt {
  id: string;
  title: string;
  phase: number;
  dependencies: string[];
  prompt: string;
  expectedOutputs: string[];
  validation: string;
}

interface PromptChain {
  project: string;
  version: string;
  approach: string;
  promptChain: TaskPrompt[];
  executionOrder: string[];
  notes: Record<string, string>;
}

/**
 * Load the prompt chain from JSON
 */
function loadPromptChain(): PromptChain {
  const chainPath = join(process.cwd(), 'RBAC-FRAMEWORK-PROMPTS.json');
  const content = readFileSync(chainPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Get task by ID
 */
function getTask(chain: PromptChain, taskId: string): TaskPrompt | undefined {
  return chain.promptChain.find(task => task.id === taskId);
}

/**
 * Check if task dependencies are met
 */
function checkDependencies(
  chain: PromptChain,
  taskId: string,
  completedTasks: Set<string>
): { met: boolean; missing: string[] } {
  const task = getTask(chain, taskId);
  if (!task) {
    return { met: false, missing: [] };
  }

  const missing = task.dependencies.filter(dep => !completedTasks.has(dep));
  return {
    met: missing.length === 0,
    missing,
  };
}

/**
 * Generate execution plan
 */
function generateExecutionPlan(chain: PromptChain): {
  plan: Array<{ task: TaskPrompt; canExecute: boolean; reason?: string }>;
  totalTasks: number;
  readyTasks: number;
} {
  const completed = new Set<string>();
  const plan: Array<{ task: TaskPrompt; canExecute: boolean; reason?: string }> = [];

  for (const taskId of chain.executionOrder) {
    const task = getTask(chain, taskId);
    if (!task) continue;

    const deps = checkDependencies(chain, taskId, completed);
    const canExecute = deps.met;

    plan.push({
      task,
      canExecute,
      reason: canExecute
        ? undefined
        : `Missing dependencies: ${deps.missing.join(', ')}`,
    });

    if (canExecute) {
      completed.add(taskId);
    }
  }

  return {
    plan,
    totalTasks: plan.length,
    readyTasks: plan.filter(p => p.canExecute).length,
  };
}

/**
 * Format task for display
 */
function formatTask(task: TaskPrompt, index: number): string {
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task ${index + 1}: ${task.title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase: ${task.phase}
ID: ${task.id}
Dependencies: ${task.dependencies.length > 0 ? task.dependencies.join(', ') : 'None'}

PROMPT:
${task.prompt}

EXPECTED OUTPUTS:
${task.expectedOutputs.map(out => `  - ${out}`).join('\n')}

VALIDATION:
${task.validation}
`;
}

/**
 * Main execution function
 */
function main() {
  console.log('🚀 Loading RBAC Framework Sidechain...\n');

  const chain = loadPromptChain();
  const { plan, totalTasks, readyTasks } = generateExecutionPlan(chain);

  console.log(`📋 Execution Plan Generated`);
  console.log(`   Total Tasks: ${totalTasks}`);
  console.log(`   Ready to Execute: ${readyTasks}`);
  console.log(`   Blocked: ${totalTasks - readyTasks}\n`);

  // Display execution plan
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('EXECUTION PLAN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  plan.forEach((item, index) => {
    const status = item.canExecute ? '✅' : '⏸️';
    console.log(`${status} [${index + 1}/${totalTasks}] ${item.task.title}`);
    if (!item.canExecute && item.reason) {
      console.log(`   ⚠️  ${item.reason}`);
    }
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('TASK DETAILS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  plan.forEach((item, index) => {
    if (item.canExecute) {
      console.log(formatTask(item.task, index));
    }
  });

  // Generate execution script
  const executionScript = plan
    .filter(item => item.canExecute)
    .map((item, index) => {
      return `
// ============================================================================
// Task ${index + 1}: ${item.task.title}
// ============================================================================
// Phase: ${item.task.phase}
// Dependencies: ${item.task.dependencies.join(', ') || 'None'}
//
// PROMPT:
// ${item.task.prompt.split('\n').map((l: string) => `// ${l}`).join('\n')}
//
// EXPECTED OUTPUTS:
${item.task.expectedOutputs.map((out: string) => `//   - ${out}`).join('\n')}
//
// VALIDATION:
// ${item.task.validation}
// ============================================================================
`;
    })
    .join('\n');

  writeFileSync(
    join(process.cwd(), 'EXECUTION-SCRIPT.md'),
    `# RBAC Framework Execution Script\n\n${executionScript}`
  );

  console.log('✅ Execution plan generated!');
  console.log('📄 Detailed execution script saved to: EXECUTION-SCRIPT.md');
  console.log('\n💡 To execute: Pass each task prompt to Claude/sub-agent in sequence');
  console.log('💡 Each task must pass validation before proceeding to the next\n');
}

// Run if executed directly
if (import.meta.main) {
  main();
}

export { loadPromptChain, generateExecutionPlan, formatTask };
