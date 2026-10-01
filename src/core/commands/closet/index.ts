import type { CommandDef } from '../../command.ts';

export * from './closet-commands.ts';

import {
  closetSaveOutfitCommand,
  closetRenameOutfitCommand,
  closetDeleteOutfitCommand,
  closetRestoreOutfitCommand
} from './closet-commands.ts';

export const allClosetCommands: CommandDef<any>[] = [
  closetSaveOutfitCommand,
  closetRenameOutfitCommand,
  closetDeleteOutfitCommand,
  closetRestoreOutfitCommand
];
