import type { GameState } from './state.ts';
import type { GameContent } from '../content/index.ts';

// ==========================================
// 1. Command Kinds & Structure
// ==========================================

export type CommandKind = 'involution' | 'reversible' | 'compensable' | 'one-way';

export interface Command<P = unknown> {
  type: string;
  payload: P;
}

// ==========================================
// 2. Domain Events for UI Contract
// ==========================================
// Minimal payloads containing relevant IDs only.
// No presentation/styling/pixel data.

export type DomainEvent =
  | { type: 'clueCollected'; payload: { clueId: string } }
  | { type: 'itemPicked'; payload: { itemId: string } }
  | { type: 'puzzleSolved'; payload: { puzzleId: string } }
  | { type: 'puzzleFeedback'; payload: { puzzleId: string; result?: 'incorrect' | 'hint' } }
  | { type: 'rewardGranted'; payload: { rewardId?: string; amount?: number } }
  | { type: 'outfitChanged'; payload: { garmentId?: string; slot?: string } }
  | { type: 'outfitSaved'; payload: { outfitId: string } }
  | { type: 'areaEntered'; payload: { areaId: string } }
  | { type: 'stateRestored'; payload: { saveVersion?: string } }
  | { type: 'sideFlipped'; payload: { side: 'mat_phai' | 'mat_trai' } };

export type DomainEventType = DomainEvent['type'];

// ==========================================
// 3. Command Definition Contract
// ==========================================

export type GuardResult = boolean | { ok: false; reason: string };

export interface ApplyResult {
  state: GameState;
  events?: DomainEvent[];
}

export interface CommandDef<P = any> {
  type: string;
  kind: CommandKind;
  guard: (state: GameState, payload: P, content: GameContent) => GuardResult;
  apply: (state: GameState, payload: P, content: GameContent) => ApplyResult;
  invert?: (state: GameState, payload: P, content: GameContent) => Command | null;
}
