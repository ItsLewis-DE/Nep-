import type { HistoryTree, HistoryNode } from './history-tree.ts';
import type { GameState } from '../state.ts';
import type { GameContent } from '../../content/index.ts';
import { runCommand } from '../registry.ts';

export interface ReplayPathSuccess {
  ok: true;
  replayedState: GameState;
  matchesSnapshot: boolean;
  path: string[];
}

export interface ReplayPathFailure {
  ok: false;
  reason: string;
}

export type ReplayPathResult = ReplayPathSuccess | ReplayPathFailure;

/**
 * Replays all commands from root to the specified nodeId.
 * Used in integrity self-check to compare replayed state with node snapshot.
 */
export function replayPath(
  tree: HistoryTree,
  nodeId: string,
  content: GameContent
): ReplayPathResult {
  const targetNode = tree.nodes[nodeId];
  if (!targetNode) {
    return {
      ok: false,
      reason: `Node '${nodeId}' not found in history tree.`
    };
  }

  // 1. Build ordered path of nodes from root to targetNode
  const pathNodes: HistoryNode[] = [];
  let curr: HistoryNode | undefined = targetNode;
  while (curr) {
    pathNodes.unshift(curr);
    curr = curr.parentId ? tree.nodes[curr.parentId] : undefined;
  }

  if (pathNodes.length === 0 || pathNodes[0].id !== tree.rootId) {
    return {
      ok: false,
      reason: `Cannot trace path from root node '${tree.rootId}' to node '${nodeId}'.`
    };
  }

  // 2. Start replay with root snapshot
  let currentState: GameState = structuredClone(pathNodes[0].snapshot);

  // 3. Sequentially execute each command along the path
  for (let i = 1; i < pathNodes.length; i++) {
    const node = pathNodes[i];
    if (!node.command) {
      return {
        ok: false,
        reason: `Intermediate node '${node.id}' in path has null command.`
      };
    }

    const result = runCommand(currentState, node.command, content);
    if (!result.ok) {
      return {
        ok: false,
        reason: `Replay failed at node '${node.id}' (command: '${node.command.type}'): ${result.reason}`
      };
    }

    currentState = result.state;
  }

  // 4. Compare replayed state with snapshot stored in targetNode
  const matchesSnapshot =
    JSON.stringify(currentState) === JSON.stringify(targetNode.snapshot);

  return {
    ok: true,
    replayedState: currentState,
    matchesSnapshot,
    path: pathNodes.map((n) => n.id)
  };
}
