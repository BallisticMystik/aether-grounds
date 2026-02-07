/**
 * Remotion Entry Point
 * This file registers the root component for Remotion
 * Must be separate from Root.tsx to avoid React Fast Refresh issues
 */

import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
