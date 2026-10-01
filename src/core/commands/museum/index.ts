import type { CommandDef } from '../../command.ts';

export * from './museum-commands.ts';

import { museumReadCardCommand } from './museum-commands.ts';

export const allMuseumCommands: CommandDef<any>[] = [
  museumReadCardCommand
];
