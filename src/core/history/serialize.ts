import type { HistoryTree } from './history-tree.ts';
import type { GameContent } from '../../content/index.ts';
import { validateState } from '../invariants.ts';

export interface SerializedHistoryEnvelope {
  saveFormatVersion: 'tiem-may-nep-save-v1';
  schemaVersion: string;
  serializedAt: string;
  tree: HistoryTree;
}

export type FromJSONResult =
  | { ok: true; tree: HistoryTree }
  | { ok: false; reason: string };

/**
 * Serializes the history tree into a versioned JSON string.
 */
export function toJSON(tree: HistoryTree): string {
  const envelope: SerializedHistoryEnvelope = {
    saveFormatVersion: 'tiem-may-nep-save-v1',
    schemaVersion: tree.version,
    serializedAt: new Date(0).toISOString(),
    tree
  };
  return JSON.stringify(envelope);
}

/**
 * Deserializes JSON string into a HistoryTree.
 * Validates state invariants on the restored head node snapshot.
 * Returns clear error on corrupt data without crashing.
 */
export function fromJSON(jsonStr: string, content: GameContent): FromJSONResult {
  if (!jsonStr || typeof jsonStr !== 'string') {
    return {
      ok: false,
      reason: 'Dữ liệu chuỗi JSON lưu trữ bị rỗng hoặc không hợp lệ.'
    };
  }

  let parsed: any;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err) {
    return {
      ok: false,
      reason: `Lỗi phân tích cú pháp JSON: ${err instanceof Error ? err.message : String(err)}`
    };
  }

  if (!parsed || typeof parsed !== 'object') {
    return {
      ok: false,
      reason: 'Dữ liệu save không phải là một đối tượng JSON hợp lệ.'
    };
  }

  // Handle both enveloped structure and direct HistoryTree structure
  const treeCandidate: HistoryTree = parsed.saveFormatVersion === 'tiem-may-nep-save-v1' && parsed.tree
    ? parsed.tree
    : parsed;

  if (
    !treeCandidate.nodes ||
    typeof treeCandidate.nodes !== 'object' ||
    !treeCandidate.rootId ||
    !treeCandidate.headId
  ) {
    return {
      ok: false,
      reason: 'Cấu trúc cây lịch sử bị khuyết thiếu trường nodes, rootId hoặc headId.'
    };
  }

  const headNode = treeCandidate.nodes[treeCandidate.headId];
  if (!headNode || !headNode.snapshot) {
    return {
      ok: false,
      reason: `Nút đầu (headId = '${treeCandidate.headId}') không tồn tại hoặc bị mất snapshot.`
    };
  }

  // Run invariant checks on the head snapshot
  const validation = validateState(headNode.snapshot, content);
  if (!validation.valid) {
    return {
      ok: false,
      reason: `Vi phạm bất biến dữ liệu khi tải trạng thái lưu: ${validation.errors.join('; ')}`
    };
  }

  return {
    ok: true,
    tree: treeCandidate
  };
}
