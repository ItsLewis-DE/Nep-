import type { CommandDef } from '../../command.ts';
import type { GameState } from '../../state.ts';
import type { GameContent } from '../../../content/index.ts';

export const DIALOGUE_ADVANCE_TOKEN = 'INTERNAL_DIALOGUE_ADVANCE_TOKEN';

// ==========================================
// 1. clue/collect (reversible)
// ==========================================
// Guard strictly enforces that clue collection only happens via active dialogue node

export interface ClueCollectPayload {
  clueId: string;
  internalToken?: string;
  fromDialogueNodeId?: string;
}

export const clueCollectCommand: CommandDef<ClueCollectPayload> = {
  type: 'clue/collect',
  kind: 'reversible',

  guard: (state: GameState, payload: ClueCollectPayload, content: GameContent) => {
    const { clueId, internalToken, fromDialogueNodeId } = payload;
    if (!clueId || !content.cluesById.has(clueId)) {
      return { ok: false, reason: `Clue '${clueId}' does not exist in content.` };
    }

    if (state.notebook.unlockedClueIds.includes(clueId)) {
      return { ok: false, reason: `Clue '${clueId}' has already been collected.` };
    }

    // Verify authorized origin: called with internal token OR matching active dialogue node
    const chProgress = state.journey[state.currentChapter];
    const activeDiag = chProgress?.activeDialogue;

    const isTokenAuthorized = internalToken === DIALOGUE_ADVANCE_TOKEN;
    const isNodeAuthorized =
      activeDiag &&
      content.cluesById.get(clueId)?.discoveredInDialogueId === activeDiag.dialogueId &&
      (!fromDialogueNodeId || fromDialogueNodeId === activeDiag.currentNodeId);

    if (!isTokenAuthorized && !isNodeAuthorized) {
      return {
        ok: false,
        reason: `clue/collect cannot be called directly outside of dialogue/advance traversing the clue's node.`
      };
    }

    return true;
  },

  apply: (state: GameState, payload: ClueCollectPayload) => {
    const { clueId } = payload;
    const nextState: GameState = {
      ...state,
      notebook: {
        ...state.notebook,
        unlockedClueIds: [...state.notebook.unlockedClueIds, clueId]
      }
    };

    return {
      state: nextState,
      events: [
        {
          type: 'clueCollected',
          payload: { clueId }
        }
      ]
    };
  },

  invert: (state: GameState, payload: ClueCollectPayload) => {
    return {
      type: 'clue/remove',
      payload: { clueId: payload.clueId }
    };
  }
};

// ==========================================
// 2. dialogue/advance (reversible)
// ==========================================

export interface DialogueAdvancePayload {}

export const dialogueAdvanceCommand: CommandDef<DialogueAdvancePayload> = {
  type: 'dialogue/advance',
  kind: 'reversible',

  guard: (state: GameState, _payload: DialogueAdvancePayload, content: GameContent) => {
    const chId = state.currentChapter;
    const chProgress = state.journey[chId];
    const activeDiag = chProgress?.activeDialogue;

    if (!activeDiag) {
      return { ok: false, reason: 'No active dialogue to advance.' };
    }

    const chData = content.chapters[chId];
    const dialogueDef = chData?.dialogues.find((d) => d.id === activeDiag.dialogueId);
    if (!dialogueDef) {
      return { ok: false, reason: `Dialogue '${activeDiag.dialogueId}' not found.` };
    }

    const currentNode = dialogueDef.nodes.find((n) => n.id === activeDiag.currentNodeId);
    if (!currentNode) {
      return { ok: false, reason: `Dialogue node '${activeDiag.currentNodeId}' not found.` };
    }

    if (currentNode.choices && currentNode.choices.length > 0) {
      return {
        ok: false,
        reason: 'Current dialogue node requires branching choice (use dialogue/choose).'
      };
    }

    return true;
  },

  apply: (state: GameState, _payload: DialogueAdvancePayload, content: GameContent) => {
    const chId = state.currentChapter;
    const chProgress = state.journey[chId];
    const activeDiag = chProgress.activeDialogue!;
    const chData = content.chapters[chId];
    const dialogueDef = chData.dialogues.find((d) => d.id === activeDiag.dialogueId)!;
    const currentNode = dialogueDef.nodes.find((n) => n.id === activeDiag.currentNodeId)!;

    const events: any[] = [];
    let nextNotebook = state.notebook;
    let nextActiveDialogue = activeDiag;
    let nextCompleted = chProgress.completedDialogueIds;

    if (currentNode.nextNodeId) {
      const nextNode = dialogueDef.nodes.find((n) => n.id === currentNode.nextNodeId);
      if (nextNode) {
        // Collect clue if present in next node
        if (nextNode.clueId && !nextNotebook.unlockedClueIds.includes(nextNode.clueId)) {
          nextNotebook = {
            ...nextNotebook,
            unlockedClueIds: [...nextNotebook.unlockedClueIds, nextNode.clueId]
          };
          events.push({
            type: 'clueCollected',
            payload: { clueId: nextNode.clueId }
          });
        }

        nextActiveDialogue = {
          ...activeDiag,
          currentNodeId: nextNode.id,
          history: [...activeDiag.history, nextNode.id]
        };
      } else {
        // End of dialogue
        if (!nextCompleted.includes(activeDiag.dialogueId)) {
          nextCompleted = [...nextCompleted, activeDiag.dialogueId];
        }
        nextActiveDialogue = null as any;
      }
    } else {
      // Reached final node of dialogue
      if (!nextCompleted.includes(activeDiag.dialogueId)) {
        nextCompleted = [...nextCompleted, activeDiag.dialogueId];
      }
      nextActiveDialogue = null as any;
    }

    const nextState: GameState = {
      ...state,
      notebook: nextNotebook,
      journey: {
        ...state.journey,
        [chId]: {
          ...chProgress,
          completedDialogueIds: nextCompleted,
          activeDialogue: nextActiveDialogue
        }
      }
    };

    return {
      state: nextState,
      events
    };
  },

  invert: (state: GameState) => {
    return {
      type: 'dialogue/restore',
      payload: { previousState: state }
    };
  }
};

