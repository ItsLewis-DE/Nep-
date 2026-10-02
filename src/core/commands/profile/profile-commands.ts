import type { CommandDef } from '../../command.ts';
import type { GameState, PlayerProfile } from '../../state.ts';

// ==========================================
// 1. profile/create (one-way)
// ==========================================
// Analysis result (e.g. from server-side Gemini) passes directly via payload as an enum ID.
// No AI is invoked inside core engine commands.

export interface ProfileCreatePayload {
  name: string;
  gender: 'male' | 'female';
  avatarPreset: string;
  createdAt?: string;
}

export const profileCreateCommand: CommandDef<ProfileCreatePayload> = {
  type: 'profile/create',
  kind: 'one-way',

  guard: (state: GameState, payload: ProfileCreatePayload) => {
    if (state.profile !== null) {
      return { ok: false, reason: 'Profile has already been created.' };
    }
    if (!payload.name || payload.name.trim() === '') {
      return { ok: false, reason: 'Player name is required.' };
    }
    if (payload.gender !== 'male' && payload.gender !== 'female') {
      return { ok: false, reason: "Gender must be 'male' or 'female'." };
    }
    return true;
  },

  apply: (state: GameState, payload: ProfileCreatePayload) => {
    const newProfile: PlayerProfile = {
      name: payload.name.trim(),
      gender: payload.gender,
      avatarPreset: payload.avatarPreset || 'an-default',
      createdAt: payload.createdAt ?? '1970-01-01T00:00:00.000Z'
    };

    const nextState: GameState = {
      ...state,
      profile: newProfile
    };

    return {
      state: nextState,
      events: [
        {
          type: 'stateRestored',
          payload: { saveVersion: 'profile-created' }
        }
      ]
    };
  },

  invert: () => null
};

// ==========================================
// 2. profile/update (reversible)
// ==========================================

export interface ProfileUpdatePayload {
  name?: string;
  gender?: 'male' | 'female';
  avatarPreset?: string;
  previousProfile?: PlayerProfile;
}

export const profileUpdateCommand: CommandDef<ProfileUpdatePayload> = {
  type: 'profile/update',
  kind: 'reversible',

  guard: (state: GameState) => {
    if (state.profile === null) {
      return { ok: false, reason: 'No existing profile to update.' };
    }
    return true;
  },

  apply: (state: GameState, payload: ProfileUpdatePayload) => {
    const currentProfile = state.profile!;
    const updatedProfile: PlayerProfile = {
      ...currentProfile,
      name: payload.name !== undefined ? payload.name.trim() : currentProfile.name,
      gender: payload.gender !== undefined ? payload.gender : currentProfile.gender,
      avatarPreset: payload.avatarPreset !== undefined ? payload.avatarPreset : currentProfile.avatarPreset
    };

    const nextState: GameState = {
      ...state,
      profile: updatedProfile
    };

    return {
      state: nextState,
      events: [
        {
          type: 'stateRestored',
          payload: { saveVersion: 'profile-updated' }
        }
      ]
    };
  },

  invert: (state: GameState, payload: ProfileUpdatePayload) => {
    const oldProfile = payload.previousProfile ?? state.profile;
    if (!oldProfile) return null;

    return {
      type: 'profile/update',
      payload: {
        name: oldProfile.name,
        gender: oldProfile.gender,
        avatarPreset: oldProfile.avatarPreset
      }
    };
  }
};
