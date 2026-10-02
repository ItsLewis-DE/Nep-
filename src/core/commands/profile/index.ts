import type { CommandDef } from '../../command.ts';

export * from './profile-commands.ts';

import { profileCreateCommand, profileUpdateCommand } from './profile-commands.ts';

export const allProfileCommands: CommandDef<any>[] = [
  profileCreateCommand,
  profileUpdateCommand
];