// ==========================================
// 3. dialogue/choose (reversible)
// ==========================================

export interface DialogueChoosePayload {
  choiceIndex: number;
}

export const dialogueChooseCommand: CommandDef<DialogueChoosePayload> = {
  type: 'dialogue/choose',
  kind: 'reversible',

  guard: (state: GameState, payload: DialogueChoosePayload, content: GameContent) => {
    const chId = state.currentChapter;
    const chProgress = state.journey[chId];
    const activeDiag = chProgress?.activeDialogue;

    if (!activeDiag) {
      return { ok: false, reason: 'No active dialogue to choose from.' };
    }

    const chData = content.chapters[chId];
    const dialogueDef = chData?.dialogues.find((d) => d.id === activeDiag.dialogueId);
    const currentNode = dialogueDef?.nodes.find((n) => n.id === activeDiag.currentNodeId);

    if (!currentNode || !currentNode.choices || currentNode.choices.length === 0) {
      return { ok: false, reason: 'Current dialogue node has no choices.' };
    }

    if (payload.choiceIndex < 0 || payload.choiceIndex >= currentNode.choices.length) {
      return { ok: false, reason: `Invalid choiceIndex ${payload.choiceIndex}.` };
    }

    return true;
  },

  apply: (state: GameState, payload: DialogueChoosePayload, content: GameContent) => {
    const chId = state.currentChapter;
    const chProgress = state.journey[chId];
    const activeDiag = chProgress.activeDialogue!;
    const chData = content.chapters[chId];
    const dialogueDef = chData.dialogues.find((d) => d.id === activeDiag.dialogueId)!;
    const currentNode = dialogueDef.nodes.find((n) => n.id === activeDiag.currentNodeId)!;
    const choice = currentNode.choices![payload.choiceIndex];

    const events: any[] = [];
    let nextNotebook = state.notebook;
    let nextActiveDialogue = activeDiag;
    let nextCompleted = chProgress.completedDialogueIds;

    if (choice.nextNodeId) {
      const nextNode = dialogueDef.nodes.find((n) => n.id === choice.nextNodeId);
      if (nextNode) {
        if (nextNode.clueId && !nextNotebook.unlockedClueIds.includes(nextNode.clueId)) {
          nextNotebook = {
            ...nextNotebook,
            unlockedClueIds: [...nextNotebook.unlockedClueIds, nextNode.clueId]
          };
          events.push({
            type: 'clueCollected',
            payload: { clueId: nextNode.clueId }
          });
        }

        nextActiveDialogue = {
          ...activeDiag,
          currentNodeId: nextNode.id,
          history: [...activeDiag.history, nextNode.id]
        };
      } else {
        if (!nextCompleted.includes(activeDiag.dialogueId)) {
          nextCompleted = [...nextCompleted, activeDiag.dialogueId];
        }
        nextActiveDialogue = null as any;
      }
    } else {
      if (!nextCompleted.includes(activeDiag.dialogueId)) {
        nextCompleted = [...nextCompleted, activeDiag.dialogueId];
      }
      nextActiveDialogue = null as any;
    }

    const nextState: GameState = {
      ...state,
      notebook: nextNotebook,
      journey: {
        ...state.journey,
        [chId]: {
          ...chProgress,
          completedDialogueIds: nextCompleted,
          activeDialogue: nextActiveDialogue
        }
      }
    };

    return {
      state: nextState,
      events
    };
  },

  invert: (state: GameState) => {
    return {
      type: 'dialogue/restore',
      payload: { previousState: state }
    };
  }
};
