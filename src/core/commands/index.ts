import type { CommandRegistry } from '../registry.ts';
import { defaultRegistry } from '../registry.ts';

import { allJourneyCommands } from './journey/index.ts';
import { allStudioCommands } from './studio/index.ts';
import { allClosetCommands } from './closet/index.ts';
import { allWalletCommands } from './wallet/index.ts';
import { allMuseumCommands } from './museum/index.ts';
import { allProfileCommands } from './profile/index.ts';
import { allHelperInverseCommands } from './helper-inverse-commands.ts';

export * from './journey/index.ts';
export * from './studio/index.ts';
export * from './closet/index.ts';
export * from './wallet/index.ts';
export * from './museum/index.ts';
export * from './profile/index.ts';
export * from './helper-inverse-commands.ts';

export const allCoreCommands = [
  ...allJourneyCommands,
  ...allStudioCommands,
  ...allClosetCommands,
  ...allWalletCommands,
  ...allMuseumCommands,
  ...allProfileCommands,
  ...allHelperInverseCommands
];

export function registerAllCoreCommands(registry: CommandRegistry = defaultRegistry): void {
  for (const cmd of allCoreCommands) {
    if (!registry.has(cmd.type)) {
      registry.register(cmd);
    }
  }
}

// Auto-register everything to defaultRegistry
registerAllCoreCommands(defaultRegistry);
