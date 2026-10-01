import type { CommandDef } from '../command.ts';
import type { GameState } from '../state.ts';

// Helper commands to make invert() fully executable through runCommand

export const clueRemoveCommand: CommandDef<{ clueId: string }> = {
  type: 'clue/remove',
  kind: 'compensable',
  guard: (state, payload) => state.notebook.unlockedClueIds.includes(payload.clueId),
  apply: (state, payload) => ({
    state: {
      ...state,
      notebook: {
        ...state.notebook,
        unlockedClueIds: state.notebook.unlockedClueIds.filter((id) => id !== payload.clueId)
      }
    }
  }),
  invert: (_state, payload) => ({ type: 'clue/collect', payload: { clueId: payload.clueId, internalToken: 'INTERNAL_DIALOGUE_ADVANCE_TOKEN' } })
};

export const itemRemoveCommand: CommandDef<{ itemId: string }> = {
  type: 'item/remove',
  kind: 'compensable',
  guard: (state, payload) => state.inventory.itemIds.includes(payload.itemId),
  apply: (state, payload) => ({
    state: {
      ...state,
      inventory: {
        ...state.inventory,
        itemIds: state.inventory.itemIds.filter((id) => id !== payload.itemId)
      }
    }
  }),
  invert: (_state, payload) => ({ type: 'item/pick', payload: { itemId: payload.itemId } })
};

export const itemDecomposeCommand: CommandDef<{ outputItemId: string; originalItemIds: [string, string] }> = {
  type: 'item/decompose',
  kind: 'compensable',
  guard: (state, payload) => state.inventory.itemIds.includes(payload.outputItemId),
  apply: (state, payload) => ({
    state: {
      ...state,
      inventory: {
        ...state.inventory,
        itemIds: [
          ...state.inventory.itemIds.filter((id) => id !== payload.outputItemId),
          ...payload.originalItemIds
        ]
      }
    }
  }),
  invert: (_state, payload) => ({ type: 'item/combine', payload: { itemIds: payload.originalItemIds } })
};

export const puzzleUnsolveCommand: CommandDef<{ puzzleId: string }> = {
  type: 'puzzle/unsolve',
  kind: 'compensable',
  guard: (state, payload) => {
    const chProgress = state.journey[state.currentChapter];
    return Boolean(chProgress && chProgress.solvedPuzzleIds.includes(payload.puzzleId));
  },
  apply: (state, payload) => {
    const chId = state.currentChapter;
    const chProgress = state.journey[chId];
    return {
      state: {
        ...state,
        journey: {
          ...state.journey,
          [chId]: {
            ...chProgress,
            solvedPuzzleIds: chProgress.solvedPuzzleIds.filter((id) => id !== payload.puzzleId)
          }
        }
      }
    };
  },
  invert: (_state, payload) => ({ type: 'puzzle/skip', payload: { puzzleId: payload.puzzleId } })
};

export const puzzleCloseCommand: CommandDef<{ puzzleId?: string }> = {
  type: 'puzzle/close',
  kind: 'reversible',
  guard: (state) => state.activeSession?.type === 'puzzle',
  apply: (state) => ({
    state: {
      ...state,
      activeSession: null
    }
  }),
  invert: (_state, payload) => ({
    type: 'puzzle/open',
    payload: { puzzleId: payload?.puzzleId ?? 'p-c1-escape' }
  })
};

export const puzzleDecrementHintCommand: CommandDef<{ puzzleId: string }> = {
  type: 'puzzle/decrementHint',
  kind: 'compensable',
  guard: (state, payload) => {
    const chProgress = state.journey[state.currentChapter];
    return Boolean(chProgress && (chProgress.hintTiers[payload.puzzleId] ?? 0) > 0);
  },
  apply: (state, payload) => {
    const chId = state.currentChapter;
    const chProgress = state.journey[chId];
    const currentTier = chProgress.hintTiers[payload.puzzleId] ?? 1;
    return {
      state: {
        ...state,
        journey: {
          ...state.journey,
          [chId]: {
            ...chProgress,
            hintTiers: {
              ...chProgress.hintTiers,
              [payload.puzzleId]: Math.max(0, currentTier - 1)
            }
          }
        }
      }
    };
  },
  invert: (_state, payload) => ({ type: 'puzzle/hint', payload: { puzzleId: payload.puzzleId } })
};

export const dialogueRestoreCommand: CommandDef<{ previousState: GameState }> = {
  type: 'dialogue/restore',
  kind: 'compensable',
  guard: () => true,
  apply: (_state, payload) => ({
    state: payload.previousState
  }),
  invert: (state) => ({
    type: 'dialogue/restore',
    payload: { previousState: state }
  })
};

export const interactUndoCommand: CommandDef<{ previousState: GameState }> = {
  type: 'interact/undo',
  kind: 'compensable',
  guard: () => true,
  apply: (_state, payload) => ({
    state: payload.previousState
  }),
  invert: (state) => ({
    type: 'interact/undo',
    payload: { previousState: state }
  })
};

export const allHelperInverseCommands: CommandDef<any>[] = [
  clueRemoveCommand,
  itemRemoveCommand,
  itemDecomposeCommand,
  puzzleUnsolveCommand,
  puzzleCloseCommand,
  puzzleDecrementHintCommand,
  dialogueRestoreCommand,
  interactUndoCommand
];
