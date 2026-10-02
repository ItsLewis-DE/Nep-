import type { CommandDef } from '../../command.ts';
import type { GameState } from '../../state.ts';
import type { GameContent } from '../../../content/index.ts';

// ==========================================
// 1. shop/buy (one-way)
// ==========================================

export interface ShopBuyPayload {
  accessoryId: string;
}

export const shopBuyCommand: CommandDef<ShopBuyPayload> = {
  type: 'shop/buy',
  kind: 'one-way',

  guard: (state: GameState, payload: ShopBuyPayload, content: GameContent) => {
    const { accessoryId } = payload;
    const acc = content.accessoriesById.get(accessoryId);

    if (!acc) {
      return { ok: false, reason: `Accessory '${accessoryId}' does not exist in catalog.` };
    }

    if (state.closet.unlockedAccessoryIds.includes(accessoryId)) {
      return { ok: false, reason: `Accessory '${accessoryId}' is already owned.` };
    }

    if (state.wallet.senNgoc < acc.senNgocPrice) {
      return {
        ok: false,
        reason: `Insufficient Sen Ngọc balance (${state.wallet.senNgoc} < ${acc.senNgocPrice}).`
      };
    }

    return true;
  },

  apply: (state: GameState, payload: ShopBuyPayload, content: GameContent) => {
    const { accessoryId } = payload;
    const acc = content.accessoriesById.get(accessoryId)!;

    const nextState: GameState = {
      ...state,
      wallet: {
        senNgoc: state.wallet.senNgoc - acc.senNgocPrice
      },
      closet: {
        ...state.closet,
        unlockedAccessoryIds: [...state.closet.unlockedAccessoryIds, accessoryId]
      }
    };

    return {
      state: nextState,
      events: [
        {
          type: 'rewardGranted',
          payload: {
            rewardId: `shop-${accessoryId}`,
            amount: -acc.senNgocPrice
          }
        }
      ]
    };
  },

  invert: () => null
};

// ==========================================
// 2. wallet/grant (compensable)
// ==========================================

export interface WalletGrantPayload {
  amount: number;
}

export const walletGrantCommand: CommandDef<WalletGrantPayload> = {
  type: 'wallet/grant',
  kind: 'compensable',

  guard: (state: GameState, payload: WalletGrantPayload) => {
    if (typeof payload.amount !== 'number' || payload.amount === 0) {
      return { ok: false, reason: 'Amount must be a non-zero number.' };
    }
    if (state.wallet.senNgoc + payload.amount < 0) {
      return { ok: false, reason: 'Grant operation would lead to negative balance.' };
    }
    return true;
  },

  apply: (state: GameState, payload: WalletGrantPayload) => {
    const nextState: GameState = {
      ...state,
      wallet: {
        senNgoc: state.wallet.senNgoc + payload.amount
      }
    };

    return {
      state: nextState,
      events: [
        {
          type: 'rewardGranted',
          payload: {
            rewardId: 'wallet-grant',
            amount: payload.amount
          }
        }
      ]
    };
  },

  invert: (_state: GameState, payload: WalletGrantPayload) => {
    return {
      type: 'wallet/grant',
      payload: { amount: -payload.amount }
    };
  }
};
