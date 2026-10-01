import type { CommandDef } from '../../command.ts';
import type { GameState } from '../../state.ts';
import type { GameContent } from '../../../content/index.ts';
import type { ChapterId } from '../../../content/schema.ts';

// ==========================================
// reward/claim (one-way)
// ==========================================

export interface RewardClaimPayload {
  chapterId: ChapterId;
}

export const rewardClaimCommand: CommandDef<RewardClaimPayload> = {
  type: 'reward/claim',
  kind: 'one-way',

  guard: (state: GameState, payload: RewardClaimPayload, content: GameContent) => {
    const { chapterId } = payload;
    if (!chapterId || !content.chapters[chapterId]) {
      return { ok: false, reason: `Chapter '${chapterId}' does not exist.` };
    }

    const chProgress = state.journey[chapterId];
    if (!chProgress) {
      return { ok: false, reason: `No progress record for chapter '${chapterId}'.` };
    }

    if (chProgress.claimed) {
      return {
        ok: false,
        reason: `Reward for chapter '${chapterId}' has already been claimed.`
      };
    }

    if (chProgress.status !== 'completed') {
      return {
        ok: false,
        reason: `Cannot claim reward: chapter '${chapterId}' is not yet completed.`
      };
    }

    return true;
  },

  apply: (state: GameState, payload: RewardClaimPayload, content: GameContent) => {
    const { chapterId } = payload;
    const chProgress = state.journey[chapterId];
    const rewardMeta = content.chapters[chapterId]?.chapter?.reward;
    const amount = rewardMeta?.senNgoc ?? 100;

    const nextState: GameState = {
      ...state,
      wallet: {
        senNgoc: state.wallet.senNgoc + amount
      },
      journey: {
        ...state.journey,
        [chapterId]: {
          ...chProgress,
          claimed: true
        }
      }
    };

    return {
      state: nextState,
      events: [
        {
          type: 'rewardGranted',
          payload: {
            rewardId: `reward-${chapterId}`,
            amount
          }
        }
      ]
    };
  },

  invert: () => null
};
